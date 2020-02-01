import { Request } from "express";


export class RequestService {
    constructor() {}

    static normalizeRequest(req: Request) {
        let limit = +req.query.limit || 50;
        let page = +req.query.page || 0;
        let skip = page > 1 ? (page - 1) * limit : 0 || 0;
        let sortOrder = req.query.sortOrder || 'asc'
        let sort = sortOrder === 'asc' ? 1 : -1;
        return {limit, page, skip, sort};
    }
}