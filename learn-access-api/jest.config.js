module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy"
    },
    testMatch: ["**/testing/temp/**/*.test.js"],
    moduleDirectories: ["node_modules", "testing/temp"],
};