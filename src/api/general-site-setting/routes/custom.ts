export default {
    routes: [
        {
            method: 'GET',
            path: '/sitemap/generate',
            handler: 'general-site-setting.sitemapGenerator',
            config: { 
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/sitemap/all',
            handler: 'general-site-setting.getAllData',
            config: { 
                auth: false
            }
        }
    ]
}