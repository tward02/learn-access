import '@testing-library/jest-dom'
import {act, render, screen, within} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useFetchForum} from "@/app/ui/api/useFetchForum";
import ForumContent from "@/app/forum/[levelId]/ForumContent";

const forumDataNoPosts = []

const forumData = [
    {
        "id": 1,
        "userid": 29,
        "levelid": 6,
        "datetime": "2025-02-24T21:56:49.995Z",
        "title": "Post 1",
        "message": "Post 1 message",
        "likes": "2",
        "isliked": true,
        "username": "tward02",
        "comments": [
            {
                "id": 1,
                "postid": 1,
                "userid": 29,
                "datetime": "2025-02-26T00:05:54.521Z",
                "message": "Post 1 comment 1",
                "likes": "8",
                "isliked": true,
                "username": "tward02"
            },
            {
                "id": 2,
                "postid": 1,
                "userid": 29,
                "datetime": "2025-02-26T00:16:25.291Z",
                "message": "Post 1 comment 2",
                "likes": "0",
                "isliked": false,
                "username": "tward02"
            },
            {
                "id": 3,
                "postid": 1,
                "userid": 29,
                "datetime": "2025-02-26T00:24:03.995Z",
                "message": "Post 1 comment 3",
                "likes": "2",
                "isliked": true,
                "username": "tward02"
            },
            {
                "id": 4,
                "postid": 1,
                "userid": 29,
                "datetime": "2025-02-26T00:25:43.841Z",
                "message": "Post 1 comment 4",
                "likes": "1",
                "isliked": true,
                "username": "tward02"
            },
            {
                "id": 5,
                "postid": 1,
                "userid": 29,
                "datetime": "2025-02-26T13:58:01.245Z",
                "message": "Post 1 comment 5",
                "likes": "3",
                "isliked": false,
                "username": "tward02"
            }
        ],
        "files": [
            {
                "id": 1,
                "postid": 1,
                "name": "App.js",
                "filetype": "js",
                "content": "export default function App() {\n    return <h1>I love WCAG!</h1>\n}"
            },
            {
                "id": 2,
                "postid": 1,
                "name": "styles.css",
                "filetype": "css",
                "content": "h1 {\n    color: blue;\n}"
            }
        ]
    },
    {
        "id": 11,
        "userid": 29,
        "levelid": 6,
        "datetime": "2025-03-13T19:36:02.830Z",
        "title": "Post 2",
        "message": "Post 2 message",
        "likes": "1",
        "isliked": false,
        "username": "tward02",
        "comments": [
            {
                "id": 11,
                "postid": 11,
                "userid": 31,
                "datetime": "2025-03-15T14:49:17.538Z",
                "message": "Post 2 comment 1",
                "likes": "6",
                "isliked": false,
                "username": "Shaw123"
            }
        ],
        "files": [
            {
                "id": 21,
                "postid": 11,
                "name": "App.js",
                "filetype": "js",
                "content": "export default function App() {\n    return <h1>I love WCAG!</h1>\n}"
            },
            {
                "id": 22,
                "postid": 11,
                "name": "styles.css",
                "filetype": "css",
                "content": "h1 {\n    color: blue;\n}"
            }
        ]
    },
    {
        "id": 13,
        "userid": 28,
        "levelid": 6,
        "datetime": "2025-03-25T23:36:24.754Z",
        "title": "Post 3",
        "message": "Post 3 message",
        "likes": "4",
        "isliked": false,
        "username": "test1",
        "comments": [],
        "files": [
            {
                "id": 25,
                "postid": 13,
                "name": "App.js",
                "filetype": "js",
                "content": "export default function App() {\n    return <h1>I love WCAG!</h1>\n}"
            },
            {
                "id": 26,
                "postid": 13,
                "name": "styles.css",
                "filetype": "css",
                "content": "h1 {\n    color: blue;\n}"
            }
        ]
    }
]

const queryClient = new QueryClient();

jest.mock("../src/app/ui/api/useFetchForum", () => ({
    useFetchForum: jest.fn(),
}));

describe('Empty ForumPage renders correctly when no errors', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: false,
            forumData: forumDataNoPosts,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));
    });

    it('All elements render correctly when no posts', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();

        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByText("No posts right now, please check again later")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();
    })
});

