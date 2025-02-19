import request from "supertest";
import app from "../server.js";

describe("GET /hello", () => {
    it("should return a hello message", async () => {
        const response = await request(app).get("/hello");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Hello, World!"});
    });
});
