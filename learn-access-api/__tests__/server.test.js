const request = require("supertest");
const app = require("../server");

describe("GET /hello", () => {
    it("should return a hello message", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Hello, World!"});
    });
});