import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const createPost = async (levelId, payload) => {
    const response = await axios.post(baseUrl + "api/forum/" + levelId, {
        data: payload,
    });
    return response.data;
}

export const useCreatePost = (levelId) => {
    const {
        isLoading: createPostLoading,
        error: createPostError,
        data: createPostData,
        mutate: createPostFn,
        isSuccess: createPostIsSuccess,
    } = useMutation({
        mutationFn: (payload) => {
            return createPost(levelId, payload);
        }
    });

    return {createPostLoading, createPostError, createPostData, createPostFn, createPostIsSuccess};
}
