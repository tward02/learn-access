import modules from "./homepage.module.css"
import {getUser, hasSession} from "@/app/lib/dal";
import HomePageContent from "@/app/HomePageContent";

export const metadata = {
    title: "Learn Access | Home",
    description: "Learn how to program accessibly in React - homepage and level select",
};

//main homepage
const HomePage = async () => {

    const session = await hasSession();
    const user = session ? await getUser() : null;

    return (
        <div className={modules.container}>
            <HomePageContent session={session} user={user}/>
        </div>
    )
}

export default HomePage;
