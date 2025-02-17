import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL;

const postSolution = async (id, payload) => {
    const response = await axios.post(baseUrl + "test/" + id, {
        data: payload
    });
    return response.data;
}

export const usePostSolution = (id) => {
    const {
        isLoading: testSolutionLoading,
        error: testSolutionError,
        data: testSolutionData,
        mutate: testSolution,
        isSuccess: testSolutionSuccess
    } = useMutation({
        mutationFn: async (payload) => {
            return await postSolution(id, payload);
        }
    });

    return {testSolutionLoading, testSolutionError, testSolutionData, testSolution, testSolutionSuccess};
}
