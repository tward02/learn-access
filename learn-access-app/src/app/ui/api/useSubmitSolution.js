import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_TEST_URL;

const submitSolution = async (id, payload) => {
    const response = await axios.post(baseUrl + "submit/" + id, {
        data: payload
    });
    return response.data;
}

export const useSubmitSolution = (id) => {
    const {
        isLoading: submitSolutionLoading,
        error: submitSolutionError,
        data: submitSolutionData,
        mutate: submitSolutionFn,
        isSuccess: submitSolutionSuccess
    } = useMutation({
        mutationFn: (payload) => {
            return submitSolution(id, payload);
        }
    });

    return {submitSolutionLoading, submitSolutionError, submitSolutionData, submitSolutionFn, submitSolutionSuccess};
}
