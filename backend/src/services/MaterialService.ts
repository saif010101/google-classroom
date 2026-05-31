import { DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { db } from "../utils/db.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface MaterialType {
    material_id : number
    file_name : string
    s3_key : string
}


const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
})


class MaterialService {

    async getMaterialsByPost(post_id: number) {
        const { rows } = await db.query(`select material_id,file_name,s3_key from materials where post_id = $1`,
            [post_id])
        return rows
    }

    async getMaterial(material_id: number) {
        const { rows } = await db.query(`select * from materials where material_id = $1`,
            [material_id])
        return rows[0]
    }

    async createPresignedUrl(s3_bucket: string, s3_key: string) {
        const command = new GetObjectCommand({
            Bucket: s3_bucket,
            Key: s3_key
        })

        return getSignedUrl(s3Client, command, { expiresIn: 60 * 15 })
    }

    async createUploadUrl(s3_bucket: string, s3_key: string, content_type: string) {
        const command = new PutObjectCommand({
            Bucket: s3_bucket,
            Key: s3_key,
            ContentType: content_type
        })

        return await getSignedUrl(s3Client, command)
    }

    async createMaterial(file_name: string, file_type: string, post_id: number, class_name: string, s3_bucket: string) {
        const s3_key = `${class_name}/${file_name}`
        await db.query(`insert into materials (s3_bucket,s3_key,file_name,file_type,post_id) 
            values ($1,$2,$3,$4,$5)`, [s3_bucket,s3_key,file_name,file_type,post_id])
    }

    async deleteMaterials(materials : MaterialType[],s3_bucket : string) {
        const command = new DeleteObjectsCommand({
            Bucket : s3_bucket,
            Delete : {
                Objects : materials.map(item => ({ Key : item.s3_key})),
                Quiet: false
            }
        })

        await s3Client.send(command)
    }

}


export default new MaterialService()

