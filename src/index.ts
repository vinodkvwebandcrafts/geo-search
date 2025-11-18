import type { Core } from '@strapi/strapi';
import { Model } from '../types/custom/model';
import { Result } from '../types/custom/result';
import revalidateUrl from './helpers/revalidate';
import lifecycleFunctions from './helpers/lifecycleFunctions';
import addColumnSchema from './helpers/addColumnSchema';
import branches from "./branches.json"

async function handleAfterCreate(strapi: Core.Strapi, model: Model, result: Result, action: string) {
  await lifecycleFunctions(strapi).createUrlMapperEntry(model, result);
}

async function handleAfterUpdate(strapi: Core.Strapi, model: Model, result: Result, action: string) {
  await lifecycleFunctions(strapi).updateUrlMapperEntry(model, result);
}

async function handleAfterDelete(strapi: Core.Strapi, model: Model, result: Result, action: string) {
  await lifecycleFunctions(strapi).deleteUrlMapperEntry(model, result);
}

export default {
  async register({ strapi }: { strapi: Core.Strapi }) {
    await addColumnSchema(strapi);
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {

    const count = await strapi.db.query("api::branch.branch").count();

    if (count === 0) {
      await Promise.all(
        branches.map((item) =>
          strapi.documents("api::branch.branch").create({
            data: item,
          })
        )
      );

      console.log("Branches imported from JSON ✔️");
    }

    strapi.db.lifecycles.subscribe(async (event) => {
      const action = event.action as string;
      const model = event.model as Model;
      const result = event.result as Result;

      if (action === 'afterCreate') {
        await handleAfterCreate(strapi, model, result, action);
        await lifecycleFunctions(strapi).createAuditLogEntry(model, result, action);
        await revalidateUrl();
      }

      if (action === 'afterUpdate') {
        await handleAfterUpdate(strapi, model, result, action);
        await lifecycleFunctions(strapi).createAuditLogEntry(model, result, action);
        await revalidateUrl();
      }

      if (action === 'afterDelete') {
        await handleAfterDelete(strapi, model, result, action);
        await lifecycleFunctions(strapi).createAuditLogEntry(model, result, action);
        await revalidateUrl();
      }

    });
  },
};