describe('ForumPage renders correctly when no errors', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: false,
            forumData: forumData,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));
    });

    it('All original elements render correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.queryByText("No posts right now, please check again later")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).not.toBeDisabled();
        expect(dateSort).not.toBeDisabled();
        expect(likeSort).not.toBeDisabled();
    })

    it('All forum post elements render correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
        expect(screen.getByText("Post 3")).toBeInTheDocument();

        expect(screen.getByText("Post 1 message")).toBeInTheDocument();
        expect(screen.getByText("Post 2 message")).toBeInTheDocument();
        expect(screen.getByText("Post 3 message")).toBeInTheDocument();

        expect(screen.getAllByTestId("post").length).toBe(3);

        expect(screen.queryByText("Post 1 comment 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Post 1 comment 2")).not.toBeInTheDocument();
        expect(screen.queryByText("Post 1 comment 3")).not.toBeInTheDocument();
        expect(screen.queryByText("Post 1 comment 4")).not.toBeInTheDocument();
        expect(screen.queryByText("Post 1 comment 5")).not.toBeInTheDocument();

        const content = screen.getAllByTestId("post-content");

        expect(content.length).toBe(3);
        expect(screen.getAllByTestId("expand-post").length).toBe(3);
        expect(screen.getAllByTestId("like-button-post.true").length).toBe(1);
        expect(screen.getAllByTestId("like-button-post.false").length).toBe(2);

        expect(screen.getByText("5 Comments")).toBeInTheDocument();
        expect(screen.getByText("1 Comments")).toBeInTheDocument();
        expect(screen.getByText("0 Comments")).toBeInTheDocument();

        expect(screen.getAllByText("App.js").length).toBe(3);
        expect(screen.getAllByText("styles.css").length).toBe(3);

        for (let i = 0; i < content.length; i++) {
            const selectedContent = content[i];

            expect(within(selectedContent).getByText("export")).toBeInTheDocument();
            expect(within(selectedContent).getByText("default")).toBeInTheDocument();
            expect(within(selectedContent).getByText("function")).toBeInTheDocument();
            expect(within(selectedContent).getByText("App")).toBeInTheDocument();
            expect(within(selectedContent).getByText("(")).toBeInTheDocument();
            expect(within(selectedContent).getByText(")")).toBeInTheDocument();
            expect(within(selectedContent).getByText("{")).toBeInTheDocument();
            expect(within(selectedContent).getByText("return")).toBeInTheDocument();
            expect(within(selectedContent).getByText("<")).toBeInTheDocument();
            expect(within(selectedContent).getAllByText("h1").length).toBe(2);
            expect(within(selectedContent).getAllByText(">").length).toBe(2);
            expect(within(selectedContent).getByText("I love WCAG!")).toBeInTheDocument();
            expect(within(selectedContent).getByText("</")).toBeInTheDocument();
        }
    })

    it('Code viewer functions correctly on each post', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const content = screen.getAllByTestId("post-content");
        expect(content.length).toBe(3);

        const appButtons = screen.getAllByText("App.js");
        expect(appButtons.length).toBe(3);

        const stylesButtons = screen.getAllByText("styles.css");
        expect(stylesButtons.length).toBe(3);

        for (let i = 0; i < content.length; i++) {
            const selectedContent = content[i];

            expect(within(selectedContent).getByText("export")).toBeInTheDocument();
            expect(within(selectedContent).getByText("default")).toBeInTheDocument();
            expect(within(selectedContent).getByText("function")).toBeInTheDocument();
            expect(within(selectedContent).getByText("App")).toBeInTheDocument();
            expect(within(selectedContent).getByText("(")).toBeInTheDocument();
            expect(within(selectedContent).getByText(")")).toBeInTheDocument();
            expect(within(selectedContent).getByText("{")).toBeInTheDocument();
            expect(within(selectedContent).getByText("return")).toBeInTheDocument();
            expect(within(selectedContent).getByText("<")).toBeInTheDocument();
            expect(within(selectedContent).getAllByText("h1").length).toBe(2);
            expect(within(selectedContent).getAllByText(">").length).toBe(2);
            expect(within(selectedContent).getByText("I love WCAG!")).toBeInTheDocument();
            expect(within(selectedContent).getByText("</")).toBeInTheDocument();
        }

        for (let i = 0; i < stylesButtons.length; i++) {
            act(() => {
                stylesButtons[i].click();
            })
        }

        const newContent = screen.getAllByTestId("post-content");
        expect(newContent.length).toBe(3);

        for (let i = 0; i < newContent.length; i++) {
            const selectedContent = newContent[i];

            expect(within(selectedContent).getByText("h1")).toBeInTheDocument();
            expect(within(selectedContent).getByText("{")).toBeInTheDocument();
            expect(within(selectedContent).getByText("color")).toBeInTheDocument();
            expect(within(selectedContent).getByText(":")).toBeInTheDocument();
            expect(within(selectedContent).getByText("blue")).toBeInTheDocument();
            expect(within(selectedContent).getByText("{")).toBeInTheDocument();
            expect(within(selectedContent).getByText(";")).toBeInTheDocument();
            expect(within(selectedContent).getByText("}")).toBeInTheDocument();
        }

        for (let i = 0; i < appButtons.length; i++) {
            act(() => {
                appButtons[i].click();
            })

        }

        const newNewContent = screen.getAllByTestId("post-content");
        expect(newNewContent.length).toBe(3);

        for (let i = 0; i < newNewContent.length; i++) {
            const selectedContent = newNewContent[i];

            expect(within(selectedContent).getByText("export")).toBeInTheDocument();
            expect(within(selectedContent).getByText("default")).toBeInTheDocument();
            expect(within(selectedContent).getByText("function")).toBeInTheDocument();
            expect(within(selectedContent).getByText("App")).toBeInTheDocument();
            expect(within(selectedContent).getByText("(")).toBeInTheDocument();
            expect(within(selectedContent).getByText(")")).toBeInTheDocument();
            expect(within(selectedContent).getByText("{")).toBeInTheDocument();
            expect(within(selectedContent).getByText("return")).toBeInTheDocument();
            expect(within(selectedContent).getByText("<")).toBeInTheDocument();
            expect(within(selectedContent).getAllByText("h1").length).toBe(2);
            expect(within(selectedContent).getAllByText(">").length).toBe(2);
            expect(within(selectedContent).getByText("I love WCAG!")).toBeInTheDocument();
            expect(within(selectedContent).getByText("</")).toBeInTheDocument();
        }
    })

    it('All forum post elements sort correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(within(posts[0]).getByText("Post 1")).toBeInTheDocument();
        expect(within(posts[1]).getByText("Post 2")).toBeInTheDocument();
        expect(within(posts[2]).getByText("Post 3")).toBeInTheDocument();

        act(() => {
            likeSort.click();
        })

        const newPosts = screen.getAllByTestId("post");
        expect(newPosts.length).toBe(3);

        expect(within(newPosts[0]).getByText("Post 3")).toBeInTheDocument();
        expect(within(newPosts[1]).getByText("Post 1")).toBeInTheDocument();
        expect(within(newPosts[2]).getByText("Post 2")).toBeInTheDocument();

        act(() => {
            dateSort.click();
        })

        const newNewPosts = screen.getAllByTestId("post");
        expect(newNewPosts.length).toBe(3);

        expect(within(newNewPosts[0]).getByText("Post 3")).toBeInTheDocument();
        expect(within(newNewPosts[1]).getByText("Post 2")).toBeInTheDocument();
        expect(within(newNewPosts[2]).getByText("Post 1")).toBeInTheDocument();
    })

    it('Forum comments render correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        const expand = screen.getAllByTestId("expand-post");
        expect(expand.length).toBe(3);

        expect(screen.queryByTestId("comment")).not.toBeInTheDocument();

        act(() => {
            expand[0].click();
        })

        expect(screen.getAllByTestId("comment").length).toBe(5);
        expect(within(posts[0]).getByText("Post 1 comment 1")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Post 1 comment 2")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Post 1 comment 3")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Post 1 comment 4")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Post 1 comment 5")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Comment")).toBeInTheDocument();
        expect(within(posts[0]).getByText("Likes")).not.toBeDisabled();
        expect(within(posts[0]).getByText("Date")).not.toBeDisabled();

        act(() => {
            expand[2].click();
        })

        expect(within(posts[2]).queryAllByTestId("comment").length).toBe(0);
        expect(within(posts[2]).getByText("Likes")).toBeDisabled();
        expect(within(posts[2]).getByText("Date")).toBeDisabled();

        const addComment = within(posts[2]).getByText("Comment");

        expect(addComment).toBeInTheDocument();
        expect(within(posts[2]).getByText("No comments yet, check back later")).toBeInTheDocument();

        act(() => {
            addComment.click();
        })

        expect(screen.getAllByText("Add Comment").length).toBe(2);
        expect(screen.getByText("Cancel")).toBeInTheDocument();

        act(() => {
            screen.getByText("Cancel").click();
        })
    })

    it('Forum comments sort correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        const expand = screen.getAllByTestId("expand-post");
        expect(expand.length).toBe(3);

        expect(screen.queryByTestId("comment")).not.toBeInTheDocument();

        act(() => {
            expand[0].click();
        })

        const sortLikes = within(posts[0]).getByText("Likes");
        expect(sortLikes).toBeInTheDocument();

        const sortDates = within(posts[0]).getByText("Date");
        expect(sortDates).toBeInTheDocument();

        const comments = screen.getAllByTestId("comment");
        expect(comments.length).toBe(5);

        expect(within(comments[0]).getByText("Post 1 comment 1")).toBeInTheDocument();
        expect(within(comments[1]).getByText("Post 1 comment 2")).toBeInTheDocument();
        expect(within(comments[2]).getByText("Post 1 comment 3")).toBeInTheDocument();
        expect(within(comments[3]).getByText("Post 1 comment 4")).toBeInTheDocument();
        expect(within(comments[4]).getByText("Post 1 comment 5")).toBeInTheDocument();

        act(() => {
            sortLikes.click();
        })

        const newComments = screen.getAllByTestId("comment");
        expect(newComments.length).toBe(5);

        expect(within(newComments[0]).getByText("Post 1 comment 1")).toBeInTheDocument();
        expect(within(newComments[1]).getByText("Post 1 comment 5")).toBeInTheDocument();
        expect(within(newComments[2]).getByText("Post 1 comment 3")).toBeInTheDocument();
        expect(within(newComments[3]).getByText("Post 1 comment 4")).toBeInTheDocument();
        expect(within(newComments[4]).getByText("Post 1 comment 2")).toBeInTheDocument();

        act(() => {
            sortDates.click();
        })

        const newNewComments = screen.getAllByTestId("comment");
        expect(newNewComments.length).toBe(5);

        expect(within(newNewComments[0]).getByText("Post 1 comment 5")).toBeInTheDocument();
        expect(within(newNewComments[1]).getByText("Post 1 comment 4")).toBeInTheDocument();
        expect(within(newNewComments[2]).getByText("Post 1 comment 3")).toBeInTheDocument();
        expect(within(newNewComments[3]).getByText("Post 1 comment 2")).toBeInTheDocument();
        expect(within(newNewComments[4]).getByText("Post 1 comment 1")).toBeInTheDocument();
    })

    it('Post can be liked and unliked when it is already liked', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        expect(within(posts[0]).getByTestId("like-button-post.true")).toBeInTheDocument();
        expect(within(posts[0]).queryByTestId("like-button-post.false")).not.toBeInTheDocument();
        expect(within(posts[0]).getByText("2")).toBeInTheDocument();
        expect(within(posts[0]).queryByText("1")).not.toBeInTheDocument();

        act(() => {
            within(posts[0]).getByTestId("like-button-post.true").click();
        })

        expect(within(screen.getAllByTestId("post")[0]).getByTestId("like-button-post.false")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("post")[0]).getByText("1")).toBeInTheDocument();

        act(() => {
            within(posts[0]).getByTestId("like-button-post.false").click();
        })

        expect(within(screen.getAllByTestId("post")[0]).getByTestId("like-button-post.true")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("post")[0]).getByText("2")).toBeInTheDocument();
    })

    it('Post can be liked and unliked when it is not already liked', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        expect(within(posts[1]).getByTestId("like-button-post.false")).toBeInTheDocument();
        expect(within(posts[1]).queryByTestId("like-button-post.true")).not.toBeInTheDocument();
        expect(within(posts[1]).getByText("1")).toBeInTheDocument();
        expect(within(posts[1]).queryByText("2")).not.toBeInTheDocument();

        act(() => {
            within(posts[1]).getByTestId("like-button-post.false").click();
        })

        expect(within(screen.getAllByTestId("post")[1]).getByTestId("like-button-post.true")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("post")[1]).getByText("2")).toBeInTheDocument();

        act(() => {
            within(posts[1]).getByTestId("like-button-post.true").click();
        })

        expect(within(screen.getAllByTestId("post")[1]).getByTestId("like-button-post.false")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("post")[1]).getByText("1")).toBeInTheDocument();
    })

    it('Comment can be liked and unliked when it is already liked', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        const expand = screen.getAllByTestId("expand-post");
        expect(expand.length).toBe(3);

        expect(screen.queryByTestId("comment")).not.toBeInTheDocument();

        act(() => {
            expand[0].click();
        })

        const comments = screen.getAllByTestId("comment");
        expect(comments.length).toBe(5);

        expect(within(comments[0]).getByTestId("comment-like.true")).toBeInTheDocument();
        expect(within(comments[0]).queryByTestId("comment-like.false")).not.toBeInTheDocument();
        expect(within(comments[0]).getByText("8")).toBeInTheDocument();
        expect(within(comments[0]).queryByText("7")).not.toBeInTheDocument();

        act(() => {
            within(comments[0]).getByTestId("comment-like.true").click();
        })

        expect(within(screen.getAllByTestId("comment")[0]).getByTestId("comment-like.false")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("comment")[0]).getByText("7")).toBeInTheDocument();

        act(() => {
            within(comments[0]).getByTestId("comment-like.false").click();
        })

        expect(within(screen.getAllByTestId("comment")[0]).getByTestId("comment-like.true")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("comment")[0]).getByText("8")).toBeInTheDocument();
    })

    it('Comment can be liked and unliked when it is not already liked', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        const posts = screen.getAllByTestId("post");
        expect(posts.length).toBe(3);

        const expand = screen.getAllByTestId("expand-post");
        expect(expand.length).toBe(3);

        expect(screen.queryByTestId("comment")).not.toBeInTheDocument();

        act(() => {
            expand[0].click();
        })

        const comments = screen.getAllByTestId("comment");
        expect(comments.length).toBe(5);

        expect(within(comments[1]).getByTestId("comment-like.false")).toBeInTheDocument();
        expect(within(comments[1]).queryByTestId("comment-like.true")).not.toBeInTheDocument();
        expect(within(comments[1]).getByText("0")).toBeInTheDocument();
        expect(within(comments[1]).queryByText("1")).not.toBeInTheDocument();

        act(() => {
            within(comments[1]).getByTestId("comment-like.false").click();
        })

        expect(within(screen.getAllByTestId("comment")[1]).getByTestId("comment-like.true")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("comment")[1]).getByText("1")).toBeInTheDocument();

        act(() => {
            within(comments[1]).getByTestId("comment-like.true").click();
        })

        expect(within(screen.getAllByTestId("comment")[1]).getByTestId("comment-like.false")).toBeInTheDocument();
        expect(within(screen.getAllByTestId("comment")[1]).getByText("0")).toBeInTheDocument();
    })
});

