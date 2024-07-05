import { shortUrlJson } from "../types/shortUrl";
import { Shlink } from "./Shlink";

let client: Shlink;
export class ShortUrl implements shortUrlJson {
    shortCode: string;
    shortUrl: string;
    longUrl: string;
    deviceLongUrls: {
        android: null | string;
        ios: null | string;
        desktop: null | string;
    };
    dateCreated: Date;
    tags: string[];
    meta: {
        validSince: null | Date;
        validUntil: null | Date;
        maxVisits: null | number;
    };
    domain: string;
    title: string | null;
    crawlable: boolean;
    forwardQuery: boolean;
    visitsSummary: { total: number; nonBots: number; bots: number };
    visitsCount: number;

    constructor(json: shortUrlJson, client: Shlink) {
        this.shortCode = json.shortCode;
        this.shortUrl = json.shortUrl;
        this.longUrl = json.longUrl;
        this.deviceLongUrls = json.deviceLongUrls;
        this.dateCreated = new Date(json.dateCreated);
        this.tags = json.tags;
        this.meta = {
            validSince: json.meta.validSince ? new Date(json.meta.validSince) : null,
            validUntil: json.meta.validUntil ? new Date(json.meta.validUntil) : null,
            maxVisits: json.meta.maxVisits,
        };
        this.domain = json.domain;
        this.title = json.title;
        this.crawlable = json.crawlable;
        this.forwardQuery = json.forwardQuery;
        this.visitsSummary = json.visitsSummary;
        this.visitsCount = json.visitsCount;
        client = client;
    }
}
