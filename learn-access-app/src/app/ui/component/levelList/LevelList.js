import modules from "./levelList.module.css"
import LevelCard from "@/app/ui/component/levelCard/LevelCard";

const LevelList = ({title, levels}) => {


    return (
        <div className={modules.list}>
            <h2 className={modules.listHeader}>Limited Time Levels</h2>
            <div className={modules.listContainer}>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>
                <LevelCard completed locked={false} title={"Level 1 - Introduction"}
                           description={"this is an introductory level which is provided to give an introduction to WCAg for the user"}></LevelCard>

            </div>
        </div>
    );
}

export default LevelList;
