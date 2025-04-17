import tinycolor from "tinycolor2";

//changes object structure to match what the sandpack library expects
export const formatFiles = (files) => {
    return files?.reduce((acc, item) => {
        acc[item.name] = {code: item.content, readOnly: item.readonly};
        return acc;
    }, {});
}

//adapted from https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript, Title: Create a hexadecimal colour based on a string with JavaScript, Organisation: StackOverflow, Author: Joe Freeman, Accessed 05/02/2025
//hashes username into readable background co,lour for avatar
export const getAvatarColour = (username) => {
    const hash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colour = tinycolor({h: hash % 360, s: 70, l: 55});

    if (tinycolor.isReadable(colour, "#000", {level: "AA", size: "small"})) {
        return colour.toHexString();
    } else {
        return colour.lighten(10).toHexString();
    }
}
