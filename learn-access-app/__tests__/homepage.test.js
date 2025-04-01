import '@testing-library/jest-dom'
import {render, screen, within} from '@testing-library/react';
import HomePageContent from "@/app/HomePageContent";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useFetchLevels} from "@/app/ui/api/useFetchLevels";

const limDate = new Date();
limDate.setDate(limDate.getDate() + 1);

const levelsData = [
    {
        "id": 6,
        "name": "Level 1",
        "description": "Level 1 Description",
        "objectives": "Objectives",
        "expiration": null,
        "enhanceddescription": "advdes",
        "completed": true,
        "locked": false
    },
    {
        "id": 7,
        "name": "Level 2",
        "description": "Level 2 Description",
        "objectives": "Objectives",
        "expiration": null,
        "enhanceddescription": "advdes",
        "completed": true,
        "locked": false
    },
    {
        "id": 8,
        "name": "Level 3",
        "description": "Level 3 Description",
        "objectives": "Objectives",
        "expiration": null,
        "enhanceddescription": "advdes",
        "completed": false,
        "locked": false
    },
    {
        "id": 9,
        "name": "Level 4",
        "description": "Level 4 Description",
        "objectives": "Objectives",
        "expiration": null,
        "enhanceddescription": "advdes",
        "completed": false,
        "locked": true
    },
    {
        "id": 10,
        "name": "Level 5",
        "description": "Level 5 Description",
        "objectives": "Objectives",
        "expiration": null,
        "enhanceddescription": "advdes",
        "completed": false,
        "locked": true
    },
    {
        "id": 11,
        "name": "Limited Level 1",
        "description": "Limited Level 1 Description",
        "objectives": "Objectives",
        "expiration": limDate.toString(),
        "enhanceddescription": "advdes",
        "completed": false,
        "locked": false
    },
]

const noLimitedLevels = [{
    "id": 6,
    "name": "Level 1",
    "description": "Level 1 Description",
    "objectives": "Objectives",
    "expiration": null,
    "enhanceddescription": "advdes",
    "completed": true,
    "locked": false
}];

const queryClient = new QueryClient();

jest.mock("../src/app/ui/api/useFetchLevels", () => ({
    useFetchLevels: jest.fn(),
}));

describe('HomePage renders correctly when no errors', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchLevels.mockImplementation(() => ({
            levelsLoading: false,
            levelsError: false,
            levelsData: levelsData,
            levelsSuccess: true,
            levelsRefetch: refetch,
            levelsRefetching: false,
            refetchError: false
        }));
    });

    it('All elements render correctly when no session', async () => {

        render(<HomePageContent session={false} user={null}/>);

        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getAllByText("Learn Access").length).toBe(2);
        expect(screen.getByText("This application is to teach developers how to create applications that are accessible to the W3C WCAG 2.2 standards in React 18. This application is still being developed and will have more functionality and levels coming soon. Thanks for trying it out!")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Login"})).toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByTestId("login")).toBeInTheDocument();
        expect(screen.getByTestId("register")).toBeInTheDocument();
        expect(screen.queryByText("Learn WCAG")).not.toBeInTheDocument();
        expect(screen.queryByText("Limited Time Levels")).not.toBeInTheDocument();
    })

    it('All main page elements render correctly when session exists', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePageContent session={true} user={{id: 1, username: "test"}}/>
            </QueryClientProvider>
        );

        expect(screen.getAllByText("Learn Access").length).toBe(2);
        expect(screen.getByText("This application is to teach developers how to create applications that are accessible to the W3C WCAG 2.2 standards in React 18. This application is still being developed and will have more functionality and levels coming soon. Thanks for trying it out!")).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "Login"})).not.toBeInTheDocument();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        expect(screen.queryByTestId("login")).not.toBeInTheDocument();
        expect(screen.queryByTestId("register")).not.toBeInTheDocument();
        expect(screen.getByText("Learn WCAG")).toBeInTheDocument();
        expect(screen.getByText("Limited Time Levels")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "test Logout"})).toBeInTheDocument();
    })

    it('Levels render correctly on screen', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePageContent session={true} user={{id: 1, username: "test"}}/>
            </QueryClientProvider>
        );

        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getAllByTestId("level").length).toBe(6);
        expect(within(screen.getByTestId("lim-levels")).getAllByTestId("level").length).toBe(1);
        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 2")).toBeInTheDocument();
        expect(screen.getByText("Level 3")).toBeInTheDocument();
        expect(screen.getByText("Level 4")).toBeInTheDocument();
        expect(screen.getByText("Level 5")).toBeInTheDocument();
        expect(screen.getByText("Limited Level 1")).toBeInTheDocument();

        expect(screen.getByText("Level 1 Description")).toBeInTheDocument();
        expect(screen.getByText("Level 2 Description")).toBeInTheDocument();
        expect(screen.getByText("Level 3 Description")).toBeInTheDocument();
        expect(screen.getByText("Level 4 Description")).toBeInTheDocument();
        expect(screen.getByText("Level 5 Description")).toBeInTheDocument();
        expect(screen.getByText("Limited Level 1 Description")).toBeInTheDocument();

        expect(screen.getAllByText("View Forum").length).toBe(2);
        expect(screen.getAllByTestId("completed").length).toBe(2);
        expect(screen.getAllByTestId("locked").length).toBe(2);
    })
});

