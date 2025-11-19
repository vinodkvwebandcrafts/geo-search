/**
 * branch service
 */

import { factories } from '@strapi/strapi';
import { getCommonResponse } from '../../../helpers/getCommonResponse';
import { getImage } from '../../../helpers/getImage';
import { seoPopulate } from '../../../helpers/variables';

export default factories.createCoreService('api::branch.branch', ({ strapi }) => ({
    async getAllBranches(ctx) {

        const limit = Number(ctx.query?.limit) || 6;
        const offset = Number(ctx.query?.offset) || 0;
        const name = ctx.query?.name ? ctx.query.name.toLowerCase() : null;

        const latitude = ctx.query?.latitude ? Number(ctx.query.latitude) : null;
        const longitude = ctx.query?.longitude ? Number(ctx.query.longitude) : null;
        const radius = ctx.query?.radius ? Number(ctx.query.radius) : 1000;

        // If no lat/lng provided → skip geo search entirely
        if (!latitude || !longitude) {
            return {
                results: { branches: [] },
                pagination: {
                    limit,
                    offset,
                    pageCount: 0,
                    total: 0
                }
            };
        }

        const trx = await strapi.db.connection.transaction();

        let nearestBranches = null;

        try {
            const query = `
                SELECT 
                    id, 
                    branch_name,
                    latitude,
                    longitude,
                    slug,
                    latitude,
                    longitude,
                    location_id,
                    address,
                    email,
                    mobile,
                    telephone,
                    working_hours,
                    map_url,
                    (
                        6371000 * acos(
                            cos(radians(?)) * cos(radians(latitude)) *
                            cos(radians(longitude) - radians(?)) +
                            sin(radians(?)) * sin(radians(latitude))
                        )
                    ) AS distance
                FROM branches
                WHERE latitude IS NOT NULL
                AND longitude IS NOT NULL
                AND published_at IS NOT NULL
                AND (
                    6371000 * acos(
                        cos(radians(?)) * cos(radians(latitude)) *
                        cos(radians(longitude) - radians(?)) +
                        sin(radians(?)) * sin(radians(latitude))
                    )
                ) <= ?
                ORDER BY distance ASC
                LIMIT ?
                OFFSET ?
            `;

            nearestBranches = await trx.raw(query, [
                latitude,
                longitude,
                latitude,
                latitude,
                longitude,
                latitude,
                radius,
                limit,
                offset
            ]);

            await trx.commit();

            // return nearestBranches

        } catch (error) {
            await trx.rollback();
            strapi.log.error("Geo search error:", error);
            ctx.throw(500, error.message || "Internal server error");
        }

        const nearestBranchesIds = nearestBranches?.rows?.length > 0 ? nearestBranches?.rows?.map(item => item?.id) : []

        const [branches, count] = await strapi.db.query('api::branch.branch').findWithCount({
            where: {
                $and: [
                    {publishedAt: { $notNull: true }},
                    {
                        id: {
                            $notIn: nearestBranchesIds
                        }
                    },
                    name ? { branchName: { $containsi: name } } : {},
                ]
            },
            select: [
                'id',
                'branchName', 
                'slug', 
                'latitude', 
                'longitude', 
                'location_id', 
                'address',
                'email',
                'mobile',
                'telephone',
                'workingHours',
                'mapUrl'
            ],
            limit: limit,
            offset: offset,
            orderBy: {
                branchName: 'asc'
            },
        })

        if(!branches || branches.length === 0) {
            return {
                results: { branches: [] },
                pagination: {
                    limit: Math.ceil(limit),
                    offset: Math.ceil(offset),
                    pageCount: 0,
                    total: 0
                }
            };
        }

        const allBranches = [...nearestBranches?.rows, ...branches]
        
        return {
            results: {
                allBranches: allBranches?.length > 0 ? allBranches : [],
            },
            pagination: {
                limit: Math.ceil(limit),
                offset: Math.ceil(offset),
                pageCount: Math.ceil(count / limit),
                total: count
            }
        };
    },

    async getBranchDetails(ctx) {
        const url = ctx.request.url;
        const slug = url.split('/').pop();

        const data = await strapi.db.query('api::branch.branch').findOne({
            where: {
                publishedAt: {
                    $notNull: true
                },
                slug: slug
            },
            populate: {
                image: true,
                banner: true,
                mobile_banner: true,
                page_links: true,
                email: true,
                phone: true,
                office_time_desktop: true,
                office_time_mobile: true,
                notifications: true,
                widgets: {
                    populate: {
                        services: {
                            populate: {
                                image: true,
                                video: true
                            },
                            where: {
                                publishedAt: {
                                    $notNull: true
                                }
                            },
                            limit: 4
                        },
                        faqs: {
                            where: {
                                publishedAt: {
                                    $notNull: true
                                }
                            }
                        },
                        desktop_image: true,
                        mobile_image: true,
                    }
                },
                ...seoPopulate
            },
        });

        if(!data) {
            return null;
        }

        const structuredData = await getCommonResponse(data)

        const pageData = {
            title: data?.title ?? null,
            slug: data?.slug ?? null,
            url: data?.url ?? null,
            description: data?.description ?? null,
            reviews: data?.reviews ?? null,
            address: data?.address ?? null,
            image: data?.image ? getImage(data.image) : null,
            banner: data?.banner ? getImage(data.banner) : null,
            mobile_banner: data?.mobile_banner ? getImage(data.mobile_banner) : null,
            buttons: data?.page_links?.length > 0 ? data?.page_links?.map(item => ({
                title: item?.title ?? null,
                url: item?.url ?? null,
                icon: item?.icon ?? null,
                target_blank: item?.target_blank ?? false,
            })) : [],
            emails: data?.email?.length > 0 ? data?.email?.map(item => ({
                email: item?.title ?? null,
            })) : [],
            phones: data?.phone?.length > 0 ? data?.phone?.map(item => ({
                phone: item?.title ?? null,
            })) : [],
            office_timing_desktop: data?.office_time_desktop?.length > 0 ? data?.office_time_desktop?.map((item) => ({
                title: item?.title ?? null,
                value: item?.value ?? null
            })) : [],
            office_timing_mobile: data?.office_time_mobile?.length > 0 ? data?.office_time_mobile?.map((item) => ({
                title: item?.title ?? null,
                value: item?.value ?? null
            })) : [],
            notifications: data?.notifications?.length > 0 ? data?.notifications?.map(item => ({
                title: item?.title ?? null,
            })) : [],
        }
        let branchData = { ...pageData, ...structuredData };
        
        return branchData;
    }
}));
