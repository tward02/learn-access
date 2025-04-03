/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {GET} from "@/app/api/level/[id]/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));

describe("API GET /level/[id]", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "GET"});

        const response = await GET(req, {id: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Post doesn't exist returns 404 Not Found", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: []});

        const response = await GET(req, {params: {id: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Level not found"});
    });

    it("User hasn't unlocked level returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: true}]});

        const response = await GET(req, {params: {id: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You don\'t have permission to view this level"});
    });

    it("Get level succeeds returns 200 Ok", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: false}]});
        sql.mockResolvedValueOnce({rows: [{name: "File 1", content: "1234"}, {name: "File 2", content: "1234"}]});
        sql.mockResolvedValueOnce({rows: [{name: "Hint 1", content: "hint"}, {name: "Hint 2", content: "hint"}]});
        sql.mockResolvedValueOnce({
            rows: [{name: "Saved File 1", content: "12345"}, {
                name: "Saved File 2",
                content: "12345"
            }]
        });

        const response = await GET(req, {params: {id: 1}});

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual({
            name: "level 1",
            locked: false,
            files: [{name: "File 1", content: "1234"}, {name: "File 2", content: "1234"}],
            hints: [{name: "Hint 1", content: "hint"}, {name: "Hint 2", content: "hint"}],
            savedFiles: [{name: "Saved File 1", content: "12345"}, {name: "Saved File 2", content: "12345"}]
        });
    });
});
