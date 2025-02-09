import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getForumPosts = async (levelId) => {
    const response = await axios.get(baseUrl + "api/forum/" + levelId);
    return response?.data;
}

export const useFetchForum = (levelId) => {
    const {
        isLoading: forumLoading,
        error: forumError,
        data: forumData,
        isSuccess: forumSuccess,
        refetch: forumRefetch,
        isRefetching: forumRefetching,
        isRefetchError: refetchError
    } = useQuery({
        queryKey: ['forum'],
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => await getForumPosts(levelId),
    });
    return {forumLoading, forumError, forumData, forumSuccess, forumRefetch, forumRefetching, refetchError};
}
