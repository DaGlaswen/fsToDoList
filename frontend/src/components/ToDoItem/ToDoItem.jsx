import React, {useEffect, useState} from "react";
import InputArea from "../InputArea/InputArea";

function ToDoItem({id, name, description, item, onCheckedDelete, onCheckedUpdate, onCheckedComplete, completed}) {
    useEffect(() => {
        console.log(id);
    }, [id]);
    const [display, setDisplay] = useState("notDisplayed");
    const showButton = e => {
        e.preventDefault();
        setDisplay("displayed");
    };

    const hideButton = e => {
        e.preventDefault();
        setDisplay("notDisplayed");
    };

    const [editing, setEditing] = useState(false);

    const handleEditing = () => {
        setEditing(!editing);
    };

    let viewMode = {};
    let editMode = {};
    if (editing) {
        viewMode.display = 'none';
    } else {
        editMode.display = 'none';
    }

    return (
        <li>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px",
                width: "100%",
                border: "1px solid black",
                borderRadius: "16px",
                gap: "8px"
            }}
                 onMouseEnter={e => showButton(e)}
                 onMouseLeave={e => hideButton(e)}>
                {editing ? <InputForUpdate
                    item={item}
                    onUpdate={onCheckedUpdate}
                    handleEditing={handleEditing}
                /> : <div>
                    <h4 style={{textDecoration: completed ? "line-through" : "none"}}>{name}</h4>
                    <p style={{textDecoration: completed ? "line-through" : "none"}}>{description}</p>
                </div>}
                <div className={display} style={{
                    flexDirection: "column",
                    gap: "5px"
                }}>
                    <button style={{height: "40px"}} onClick={() => onCheckedDelete(id)}>Удалить
                    </button>
                    <button style={{height: "40px"}}
                            onClick={() => onCheckedComplete(id)}>{!completed ? "Завершить" : "Вернуть"}
                    </button>
                    {!completed && <>
                        <button style={{height: "40px"}} onClick={() => handleEditing()}>Изменить
                        </button>
                    </>
                    }
                </div>
            </div>
        </li>
    );
}

function InputForUpdate({item, onUpdate, handleEditing}) {
    const [taskName, setTaskName] = useState(item.name)
    const [taskDescription, setTaskDescription] = useState(item.description)

    return (
        <div className="form" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px"
        }}>
            <div>
                <input placeholder="Название" onChange={(e) => setTaskName(e.target.value)} type="text"
                       value={taskName}/>
                <input placeholder="Описание" onChange={(e) => setTaskDescription(e.target.value)} type="text"
                       value={taskDescription}/>
            </div>
            <button
                onClick={() => {
                    onUpdate({...item, name: taskName, description: taskDescription})
                    handleEditing()
                    setTaskName("");
                    setTaskDescription("")
                }}
            >
                <span>Обновить</span>
            </button>
        </div>
    );
}

export default ToDoItem;
