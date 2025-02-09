export const formatFiles = (files) => {
    return files?.reduce((acc, item) => {
        acc[item.name] = {code: item.content};
        return acc;
    }, {});
}
