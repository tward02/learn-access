/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {POST} from "@/app/api/post/[postId]/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));

describe("API POST /post/[id]", () => {

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
        const {req} = createMocks({method: "POST", body: {data: {id: 1, message: "hello"}}});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(404);

        const data = await response.json();
        expect(data).toEqual({error: "Post does not exist"});
    });

    it("User hasn't unlocked forum returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {id: 1, message: "hello"}}});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You have not unlocked this forum yet"});
    });

    it("Request body doesn't contain required fields returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {id: 1}}});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 1}]});


        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: 'Missing required field'});
    });

    it("Database fails to create comment returns 500 Internal Server Error", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {id: 1, message: "hello"}}});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 1}]});
        sql.mockResolvedValueOnce({rows: []});


        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data).toEqual({error: 'Error creating comment'});
    });

    it("Comment successfully created returns 201 Created", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {id: 1, message: "hello"}}});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 2, message: "hello"}]});
        sql.mockResolvedValueOnce({rows: [{id: 1, levelid: 1, userid: 1}]});
        sql.mockResolvedValueOnce({rows: [{id: 3}]});


        const response = await POST(req, {params: {postId: 1}});

        expect(response.status).toBe(201);

        const data = await response.json();
        expect(data).toEqual({id: 3});
    });
});
