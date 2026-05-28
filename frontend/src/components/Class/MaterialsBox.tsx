import { useQuery } from "@tanstack/react-query"
import { MaterialAPIService } from "../../api/MaterialAPIService"

export const MaterialsBox = ({ post_id }: { post_id: number }) => {

    const { data } = useQuery({
        queryKey: ['materials', post_id],
        queryFn: () => MaterialAPIService.getAllMaterials(post_id)
    })

    return (
        <div className="p-3 flex">
            {data?.map(item => (
                <div className="px-2 py-1 flex items-center gap-2 border border-gray-400 rounded-xl cursor-pointer hover:bg-gray-300">
                    <img className="" src="//ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x16.png" aria-hidden="true" role="presentation" data-iml="20872"></img>
                    <span className="text-gray-800 font-[500]">{item.file_name}</span>
                </div>
            ))}

        </div>
    )
}
