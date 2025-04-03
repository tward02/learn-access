import '@testing-library/jest-dom'
import {act, render, screen, within} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useFetchLevel} from "@/app/ui/api/useFetchLevel";
import LevelContent from "@/app/level/[id]/LevelContent";
import userEvent from "@testing-library/user-event";
import {useTestSolution} from "@/app/ui/api/useTestSolution";
import {useSubmitSolution} from "@/app/ui/api/useSubmitSolution";

//NOTE - unable to test render due to library constraints so this was done in manual testing

const testFailed = {
    "passed": false,
    "tests": [
        {
            "passed": false,
            "suite": "suite 1",
            "name": "test 1",
            "type": "jest",
            "message": "Fail message 1"
        },
        {
            "passed": true,
            "suite": "suite 1",
            "name": "test 2",
            "type": "jest"
        },
        {
            "passed": true,
            "suite": "suite 1",
            "name": "test 3",
            "type": "jest"
        },
        {
            "passed": false,
            "suite": "suite 2",
            "name": "test 4",
            "type": "playwright",
            "message": "Fail message 2"
        }
    ]
}

const testPassed = {
    "passed": true,
    "tests": [
        {
            "passed": true,
            "suite": "suite 1",
            "name": "test 1",
            "type": "jest",
        },
        {
            "passed": true,
            "suite": "suite 1",
            "name": "test 2",
            "type": "jest"
        },
        {
            "passed": true,
            "suite": "suite 1",
            "name": "test 3",
            "type": "jest"
        },
        {
            "passed": true,
            "suite": "suite 2",
            "name": "test 4",
            "type": "playwright",
        }
    ]
}

const levelData = {
    "id": 6,
    "name": "Level 1",
    "description": "Level 1 description",
    "objectives": "Level 1 objectives",
    "enhanceddescription": "Level 1 enhanced description",
    "completed": true,
    "locked": false,
    "files": [
        {
            "id": 5,
            "levelid": 6,
            "name": "App.js",
            "filetype": "js",
            "content": "export default function App() {\n    return <h1>Hello world</h1>\n}",
            "readonly": false
        },
        {
            "id": 6,
            "levelid": 6,
            "name": "styles.css",
            "filetype": "css",
            "content": "h1 {\n    color: red;\n}",
            "readonly": false
        }
    ],
    "hints": [
        {
            name: "Hint 1",
            content: "This is a hint for the current level that is really useful to the users"
        },
        {
            name: "Hint 2",
            content: "This is a hint for the current level that is really useful to the users, This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users"
        },
        {
            name: "Hint 3",
            content: "This is a hint for the current level that is really useful to the users, This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users"
        }
    ],
    "savedFiles": []
}

const levelWithSave = {
    "id": 6,
    "name": "Level 1",
    "description": "Level 1 description",
    "objectives": "Level 1 objectives",
    "enhanceddescription": "Level 1 enhanced description",
    "completed": true,
    "locked": false,
    "files": [
        {
            "id": 5,
            "levelid": 6,
            "name": "App.js",
            "filetype": "js",
            "content": "export default function App() {\n    return <h1>Hello world</h1>\n}",
            "readonly": false
        },
        {
            "id": 6,
            "levelid": 6,
            "name": "styles.css",
            "filetype": "css",
            "content": "h1 {\n    color: red;\n}",
            "readonly": false
        }
    ],
    "hints": [],
    "savedFiles": [
        {
            "id": 117,
            "userid": 29,
            "levelid": 6,
            "name": "App.js",
            "filetype": "js",
            "content": "export default function App() {\n    return <h1>I love WCAG!</h1>\n}",
            "datetime": "2025-04-02T22:08:37.373Z"
        },
        {
            "id": 118,
            "userid": 29,
            "levelid": 6,
            "name": "styles.css",
            "filetype": "css",
            "content": "h1 {\n    color: red;\n}",
            "datetime": "2025-04-02T22:08:37.423Z"
        }
    ]
}

const submitPass = {"success": true};

const submitFail = {"success": false};

const queryClient = new QueryClient();

jest.mock("../src/app/ui/api/useFetchLevel", () => ({
    useFetchLevel: jest.fn(),
}));

jest.mock("../src/app/ui/api/useTestSolution", () => ({
    useTestSolution: jest.fn(),
}));

