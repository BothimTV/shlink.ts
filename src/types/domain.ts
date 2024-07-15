export type domainListJson = {
    readonly domains: {
        readonly data: domainJson[];
        readonly defaultRedirects: {
            readonly baseUrlRedirect: null | string;
            readonly regular404Redirect: null | string;
            readonly invalidShortUrlRedirect: null | string;
        };
    };
};

export type domainJson = {
    readonly domain: string;
    readonly isDefault: boolean;
    readonly redirects: {
        baseUrlRedirect: null | string;
        regular404Redirect: null | string;
        invalidShortUrlRedirect: null | string;
    };
}
