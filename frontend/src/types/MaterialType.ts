export interface MaterialType {
    material_id: number,
    file_name: string,
    file_type?: string
    s3_bucket?: string,
    s3_key?: string
}