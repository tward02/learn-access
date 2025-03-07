import axios from "axios";
import {useMutation} from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const deleteSavedFiles = async (levelId) => {
    const response = await axios.delete(baseUrl + "api/level/" + levelId + "/files");
    return response.data;
}

export const useDeleteSavedFiles = (levelId) => {
    const {
        isLoading: deleteSavedFilesLoading,
        error: deleteSavedFilesError,
        data: deleteSavedFilesData,
        mutate: deleteSavedFilesFn,
        isSuccess: deleteSavedFilesIsSuccess,
    } = useMutation({
        mutationFn: () => {
            return deleteSavedFiles(levelId);
        }
    });

    return {
        deleteSavedFilesLoading,
        deleteSavedFilesError,
        deleteSavedFilesData,
        deleteSavedFilesFn,
        deleteSavedFilesIsSuccess
    };
}