jest.mock("../src/app/ui/api/useSubmitSolution", () => ({
    useSubmitSolution: jest.fn(),
}));

global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));


describe('Loading LevelPage renders correctly', () => {

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: true,
            levelError: false,
            levelData: null,
            levelSuccess: false
        }));
    });

    it('Loading page renders correctly with no errors', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeVisible();
    })
});

describe('LevelPage with errors renders correctly', () => {

    it('Page renders correctly with general error', async () => {

        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: true,
            levelData: null,
            levelSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Error Loading Level"));
        expect(screen.getByText("There has been an error loading this level, please return to the homepage and try again later."));
    })

    it('Page renders correctly with 404 Not Found', async () => {

        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: {status: 404},
            levelData: null,
            levelSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Error Loading Level"));
        expect(screen.getByText("The level you are looking for doesn't seem to exist, please return to the homepage and select a level to complete there."));
    })

    it('Page renders correctly with 401 Unauthorised', async () => {

        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: {status: 401},
            levelData: null,
            levelSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Error Loading Level"));
        expect(screen.getByText("You don't seem to be authenticated, please return to the homepage and login or register."));
    })

    it('Page renders correctly with 403 Forbidden', async () => {

        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: {status: 403},
            levelData: null,
            levelSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Error Loading Level"));
        expect(screen.getByText("You don't have permission to view this level at the moment, please return to the homepage and choose a level you have unlocked."));
    })
});

describe('LevelPage with saved content renders correctly - restart', () => {

    const post = jest.fn();

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: false,
            levelData: levelWithSave,
            levelSuccess: true
        }));

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: false
        }));

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));
    });

    it('LevelPage renders correctly when restarting saved progress', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();

        expect(screen.getByText("Continue with saved attempt?")).toBeInTheDocument();
        expect(screen.getByText("Do you want to load your previous unfinished attempt?")).toBeInTheDocument();

        const restart = screen.getByText("Restart");
        const load = screen.getByText("Load Save");

        expect(restart).toBeInTheDocument();
        expect(load).toBeInTheDocument();

        act(() => {
            restart.click();
        })

        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();

        const editor = screen.getByTestId("editor-box");
        expect(editor).toBeInTheDocument();

        expect(within(editor).getByText("export")).toBeInTheDocument();
        expect(within(editor).getByText("default")).toBeInTheDocument();
        expect(within(editor).getByText("function")).toBeInTheDocument();
        expect(within(editor).getByText("App")).toBeInTheDocument();
        expect(within(editor).getByText("(")).toBeInTheDocument();
        expect(within(editor).getByText(")")).toBeInTheDocument();
        expect(within(editor).getByText("{")).toBeInTheDocument();
        expect(within(editor).getByText("return")).toBeInTheDocument();
        expect(within(editor).getByText("<")).toBeInTheDocument();
        expect(within(editor).getAllByText("h1").length).toBe(2);
        expect(within(editor).getAllByText(">").length).toBe(2);
        expect(within(editor).getByText("Hello world")).toBeInTheDocument();
        expect(within(editor).getByText("</")).toBeInTheDocument();
    })
});

describe('LevelPage with saved content renders correctly', () => {

    const post = jest.fn();

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: false,
            levelData: levelWithSave,
            levelSuccess: true
        }));

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: false
        }));

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));
    });

    it('LevelPage renders correctly when reloading saved progress - continue', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.queryByText("Description:")).not.toBeInTheDocument();
        expect(screen.queryByText("Objectives:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeVisible();

        expect(screen.getByText("Continue with saved attempt?")).toBeInTheDocument();
        expect(screen.getByText("Do you want to load your previous unfinished attempt?")).toBeInTheDocument();

        const restart = screen.getByText("Restart");
        const load = screen.getByText("Load Save");

        expect(restart).toBeInTheDocument();
        expect(load).toBeInTheDocument();

        act(() => {
            load.click();
        })

        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();

        const editor = screen.getByTestId("editor-box");
        expect(editor).toBeInTheDocument();

        expect(within(editor).getByText("export")).toBeInTheDocument();
        expect(within(editor).getByText("default")).toBeInTheDocument();
        expect(within(editor).getByText("function")).toBeInTheDocument();
        expect(within(editor).getByText("App")).toBeInTheDocument();
        expect(within(editor).getByText("(")).toBeInTheDocument();
        expect(within(editor).getByText(")")).toBeInTheDocument();
        expect(within(editor).getByText("{")).toBeInTheDocument();
        expect(within(editor).getByText("return")).toBeInTheDocument();
        expect(within(editor).getByText("<")).toBeInTheDocument();
        expect(within(editor).getAllByText("h1").length).toBe(2);
        expect(within(editor).getAllByText(">").length).toBe(2);
        expect(within(editor).getByText("I love WCAG!")).toBeInTheDocument();
        expect(within(editor).getByText("</")).toBeInTheDocument();
    })
});

