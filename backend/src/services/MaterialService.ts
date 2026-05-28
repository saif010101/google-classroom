import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { db } from "../utils/db.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
})


class MaterialService {

    async getMaterialsByPost(post_id: number) {
        const { rows } = await db.query(`select material_id,file_name from materials where post_id = $1`,
            [post_id])
        return rows
    }

    async getMaterial(material_id : number) {
        const { rows } = await db.query(`select * from materials where material_id = $1`,
            [material_id])
        return rows[0]
    }
    
    async createPresignedUrl(s3_bucket : string,s3_key : string){
        const command = new GetObjectCommand({
            Bucket: s3_bucket,
            Key: s3_key
        })

        return getSignedUrl(s3Client,command)
    }

}
 

export default new MaterialService()