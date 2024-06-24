import React, {useState} from "react";

function InputArea({onAdd}) {

    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")

    return (
        <div className="form" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
        }}>
            <div>
                <input placeholder="Название" onChange={(e) => setTaskName(e.target.value)} type="text"
                       value={taskName}/>
                <input placeholder="Описание" onChange={(e) => setTaskDescription(e.target.value)} type="text"
                       value={taskDescription}/>
            </div>
            <button
                onClick={() => {
                    onAdd({name: taskName, description: taskDescription})
                    setTaskName("");
                    setTaskDescription("")
                }}
            >
                <span>Добавить</span>
            </button>
        </div>
    );
}

export default InputArea;