describe('LevelPage renders correctly', () => {

    const post = jest.fn();

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: false,
            levelData: levelData,
            levelSuccess: true
        }));

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: false
        }));

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));
    });

    it('Level page content loads correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 1 enhanced description")).toBeInTheDocument();
        expect(screen.getByText("Level 1 objectives")).toBeInTheDocument();
        expect(screen.getByText("Test Output:")).toBeInTheDocument();
        expect(screen.getByText("Please run the tests to view the results")).toBeInTheDocument();
        expect(screen.getByText("Console Output:")).toBeInTheDocument();
        expect(screen.getByText("Please note:")).toBeInTheDocument();
        expect(screen.getByText("Some levels may require the use of a screen reader to verify aria labels and other accessible features.")).toBeInTheDocument();
        expect(screen.getByText("It is important that you do not delete pre programmed IDs and other similar attributes on elements or refresh the page without saving your progress first.")).toBeInTheDocument();
        expect(screen.getByText("Please do not change the signature of the App method or try to export any other functions/components.")).toBeInTheDocument();

        const editor = screen.getByTestId("editor-box");
        expect(editor).toBeInTheDocument();

        expect(within(editor).getByText("export")).toBeInTheDocument();
        expect(within(editor).getByText("default")).toBeInTheDocument();
        expect(within(editor).getByText("function")).toBeInTheDocument();
        expect(within(editor).getByText("App")).toBeInTheDocument();
        expect(within(editor).getByText("(")).toBeInTheDocument();
        expect(within(editor).getByText(")")).toBeInTheDocument();
        expect(within(editor).getByText("{")).toBeInTheDocument();
        expect(within(editor).getByText("return")).toBeInTheDocument();
        expect(within(editor).getByText("<")).toBeInTheDocument();
        expect(within(editor).getAllByText("h1").length).toBe(2);
        expect(within(editor).getAllByText(">").length).toBe(2);
        expect(within(editor).getByText("Hello world")).toBeInTheDocument();
        expect(within(editor).getByText("</")).toBeInTheDocument();

        expect(screen.getByText("Hints 0/3")).toBeInTheDocument();
        expect(screen.getByText("Reset")).toBeInTheDocument();
        expect(screen.getByText("Test")).toBeInTheDocument();

        const submit = screen.getByText("Submit");
        expect(submit).toBeInTheDocument();
        expect(submit).toBeDisabled();
    })

    it('Hint functionality works correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 1 enhanced description")).toBeInTheDocument();

        const hint = screen.getByText("Hints 0/3");
        expect(hint).toBeInTheDocument();

        act(() => {
            hint.click();
        })

        expect(screen.getByText("Hint 1")).toBeVisible();
        expect(screen.getByTestId("hint-left")).toBeVisible();
        expect(screen.getByTestId("hint-right")).toBeVisible();
        expect(screen.getByText("This is a hint for the current level that is really useful to the users")).toBeVisible();

        await userEvent.keyboard("{Escape}");

        expect(screen.queryByText("Hint 1")).not.toBeVisible();
        expect(screen.queryByText("This is a hint for the current level that is really useful to the users")).not.toBeVisible();

        const hint2 = screen.getByText("Hints 1/3");
        expect(hint2).toBeInTheDocument();
    })

    it('Reset functionality works correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 1 enhanced description")).toBeInTheDocument();

        const reset = screen.getByText("Reset");
        expect(reset).toBeInTheDocument();

        const editorText = screen.getByText("Hello world");

        act(() => {
            editorText.focus();
        })

        await userEvent.keyboard("test123");

        act(() => {
            reset.click();
        })

        expect(screen.getByText("Warning, Resetting Could Result in Lost Progress")).toBeVisible();
        expect(screen.getByText("Are you sure you want to reset your code? This operation is permanent and cannot be undone.")).toBeVisible();
        expect(screen.getByText("Cancel")).toBeInTheDocument();

        const confirm = screen.getByText("Reset Code");
        expect(confirm).toBeInTheDocument();

        act(() => {
            confirm.click();
        })

        expect(screen.queryByText("Warning, Resetting Could Result in Lost Progress")).not.toBeVisible();
        expect(screen.queryByText("Are you sure you want to reset your code? This operation is permanent and cannot be undone.")).not.toBeVisible();

        const editor = screen.getByTestId("editor-box");
        expect(editor).toBeInTheDocument();

        expect(within(editor).getByText("export")).toBeInTheDocument();
        expect(within(editor).getByText("default")).toBeInTheDocument();
        expect(within(editor).getByText("function")).toBeInTheDocument();
        expect(within(editor).getByText("App")).toBeInTheDocument();
        expect(within(editor).getByText("(")).toBeInTheDocument();
        expect(within(editor).getByText(")")).toBeInTheDocument();
        expect(within(editor).getByText("{")).toBeInTheDocument();
        expect(within(editor).getByText("return")).toBeInTheDocument();
        expect(within(editor).getByText("<")).toBeInTheDocument();
        expect(within(editor).getAllByText("h1").length).toBe(2);
        expect(within(editor).getAllByText(">").length).toBe(2);
        expect(within(editor).getByText("Hello world")).toBeInTheDocument();
        expect(within(editor).getByText("</")).toBeInTheDocument();

        act(() => {
            reset.click();
        })

        expect(screen.getByText("Warning, Resetting Could Result in Lost Progress")).toBeVisible();
        expect(screen.getByText("Are you sure you want to reset your code? This operation is permanent and cannot be undone.")).toBeVisible();
        expect(screen.getByText("Cancel")).toBeInTheDocument();

        const newConfirm = screen.getByText("Reset Code");
        expect(newConfirm).toBeInTheDocument();

        act(() => {
            newConfirm.click();
        })

        expect(screen.queryByText("Warning, Resetting Could Result in Lost Progress")).not.toBeVisible();
        expect(screen.queryByText("Are you sure you want to reset your code? This operation is permanent and cannot be undone.")).not.toBeVisible();
    })

    it('LevelPage code editor fucntions correctly with multiple files', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 1 enhanced description")).toBeInTheDocument();

        const editor = screen.getByTestId("editor-box");
        expect(editor).toBeInTheDocument();

        expect(within(editor).getByText("export")).toBeInTheDocument();
        expect(within(editor).getByText("default")).toBeInTheDocument();
        expect(within(editor).getByText("function")).toBeInTheDocument();
        expect(within(editor).getByText("App")).toBeInTheDocument();
        expect(within(editor).getByText("(")).toBeInTheDocument();
        expect(within(editor).getByText(")")).toBeInTheDocument();
        expect(within(editor).getByText("{")).toBeInTheDocument();
        expect(within(editor).getByText("return")).toBeInTheDocument();
        expect(within(editor).getByText("<")).toBeInTheDocument();
        expect(within(editor).getAllByText("h1").length).toBe(2);
        expect(within(editor).getAllByText(">").length).toBe(2);
        expect(within(editor).getByText("Hello world")).toBeInTheDocument();
        expect(within(editor).getByText("</")).toBeInTheDocument();

        const stylesButton = screen.getByText("styles.css");
        expect(stylesButton).toBeInTheDocument();

        act(() => {
            stylesButton.click();
        })

        const newEditor = screen.getByTestId("editor-box");
        expect(newEditor).toBeInTheDocument();

        expect(within(newEditor).getByText("h1")).toBeInTheDocument();
        expect(within(newEditor).getByText("{")).toBeInTheDocument();
        expect(within(newEditor).getByText("color")).toBeInTheDocument();
        expect(within(newEditor).getByText(":")).toBeInTheDocument();
        expect(within(newEditor).getByText("red")).toBeInTheDocument();
        expect(within(newEditor).getByText("{")).toBeInTheDocument();
        expect(within(newEditor).getByText(";")).toBeInTheDocument();
        expect(within(newEditor).getByText("}")).toBeInTheDocument();

        const appButton = screen.getByText("App.js");
        expect(appButton).toBeInTheDocument();

        act(() => {
            appButton.click();
        })

        const newNewEditor = screen.getByTestId("editor-box");
        expect(newNewEditor).toBeInTheDocument();

        expect(within(newNewEditor).getByText("export")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("default")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("function")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("App")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("(")).toBeInTheDocument();
        expect(within(newNewEditor).getByText(")")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("{")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("return")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("<")).toBeInTheDocument();
        expect(within(newNewEditor).getAllByText("h1").length).toBe(2);
        expect(within(newNewEditor).getAllByText(">").length).toBe(2);
        expect(within(newNewEditor).getByText("Hello world")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("</")).toBeInTheDocument();
    })
});

