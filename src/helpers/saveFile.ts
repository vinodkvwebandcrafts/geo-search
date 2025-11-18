import path from "path";
import { AnyObj } from "./types";
import crypto from "crypto";
import fs from "fs";
import { createOrGetFolders } from "./createOrGetFolders";

export async function saveFile(file: AnyObj | null, foldername: string) {
    if (!file) return false;
    if (!foldername) throw new Error("foldername is required");

    const folder = await createOrGetFolders(foldername);

    const dbPath = `/uploads/${foldername}`;
    const storePath = path.join(process.cwd(), "public", dbPath); // safer join
    const originalFileName = file.originalFilename;

    const hash = crypto.randomBytes(20).toString("hex");
    const hashName = `${hash}_${originalFileName}`;
    const dbSavePath = `${dbPath}/${hashName}`;
    const checkPath = path.join(storePath, hashName);

    if (!fs.existsSync(storePath)) {
        fs.mkdirSync(storePath, { recursive: true });
    }

    // synchronous read/write for predictable lifecycle behavior
    const buffer = fs.readFileSync(file.filepath);
    fs.writeFileSync(checkPath, buffer, { mode: 0o644 });

    const ext = path.extname(originalFileName);

    const fileData = {
        name: originalFileName,
        alternativeText: originalFileName,
        caption: originalFileName,
        folder,
        folderPath: `/${folder?.id}`,
        url: dbSavePath,
        hash: hashName,
        ext,
        mime: file?.mimetype,
        size: file?.size ?? null,
    };

    return strapi.db.query("plugin::upload.file").create({ data: fileData });
}