describe('HomePage renders correctly when no limited levels', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchLevels.mockImplementation(() => ({
            levelsLoading: false,
            levelsError: false,
            levelsData: noLimitedLevels,
            levelsSuccess: true,
            levelsRefetch: refetch,
            levelsRefetching: false,
            refetchError: false
        }));
    });

    it('No limited levels renders correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePageContent session={true} user={{id: 1, username: "test"}}/>
            </QueryClientProvider>
        );

        expect(screen.getByText("None available right now, check back again later")).toBeInTheDocument();
        expect(within(screen.getByTestId("lim-levels")).queryAllByTestId("level").length).toBe(0);
        expect(screen.queryAllByTestId("level").length).toBe(1);
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    })
});

describe('HomePage renders correctly when levels loading', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchLevels.mockImplementation(() => ({
            levelsLoading: true,
            levelsError: false,
            levelsData: null,
            levelsSuccess: true,
            levelsRefetch: refetch,
            levelsRefetching: false,
            refetchError: false
        }));
    });

    it('Levels loading renders correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePageContent session={true} user={{id: 1, username: "test"}}/>
            </QueryClientProvider>
        );

        expect(screen.queryAllByTestId("level").length).toBe(0);
        expect(screen.queryByText("Learn WCAG")).not.toBeInTheDocument();
        expect(screen.queryByText("Limited Time Levels")).not.toBeInTheDocument();
        expect(screen.getByTestId("loading")).toBeInTheDocument();
    })
});

describe('HomePage renders correctly when there is a levels API error', () => {

    const refetch = jest.fn();

    beforeEach(() => {
        useFetchLevels.mockImplementation(() => ({
            levelsLoading: false,
            levelsError: true,
            levelsData: null,
            levelsSuccess: true,
            levelsRefetch: refetch,
            levelsRefetching: false,
            refetchError: false
        }));
    });

    it('Levels error renders correctly', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <HomePageContent session={true} user={{id: 1, username: "test"}}/>
            </QueryClientProvider>
        );

        expect(screen.queryAllByTestId("level").length).toBe(0);
        expect(screen.queryByText("Learn WCAG")).not.toBeInTheDocument();
        expect(screen.queryByText("Limited Time Levels")).not.toBeInTheDocument();
        expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
        expect(screen.getByRole("alert")).toBeInTheDocument();

        const refetch = screen.getByTestId("try-again");
        expect(refetch).toBeInTheDocument();
        refetch.click();
    })
});
