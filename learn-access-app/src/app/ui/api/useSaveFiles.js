import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const saveFiles = async (levelId, payload) => {
    const response = await axios.post(baseUrl + "api/level/" + levelId + "/files", {
        data: payload,
    });
    return response.data;
}

export const useSaveFiles = (levelId) => {
    const {
        isLoading: saveFilesLoading,
        error: saveFilesError,
        data: saveFilesData,
        mutate: saveFilesFn,
        isSuccess: saveFilesIsSuccess,
    } = useMutation({
        mutationFn: (payload) => {
            return saveFiles(levelId, payload);
        }
    });

    return {saveFilesLoading, saveFilesError, saveFilesData, saveFilesFn, saveFilesIsSuccess};
}
