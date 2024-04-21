import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./spaces";
import config from "../../config";

interface UploadParams {
    Body: Buffer;
    Key: string;
}

export const upload_image = ({ Body, Key }: UploadParams) => {
    const command = new PutObjectCommand({
        Body,
        ACL: "public-read",
        Bucket: config.digital_ocean.spaces_bucket,
        Key,
    });
    return s3Client.send(command);
};
