import dotenv from "dotenv";
dotenv.config();

const digital_ocean = {
    spaces_bucket: process.env.SPACES_BUCKET as string,
    spaces_bucket_url: process.env.SPACES_BUCKET_URL as string,
    spaces_key: process.env.SPACES_KEY as string,
    spaces_secret: process.env.SPACES_SECRET as string,
};

const jwt = {
    secret: process.env.JWT_SECRET as string,
    expiration: process.env.JWT_EXPIRATION as string,
};

const mongo = {
    url: process.env.MONGO_URL as string,
};

const CONSOLIDATED: { [key: string]: { [key: string]: string | undefined } } = { digital_ocean, jwt, mongo };

for (const config_name in CONSOLIDATED) {
    const current_object = CONSOLIDATED[config_name];
    if (Object.values(current_object).some((val) => typeof val === "undefined")) {
        console.log(`${current_object} is missing required environment variables`);
        process.exit(1);
    }
}

export default {
    digital_ocean,
    jwt,
    mongo,
};
