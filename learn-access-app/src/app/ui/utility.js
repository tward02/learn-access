export const formatFiles = (files) => {
    return files?.reduce((acc, item) => {
        acc[item.name] = {code: item.content, readOnly: item.readOnly};
        return acc;
    }, {});
}
