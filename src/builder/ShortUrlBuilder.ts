export class ShortUrlBuilder {
    longUrl: string;
    tags: string[];

    customSlug?: string;
    shortCodeLength?: string
    title?: string;
    domain?: string;
    validSince?: string;
    validUntil?: string;
    maxVisits?: number;
    findIfExists?: boolean;
    validateUrl?: boolean;
    forwardQuery: boolean = true;
    deviceLongUrls: {
        android?: string;
        ios?: string;
        desktop?: string;
    } = {};
    crawlable?: boolean;

    constructor() {
        this.longUrl = "";
        this.tags = [];
    }

    public setUrl(url: string | URL): ShortUrlBuilder {
        this.longUrl = new URL(url).href;
        return this;
    }

    public setTags(tags: string[]): ShortUrlBuilder {
        this.tags = tags;
        return this;
    }

    public addTag(tag: string): ShortUrlBuilder {
        this.tags.push(tag);
        return this;
    }

    public setCustomSlug(slug: string): ShortUrlBuilder {
        this.customSlug = slug;
        this.shortCodeLength = undefined;
        return this;
    }

    public setShortCodeLength(length: number): ShortUrlBuilder {
        this.shortCodeLength = length.toString();
        this.customSlug = undefined;
        return this;
    }


    public setTitle(title: string): ShortUrlBuilder {
        this.title = title;
        return this;
    }

    public setDomain(domain: string): ShortUrlBuilder {
        this.domain = domain;
        return this;
    }

    // https://stackoverflow.com/a/17415677
    private formatTime(date: Date | number): string {
        date = typeof date == "number" ? new Date(date) : date
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num: number) {
                return (num < 10 ? '0' : '') + num;
            };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ':' + pad(Math.abs(tzo) % 60);
    }

    public setValidSince(date: Date | number): ShortUrlBuilder {
        this.validSince = this.formatTime(date);
        return this;
    }

    public setValidUntil(date: Date | number): ShortUrlBuilder {
        this.validUntil = this.formatTime(date);
        return this;
    }

    public setMaxVisits(maxVisits: number): ShortUrlBuilder {
        this.maxVisits = maxVisits;
        return this;
    }

    public setFindIfExists(findIfExists: boolean): ShortUrlBuilder {
        this.findIfExists = findIfExists;
        return this;
    }

    public setValidateUrl(validateUrl: boolean): ShortUrlBuilder {
        this.validateUrl = validateUrl;
        return this;
    }


    public setForwardQuery(forwardQuery: boolean): ShortUrlBuilder {
        this.forwardQuery = forwardQuery;
        return this;
    }

    public setAndroidRedirectUrl(url: string | URL): ShortUrlBuilder {
        this.deviceLongUrls.android = new URL(url).href;
        return this;
    }

    public setIosRedirectUrl(url: string | URL): ShortUrlBuilder {
        this.deviceLongUrls.ios = new URL(url).href;
        return this;
    }

    public setDesktopRedirectUrl(url: string | URL): ShortUrlBuilder {
        this.deviceLongUrls.desktop = new URL(url).href;
        return this;
    }

    public setCrawlable(crawlable: boolean): ShortUrlBuilder {
        this.crawlable = crawlable;
        return this;
    }

}
