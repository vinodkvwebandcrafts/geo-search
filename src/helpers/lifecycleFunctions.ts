import { Core } from "@strapi/strapi";
import { Model } from "../../types/custom/model";
import { Result } from "../../types/custom/result";
import { flattenObject } from "./flattenObject";
import { getDifference } from "./getDifference";

type Difference = Record<string, any>;

export default function lifecycleFunctions(strapi: Core.Strapi) {
    return {

        // url mapper functions
        async createUrlMapperEntry(model: Model, result: Result) {
            const ct = strapi.contentType(model.uid);
            if (model.uid === 'api::url-mapper.url-mapper' || !ct || !result.title || !result.slug) return;
            if (ct?.kind === 'singleType' && result?.slug) {
                const { title, description, slug, documentId: cid } = result;
                await strapi.documents('api::url-mapper.url-mapper').create({
                data: {
                    title,
                    description,
                    slug,
                    content: flattenObject(result),
                    type: 'single',
                    cid,
                    uid: model.uid,
                },
                });
                return;
            }
            if (ct?.kind === 'collectionType' && result?.slug) {
                const { title, description, slug, documentId: cid } = result;
                const uid = model?.uid;
                const existing = await strapi.db.query('api::url-mapper.url-mapper').findOne({
                where: { cid },
                });
                if (existing) return;
                await strapi.documents('api::url-mapper.url-mapper').create({
                data: {
                    title,
                    description,
                    slug,
                    content: flattenObject(result),
                    type: 'collection',
                    cid,
                    uid,
                },
                });
            }
        },

        async updateUrlMapperEntry(model: Model, result: Result) {
            if (model.uid === 'api::url-mapper.url-mapper' || !result?.documentId) return;
            const cid = result?.documentId;
            const data = await strapi.db.query('api::url-mapper.url-mapper').findOne({
                where: { cid },
            });
            if (!data && !result?.slug) return;
            await strapi.db.query('api::url-mapper.url-mapper').update({
                where: { cid },
                data: {
                title: result?.title,
                description: result?.description,
                slug: result?.slug,
                content: flattenObject(result),
                },
            });
        },

        async deleteUrlMapperEntry(model: Model, result: Result) {
            if (model.uid === 'api::url-mapper.url-mapper' || !result?.documentId) return;
            await strapi.db.query('api::url-mapper.url-mapper').delete({
                where: { 
                cid: result?.documentId
                },
            });
        },

        // audit log functions
        async createAuditLogEntry(model: Model, result: Result, action: string) {

            let newData = { ...result };
            delete newData?.updatedBy;
            delete newData?.createdBy;

            if (!model?.uid || model?.uid === 'api::audit-log.audit-log' || model?.uid === 'api::url-mapper.url-mapper' || !result?.documentId || !result?.slug) return;

            const ct = strapi.contentType(model.uid);

            const doc = await strapi.documents('api::audit-log.audit-log').findFirst({
                filters: { 
                    name: {
                        $eq: model?.singularName
                    },
                    doc_id: {
                        $eq: result?.documentId
                    },
                },
                payload: true,
                sort: { date: 'asc' },
            })

            if (ct?.kind === 'singleType' || ct?.kind === 'collectionType') {
                let changes = {};
                if (doc) {
                    // normalize previous payload into an object to avoid nested ternary
                    let previousPayload: Record<string, any> = {};
                    if (doc.payload && typeof doc.payload === 'object' && doc.payload !== null) {
                        previousPayload = doc.payload as Record<string, any>;
                    }

                    changes = {
                        changesBy: {
                            firstname: result?.updatedBy?.firstname,
                            lastname: result?.updatedBy?.lastname,
                            username: result?.updatedBy?.username,
                            email: result?.updatedBy?.email,
                        },
                        changes: getDifference(previousPayload, result) as any
                    };
                }
                try {
                    await strapi.documents('api::audit-log.audit-log').create({
                        data: {
                            record_id: result?.id,
                            doc_id: result?.documentId,
                            name: model?.singularName,
                            slug: result?.slug,
                            admin_user: result?.createdBy?.documentId,
                            date: new Date(),
                            action: action,
                            // store a JSON-safe copy of result to satisfy JSONValue
                            payload: newData ? JSON.parse(JSON.stringify(newData)) : {},
                            changes,
                        }
                    })
                } catch(err) {
                    console.log('addAuditLogEntry error ===', err)
                }
            }
            return true;
        },

    }
}