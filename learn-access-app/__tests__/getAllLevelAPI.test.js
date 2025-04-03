/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {GET} from "@/app/api/level/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));

describe("API GET /level", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "GET"});

        const response = await GET(req, {params: {}});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Levels retrieved successfully then returns 200 Ok", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: [{name: "level 1"}, {name: "level 2"}, {name: "level 3"}]});

        const response = await GET(req, {params: {}});

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual([{name: "level 1"}, {name: "level 2"}, {name: "level 3"}]);
    });
});
