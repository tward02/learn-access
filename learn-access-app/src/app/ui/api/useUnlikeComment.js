import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const unlikeComment = async (commentId) => {
    const response = await axios.delete(baseUrl + "api/comment/" + commentId + "/likes");
    return response?.data;
}

export const useUnlikeComment = (commentId) => {
    const {
        isLoading: unlikeLoading,
        error: unlikeError,
        data: unlikeData,
        mutate: unlikeCommentFn,
        isSuccess: unlikeSuccess
    } = useMutation({
        mutationFn: () => {
            return unlikeComment(commentId);
        }
    });

    return {unlikeLoading, unlikeError, unlikeData, unlikeCommentFn, unlikeSuccess};
}
