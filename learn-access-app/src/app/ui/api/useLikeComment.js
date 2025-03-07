import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const likeComment = async (commentId) => {
    const response = await axios.post(baseUrl + "api/comment/" + commentId + "/likes");
    return response?.data;
}

export const useLikeComment = (commentId) => {
    const {
        isLoading: likeLoading,
        error: likeError,
        data: likeData,
        mutate: likeCommentFn,
        isSuccess: likeSuccess
    } = useMutation({
        mutationFn: () => {
            return likeComment(commentId);
        }
    });

    return {likeLoading, likeError, likeData, likeCommentFn, likeSuccess};
}
