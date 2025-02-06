import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getUserLevels = async () => {
    const response = await axios.get(baseUrl + "api/level");
    return response?.data;
}

export const useFetchLevels = () => {
    const {
        isLoading: levelsLoading,
        error: levelsError,
        data: levelsData,
        isSuccess: levelsSuccess,
        refetch: levelsRefetch,
        isRefetching: levelsRefetching,
        isRefetchError: refetchError
    } = useQuery({
        queryKey: ['levels'],
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => await getUserLevels(),
    });
    return {levelsLoading, levelsError, levelsData, levelsSuccess, levelsRefetch, levelsRefetching, refetchError};
}
