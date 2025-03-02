import tinycolor from "tinycolor2";

export const formatFiles = (files) => {
    return files?.reduce((acc, item) => {
        acc[item.name] = {code: item.content, readOnly: item.readonly};
        return acc;
    }, {});
}

export const getAvatarColour = (username) => {
    const hash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colour = tinycolor({h: hash % 360, s: 70, l: 55});

    if (tinycolor.isReadable(colour, "#000", {level: "AA", size: "small"})) {
        return colour.toHexString();
    } else {
        return colour.lighten(10).toHexString();
    }
}
