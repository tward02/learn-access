module.exports = {
    testMatch: ["**/*.test.js"],
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    moduleDirectories: ["node_modules", "testing/temp"],
};
