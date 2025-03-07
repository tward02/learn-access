import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const likePost = async (postId) => {
    const response = await axios.post(baseUrl + "api/post/" + postId + "/likes");
    return response?.data;
}

export const useLikePost = (postId) => {
    const {
        isLoading: likeLoading,
        error: likeError,
        data: likeData,
        mutate: likePostFn,
        isSuccess: likeSuccess
    } = useMutation({
        mutationFn: () => {
            return likePost(postId);
        }
    });

    return {likeLoading, likeError, likeData, likePostFn, likeSuccess};
}
