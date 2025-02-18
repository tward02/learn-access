import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL;

const postTestSolution = async (id, payload) => {
    const response = await axios.post(baseUrl + "test/" + id, {
        data: payload
    });
    return response.data;
}

export const useTestSolution = (id) => {
    const {
        isLoading: testSolutionLoading,
        error: testSolutionError,
        data: testSolutionData,
        mutate: testSolution,
        isSuccess: testSolutionSuccess
    } = useMutation({
        mutationFn: (payload) => {
            return postTestSolution(id, payload);
        }
    });

    return {testSolutionLoading, testSolutionError, testSolutionData, testSolution, testSolutionSuccess};
}