describe('Error ForumPage renders correctly', () => {

    const refetch = jest.fn();

    it('All elements render correctly when there is a general error', async () => {

        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: true,
            forumData: forumDataNoPosts,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();

        expect(screen.getByTestId("error-general")).toBeInTheDocument();
    })

    it('All elements render correctly when 404 Not Found', async () => {

        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: {status: 404},
            forumData: forumDataNoPosts,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();

        expect(screen.getByText("The forum you are looking for doesn't seem to exist, please return to the homepage and select another forum.")).toBeInTheDocument();
    })

    it('All elements render correctly when 401 Unauthorised', async () => {

        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: {status: 401},
            forumData: forumDataNoPosts,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();

        expect(screen.getByText("You don't seem to be authenticated, please return to the homepage and login or register.")).toBeInTheDocument();
    })

    it('All elements render correctly when 403 Forbidden', async () => {

        useFetchForum.mockImplementation(() => ({
            forumLoading: false,
            forumError: {status: 403},
            forumData: forumDataNoPosts,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();

        expect(screen.getByText("You don't have permission to view this forum at the moment, please return to the homepage and choose a forum or level you have unlocked.")).toBeInTheDocument();
    })
});

describe('Loading ForumPage renders correctly when no errors', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchForum.mockImplementation(() => ({
            forumLoading: true,
            forumError: false,
            forumData: null,
            forumSuccess: true,
            forumRefetch: refetch,
            forumRefetching: false,
            refetchError: false
        }));
    });

    it('All elements render correctly when forum is loading', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ForumContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("Forum")).toBeInTheDocument();

        expect(screen.queryByTestId("loading")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

        const refresh = screen.getByText("Refresh Feed");
        const dateSort = screen.getByText("Sort by Date");
        const likeSort = screen.getByText("Sort by Likes");

        expect(refresh).toBeInTheDocument();
        expect(dateSort).toBeInTheDocument();
        expect(likeSort).toBeInTheDocument();

        expect(refresh).toBeDisabled();
        expect(dateSort).toBeDisabled();
        expect(likeSort).toBeDisabled();
    })
});
