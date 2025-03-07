import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const unlikePost = async (postId) => {
    const response = await axios.delete(baseUrl + "api/post/" + postId + "/likes");
    return response?.data;
}

export const useUnlikePost = (postId) => {
    const {
        isLoading: unlikeLoading,
        error: unlikeError,
        data: unlikeData,
        mutate: unlikePostFn,
        isSuccess: unlikeSuccess
    } = useMutation({
        mutationFn: () => {
            return unlikePost(postId);
        }
    });

    return {unlikeLoading, unlikeError, unlikeData, unlikePostFn, unlikeSuccess};
}
