/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {DELETE, POST} from "@/app/api/post/[postId]/likes/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));

describe("API POST /post/[id]/likes", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "POST"});

        const response = await POST(req, {postId: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Post doesn't exist returns 404 Not Found", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST"});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Post does not exist"});
    });

    it("User hasn't unlocked forum returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST"});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You have not unlocked this forum yet"});
    });

    it("Like post succeeds returns 201 Created", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST"});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 1}]});

        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(201);

        const data = await response.json();
        expect(data).toEqual(null);
    });
});

describe("API DELETE /post/[id]/likes", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "DELETE"});

        const response = await DELETE(req, {postId: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("Post doesn't exist returns 404 Not Found", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: []});

        const response = await DELETE(req, {params: {postId: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Post does not exist"});
    });

    it("User hasn't unlocked forum returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: []});

        const response = await DELETE(req, {params: {postId: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You have not unlocked this forum yet"});
    });

    it("Like post succeeds returns 200 Ok", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "DELETE"});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 1}]});

        const response = await DELETE(req, {params: {postId: 1}});

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual(null);
    });
});
