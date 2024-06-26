import { RequestHandler } from "express";
import { database } from "../database";
import path from "path";
import createHttpError from "http-errors";
import fs from "fs";

export const getFlag: RequestHandler = async (request, response, next) => {
    const zoneId = request.params.zoneId;
    const zone = await database.zone.findUnique({
        where: {
            id: zoneId
        }
    });

    if (zone === null) {
        return next(createHttpError(404, `Zone with the id ${zoneId} doesn't exist.`));
    }

    const filePath = path.join(__dirname, `../../assets/${zone.flag}`);
    if (!fs.existsSync(filePath)) {
        return next(createHttpError(404, `Flag ${filePath} doesn't exist.`));
    }

    response.status(200).sendFile(filePath);
}