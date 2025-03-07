import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getLevel = async (id) => {
    const response = await axios.get(baseUrl + "api/level/" + id);
    return response?.data;
}

export const useFetchLevel = (id) => {
    const {
        isLoading: levelLoading,
        error: levelError,
        data: levelData,
        isSuccess: levelSuccess,
    } = useQuery({
        queryKey: ['level', id],
        retry: false,
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
        queryFn: async () => await getLevel(id),
    });
    return {levelLoading, levelError, levelData, levelSuccess};
}
