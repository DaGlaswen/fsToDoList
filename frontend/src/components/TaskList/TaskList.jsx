import ToDoItem from "../ToDoItem/ToDoItem";

function TaskList({tasks, deleteItem, updateItem, completeItem}) {
    return (
        <ul style={{display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", paddingLeft: "0"}}>
            {tasks.map((todoItem) => (
                <ToDoItem
                    key={todoItem.id}
                    id={todoItem.id}
                    name={todoItem.name}
                    item={todoItem}
                    description={todoItem.description}
                    onCheckedDelete={deleteItem}
                    onCheckedUpdate={updateItem}
                    onCheckedComplete={completeItem}
                    completed={todoItem.completed}
                />
            ))}
        </ul>
    )
}

export default TaskList