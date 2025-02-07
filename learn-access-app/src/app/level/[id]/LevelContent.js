import TopBar from "@/app/ui/component/topBar/TopBar";

const LevelContent = ({session, user, id}) => {

    //TODO https://chatgpt.com/share/67a53fd9-9e5c-800f-b1eb-cfca0cbb414a
    //Need to decide Monaco or Sandpack

    return (
        <div>
            <TopBar title={"Level Name"} loggedIn={session} username={user?.username} />
        </div>
    );
}

export default LevelContent;
