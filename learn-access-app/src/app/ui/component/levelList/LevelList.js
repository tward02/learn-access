import modules from "./levelList.module.css"
import LevelCard from "@/app/ui/component/levelCard/LevelCard";

const LevelList = ({title, levels}) => {

    return (
        <div className={modules.list}>
            <h2 className={modules.listHeader}>{title}</h2>
            <div className={modules.listContainer}>
                {levels.map(level => (
                    <LevelCard key={level.id} id={level.id} title={level.title} description={level.description}
                               locked={level.locked}
                               expires={level.expires} completed={level.completed}/>))}
            </div>
        </div>
    );
}

export default LevelList;
