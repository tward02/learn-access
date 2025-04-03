/**
 * @jest-environment node
 */

import {getUser, hasSession} from "@/app/lib/dal";
import {createMocks} from "node-mocks-http";
import {sql} from "@vercel/postgres";
import {GET, POST} from "@/app/api/forum/[levelId]/route";

jest.mock("@vercel/postgres", () => ({
    sql: jest.fn(),
}));

jest.mock("../src/app/lib/dal", () => ({
    hasSession: jest.fn(),
    getUser: jest.fn(),
}));

describe("API GET /forum/[id]", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "GET"});

        const response = await GET(req, {levelId: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("User hasn't unlocked forum returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: []});

        const response = await GET(req, {params: {levelId: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You have not unlocked this forum yet"});
    });

    it("Get forum succeeds returns 200 Ok", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "GET"});
        sql.mockResolvedValueOnce({rows: [{userId: 1, levelId: 1}]});
        sql.mockResolvedValueOnce({rows: [{title: "Post 1", message: "Message 1", id: 1, userId: 5}]});
        sql.mockResolvedValueOnce({rows: [{id: 5, username: "user1", password: "password"}]});
        sql.mockResolvedValueOnce({rows: [{message: "Comment 1", id: 1, userId: 5}]});
        sql.mockResolvedValueOnce({rows: [{id: 5, username: "user2", password: "password"}]});
        sql.mockResolvedValueOnce({
            rows: [{id: 1, name: "File 1", content: "File 1 content", fileType: "js"}, {
                id: 2,
                name: "File 2",
                content: "File 2 content",
                fileType: "js"
            }]
        });

        const response = await GET(req, {params: {levelId: 1}});

        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual([{
            title: "Post 1",
            message: "Message 1",
            id: 1,
            userId: 5,
            username: "user1",
            comments: [{message: "Comment 1", id: 1, userId: 5, username: "user2"}],
            files: [{id: 1, name: "File 1", content: "File 1 content", fileType: "js"}, {
                id: 2,
                name: "File 2",
                content: "File 2 content",
                fileType: "js"
            }]
        }]);
    });
});

describe("API POST /forum/[id]", () => {

    it("Unauthorized user returns 401 Unauthorized", async () => {

        hasSession.mockReturnValue(false);
        const {req} = createMocks({method: "POST", body: {data: {}}});

        const response = await POST(req, {levelId: 1});

        expect(response.status).toBe(401);

        const data = await response.json();
        expect(data).toEqual({error: "You are not authenticated, please login"});
    });

    it("User hasn't unlocked forum returns 403 Forbidden", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({method: "POST", body: {data: {}}});
        sql.mockResolvedValueOnce({rows: []});

        const response = await POST(req, {params: {levelId: 1}});

        expect(response.status).toBe(403);

        const data = await response.json();
        expect(data).toEqual({error: "You have not unlocked this forum yet"});
    });

    it("Post with no files returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({
            method: "POST", body: {
                data: {
                    title: "Post 1",
                    message: "Message 1",
                    id: 1,
                    userId: 5,
                    files: []
                }
            }
        });
        sql.mockResolvedValueOnce({rows: [{userId: 1, levelId: 1}]});

        const response = await POST(req, {params: {levelId: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: "You are missing required fields"});
    });

    it("Post with missing fields returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({
            method: "POST", body: {
                data: {
                    title: "Post 1",
                    id: 1,
                    userId: 5,
                    files: [{id: 1, name: "File 1", content: "File 1 content", fileType: "js"}, {
                        id: 2,
                        name: "File 2",
                        content: "File 2 content",
                        fileType: "js"
                    }]
                }
            }
        });
        sql.mockResolvedValueOnce({rows: [{userId: 1, levelId: 1}]});

        const response = await POST(req, {params: {levelId: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: "You are missing required fields"});
    });

    it("Post with missing fields returns 400 Bad Request", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({
            method: "POST", body: {
                data: {
                    title: "Post 1",
                    message: "Message 1",
                    id: 1,
                    userId: 5,
                    files: [{id: 1, name: "File 1", content: "File 1 content", fileType: "js"}, {
                        id: 2,
                        content: "File 2 content",
                        fileType: "js"
                    }]
                }
            }
        });
        sql.mockResolvedValueOnce({rows: [{userId: 1, levelId: 1}]});

        const response = await POST(req, {params: {levelId: 1}});

        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data).toEqual({error: "You are missing required fields"});
    });

    it("Correct post created returns 201 No Content", async () => {

        hasSession.mockReturnValue(true);
        getUser.mockReturnValue({id: 1, username: "user", password: "password"});
        const {req} = createMocks({
            method: "POST", body: {
                data: {
                    title: "Post 1",
                    message: "Message 1",
                    id: 1,
                    userId: 5,
                    files: [{id: 1, name: "File 1", content: "File 1 content", fileType: "js"}, {
                        id: 2,
                        name: "File 2",
                        content: "File 2 content",
                        fileType: "js"
                    }]
                }
            }
        });
        sql.mockResolvedValueOnce({rows: [{userId: 1, levelId: 1}]});
        sql.mockResolvedValueOnce({rows: []});
        sql.mockResolvedValueOnce({rows: [{id: 1}]});

        const response = await POST(req, {params: {levelId: 1}});

        expect(response.status).toBe(201);

        const data = await response.json();
        expect(data).toEqual(null);
    });
});