describe('LevelPage renders correctly when testing', () => {

    const post = jest.fn();

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: false,
            levelData: levelData,
            levelSuccess: true
        }));

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));
    });

    it('Test results render correctly when failed', async () => {

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: testFailed,
            testSolution: post,
            testSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.queryByTestId("test-loading")).not.toBeInTheDocument();
        expect(screen.getByText("RESULTS: 2 PASSED, 2 FAILED, 4 TOTAL")).toBeInTheDocument();
        expect(screen.getByText("test 1: FAILED")).toBeInTheDocument();
        expect(screen.getByText("test 2: PASSED")).toBeInTheDocument();
        expect(screen.getByText("test 3: PASSED")).toBeInTheDocument();
        expect(screen.getByText("test 4: FAILED")).toBeInTheDocument();
    })

    it('Test results render correctly when passed', async () => {

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: testPassed,
            testSolution: post,
            testSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.queryByTestId("test-loading")).not.toBeInTheDocument();
        expect(screen.getByText("RESULTS: 4 PASSED, 0 FAILED, 4 TOTAL")).toBeInTheDocument();
        expect(screen.getByText("test 1: PASSED")).toBeInTheDocument();
        expect(screen.getByText("test 2: PASSED")).toBeInTheDocument();
        expect(screen.getByText("test 3: PASSED")).toBeInTheDocument();
        expect(screen.getByText("test 4: PASSED")).toBeInTheDocument();
    })

    it('Test results  loading renders correctly', async () => {

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: true,
            testSolutionError: false,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByTestId("test-loading")).toBeInTheDocument();
    })

    it('Test results error renders correctly', async () => {

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: true,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.queryByTestId("test-loading")).not.toBeInTheDocument();
        expect(screen.getByText("Error Running Tests"));
        expect(screen.getByText("There has been an error running the test suite for this level, please ensure your code is valid and free from syntax errors by looking at the console output. This error can also be caused by trying to carry out unsafe operations in your code, such are using the file system or executing commands. If it is then please try again later."));
    })
});

