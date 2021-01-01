import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseLine } from "react-icons/ri";
import { GiFeather } from "react-icons/gi";
import DatePicker from "react-datepicker";

const Todo = ({
    todos,
    completeTodo,
    removeTodo,
    updateTodo,
    handleTimeChange,
}) => {
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: "",
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo, index) => (
        <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
        >
            {todo.isComplete ? (<> </>) : (<DatePicker
                className="date-picker"
                selected={todo.date}
                onChange={(date) => handleTimeChange(date, todo.id, todo.text)}
                dateFormat="dd/MM/yyyy"
            />)}
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>

            <div className="icons">
                <RiCloseLine
                    onClick={() => removeTodo(todo.id)}
                    className="delete-icon"
                />

                <GiFeather
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className="edit-icon"
                />
            </div>
        </div>
    ));
};

export default Todo;
