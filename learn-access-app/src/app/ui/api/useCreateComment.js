import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const createComment = async (postId, payload) => {
    const response = await axios.post(baseUrl + "api/post/" + postId, {
        data: payload,
    });
    return response.data;
}

export const useCreateComment = (postId) => {
    const {
        isLoading: createCommentLoading,
        error: createCommentError,
        data: createCommentData,
        mutate: createCommentFn,
        isSuccess: createCommentIsSuccess,
    } = useMutation({
        mutationFn: (payload) => {
            return createComment(postId, payload);
        }
    });

    return {createCommentLoading, createCommentError, createCommentData, createCommentFn, createCommentIsSuccess};
}