describe('LevelPage renders correctly when submitting', () => {

    const post = jest.fn();

    beforeEach(() => {
        useFetchLevel.mockImplementation(() => ({
            levelLoading: false,
            levelError: false,
            levelData: levelData,
            levelSuccess: true
        }));

        useTestSolution.mockImplementation(() => ({
            testSolutionLoading: false,
            testSolutionError: false,
            testSolutionData: null,
            testSolution: post,
            testSolutionSuccess: false
        }));
    });

    it('Submit code loading renders correctly', async () => {

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: true,
            submitSolutionError: false,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByText("Testing Submission, Please Wait...")).toBeInTheDocument();
        expect(screen.getByText("Testing Submission, Please Wait...")).toBeVisible();
    })

    it('Submit code error renders correctly', async () => {

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: true,
            submitSolutionData: null,
            submitSolutionFn: post,
            submitSolutionSuccess: false
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByText("Error Running Tests"));
        expect(screen.getByText("There has been an error running the test suite for this level, please ensure your code is valid and free from syntax errors by looking at the console output. This error can also be caused by trying to carry out unsafe operations in your code, such are using the file system or executing commands. If it is then please try again later."));
    })

    it('Submit code fails renders correctly', async () => {

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: submitFail,
            submitSolutionFn: post,
            submitSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByText("Submission Failed"));
        expect(screen.getByText("Your submission didn\'t pass all of the tests. Please use the \"TEST\" button to see which ones it failed."));
    })

    it('Submit code passes renders correctly', async () => {

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: submitPass,
            submitSolutionFn: post,
            submitSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByText("Submission Successful"));
        expect(screen.getByText("Congratulations! You have passed the level, do you wish to post your solution or proceed to the forum?"));
        expect(screen.getByText("Go To Forum")).toBeInTheDocument();
        expect(screen.getByText("Post Solution")).toBeInTheDocument();
    })

    it('Post solution window renders correctly', async () => {

        useSubmitSolution.mockImplementation(() => ({
            submitSolutionLoading: false,
            submitSolutionError: false,
            submitSolutionData: submitPass,
            submitSolutionFn: post,
            submitSolutionSuccess: true
        }));

        render(
            <QueryClientProvider client={queryClient}>
                <LevelContent session={true} user={{id: 1, username: "test"}} id={1}/>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("loading")).not.toBeVisible();
        expect(screen.getByText("Description:")).toBeInTheDocument();
        expect(screen.getByText("Objectives:")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
        expect(screen.getByText("test Logout")).toBeInTheDocument();
        expect(screen.getByText("Level 1")).toBeInTheDocument();

        expect(screen.getByText("Submission Successful"));
        expect(screen.getByText("Congratulations! You have passed the level, do you wish to post your solution or proceed to the forum?"));
        expect(screen.getByText("Go To Forum")).toBeInTheDocument();

        const postSolution = screen.getByText("Post Solution");
        expect(postSolution).toBeInTheDocument();

        act(() => {
            postSolution.click();
        })

        expect(screen.getByText("Post Title")).toBeInTheDocument();
        expect(screen.getByText("Post Description")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Post")).toBeInTheDocument();
        expect(screen.getByTestId("post-message")).toBeInTheDocument();
        expect(screen.getByTestId("post-title")).toBeInTheDocument();

        const preview = screen.getByTestId("preview-post");
        expect(preview).toBeInTheDocument();

        expect(within(preview).getByText("export")).toBeInTheDocument();
        expect(within(preview).getByText("default")).toBeInTheDocument();
        expect(within(preview).getByText("function")).toBeInTheDocument();
        expect(within(preview).getByText("App")).toBeInTheDocument();
        expect(within(preview).getByText("(")).toBeInTheDocument();
        expect(within(preview).getByText(")")).toBeInTheDocument();
        expect(within(preview).getByText("{")).toBeInTheDocument();
        expect(within(preview).getByText("return")).toBeInTheDocument();
        expect(within(preview).getByText("<")).toBeInTheDocument();
        expect(within(preview).getAllByText("h1").length).toBe(2);
        expect(within(preview).getAllByText(">").length).toBe(2);
        expect(within(preview).getByText("Hello world")).toBeInTheDocument();
        expect(within(preview).getByText("</")).toBeInTheDocument();

        const stylesButton = within(preview).getByText("styles.css");
        expect(stylesButton).toBeInTheDocument();

        act(() => {
            stylesButton.click();
        })

        const newEditor = screen.getByTestId("preview-post");
        expect(newEditor).toBeInTheDocument();

        expect(within(newEditor).getByText("h1")).toBeInTheDocument();
        expect(within(newEditor).getByText("{")).toBeInTheDocument();
        expect(within(newEditor).getByText("color")).toBeInTheDocument();
        expect(within(newEditor).getByText(":")).toBeInTheDocument();
        expect(within(newEditor).getByText("red")).toBeInTheDocument();
        expect(within(newEditor).getByText("{")).toBeInTheDocument();
        expect(within(newEditor).getByText(";")).toBeInTheDocument();
        expect(within(newEditor).getByText("}")).toBeInTheDocument();

        const appButton = within(newEditor).getByText("App.js");
        expect(appButton).toBeInTheDocument();

        act(() => {
            appButton.click();
        })

        const newNewEditor = screen.getByTestId("preview-post");
        expect(newNewEditor).toBeInTheDocument();

        expect(within(newNewEditor).getByText("export")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("default")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("function")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("App")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("(")).toBeInTheDocument();
        expect(within(newNewEditor).getByText(")")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("{")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("return")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("<")).toBeInTheDocument();
        expect(within(newNewEditor).getAllByText("h1").length).toBe(2);
        expect(within(newNewEditor).getAllByText(">").length).toBe(2);
        expect(within(newNewEditor).getByText("Hello world")).toBeInTheDocument();
        expect(within(newNewEditor).getByText("</")).toBeInTheDocument();
    })
});
