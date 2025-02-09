export const forumPost = [
    {
        id: 1,
        title: "This is my solution to level 1",
        timestamp: new Date().toDateString(),
        username: "tward02",
        comments: [
            {
                id: 1,
                content: "I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good",
                likes: 5,
                isLiked: false,
                userId: 2,
                username: "tward02",
                timestamp: new Date().toDateString(),
            },
            {
                id: 2,
                content: "I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good",
                likes: 5,
                isLiked: false,
                userId: 2,
                username: "tward02",
                timestamp: new Date().toDateString(),
            },
            {
                id: 3,
                content: "I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good I think your solution is very good",
                likes: 5,
                isLiked: false,
                userId: 2,
                username: "tward02",
                timestamp: new Date().toDateString(),
            }
        ],
        message: "This si a message about the code I made what do you guys thing of itThis si a message about the code I made what do you guys thing of itThis si a message about the code I made what do you guys thing of itThis si a message about the code I made what do you guys thing of it",
        files: [
            {
                name: "App.js",
                content:
                    `export default function App() {
                    return <h1>Hello world</h1>
                }`
            },
            {
                name: "styles.css",
                content: `.app-container {
                    text-align: center;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    color: #4CAF50;
                }`
            }
        ],
        likes: 4,
        isLiked: false,
        userId: 1,
    }
]

export const levelsTestData = [
    {
        id: 1,
        title: "Level 1 - Introduction",
        description: "Level 1 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: false,
        expires: null,
        completed: true,
    },
    {
        id: 2,
        title: "Level 2 - Next Level",
        description: "Level 2 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: false,
        expires: null,
        completed: false,
    },
    {
        id: 3,
        title: "Level 3 - Another Level",
        description: "Level 3 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 4,
        title: "Level 4 - Nearly There",
        description: "Level 4 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 5,
        title: "Level 5 - Final Level",
        description: "Level 5 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 7,
        title: "Level 3 - Another Level",
        description: "Level 3 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 8,
        title: "Level 4 - Nearly There",
        description: "Level 4 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 9,
        title: "Level 5 - Final Level",
        description: "Level 5 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 10,
        title: "Level 3 - Another Level",
        description: "Level 3 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 11,
        title: "Level 4 - Nearly There",
        description: "Level 4 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 12,
        title: "Level 5 - Final Level",
        description: "Level 5 - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: true,
        expires: null,
        completed: false,
    },
    {
        id: 6,
        title: "Daily Level - Challenge",
        description: "Daily Level - This is an introduction to the application and the Web Content Accessibility Guidelines, learning the basics",
        locked: false,
        expires: "2025-02-08T00:00:00.000Z",
        completed: false,
    }
]

export const testFiles = {
    "/App.js": {
        code: `
export default function App() {
    return <h1>Hello world</h1>
}
    `,
        active: true,
    },
    "/styles.css": {
        code: `
.app-container {
    text-align: center;
    font-family: Arial, sans-serif;
}

h1 {
    color: #4CAF50;
}
      
button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #008CBA;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #005f73;
}
    `,
    },
};
