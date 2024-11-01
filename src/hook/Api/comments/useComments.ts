import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifyError, notifySuccess } from "../../../component/toastify/Toastify";
import endpoint from "../../../services/endpoint";
import rootApi from "../../../services/initApi";


type CommentParams = {
    content : string;
    taskId : string;
}
type Response = {
    data : any;
}

const useComments = () => {
    const QueryClient = useQueryClient();
    const { isError, data, error , mutateAsync} = useMutation({
        mutationFn: (Variable: CommentParams) => {
            return rootApi.post<CommentParams, Response>(
                endpoint.comments,
                Variable
            )
        },
        onSuccess: (e: any) => {
            notifySuccess(e?.response?.data?.messge || 'Comment successfully')
            QueryClient.invalidateQueries({
                queryKey: [endpoint.detailtask],
            });

        },
        onError: (e: any) => {
            notifyError(e.response?.data?.message || "An error occurred")

        }
    })
    return {
        isError,
        data,
        error,
        onComment: mutateAsync
    }
}
export default useComments;