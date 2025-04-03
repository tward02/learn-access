/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {DELETE, POST} from "@/app/api/level/[id]/files/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));


describe("API POST /level/[id]/files", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "POST", body: {data: {}}});

        const response = await POST(req, {id: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Level doesn't exist returns 404 Not Found", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {}}});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {id: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Level not found"});
    });

    it("User hasn't unlocked level returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {}}});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: true}]});

        const response = await POST(req, {params: {id: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You don\'t have permission to view this level"});
    });

    it("Missing files returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {}}});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: false}]});

        const response = await POST(req, {params: {id: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: "You are missing required fields"});
    });

    it("Missing required file items returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {files: [{content: "1234", name: "file 1"}]}}});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: false}]});

        const response = await POST(req, {params: {id: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: "You are missing required fields"});
    });

    it("Correct level files request processed returns 201 Created", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({
            method: "POST",
            body: {data: {files: [{content: "1234", name: "file 1", fileType: "js"}]}}
        });
        sql.mockResolvedValueOnce({rows: [{name: "level 1", locked: false}]});

        const response = await POST(req, {params: {id: 1}});

        expect(response.status).toBe(201);

        const data = await response.json();
        expect(data).toEqual(null);
    });
});

describe("API DELETE /level/[id]/files", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "DELETE"});

        const response = await DELETE(req, {id: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Level doesn't exist returns 404 Not Found", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: []});

        const response = await DELETE(req, {params: {id: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Level not found"});
    });

    it("User hasn't completed level returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", completed: false}]});

        const response = await DELETE(req, {params: {id: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You don\'t have permission to do this"});
    });

    it("Successful delete returns 200 Ok", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: [{name: "level 1", completed: true}]});

        const response = await DELETE(req, {params: {id: 1}});

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(null);
    });
});
