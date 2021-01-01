import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    if (todo.text === "" || todo.text === undefined) {
      return;
    } else {
      setTodos(newTodos);
    }
  };

  const updateTodo = (todoId, newValue) => {
    console.log(newValue);
    if (newValue.text === "" || newValue.text === undefined) {
      return;
    } else {
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? newValue : item))
      );
    }
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const handleTimeChange = (date, id, text) => {
    for (let todo of todos) {
      if (todo.id === id) {
        todo.date = date;
        let newTodo = {
          id,
          text,
          date: todo.date,
        };
        updateTodo(id, newTodo);
      }
    }
  };
  const getPageData = () => {
    let newTodos;
    newTodos = [...todos];
    if (newTodos.length > 0) {
      if (filter === "sort") {
        newTodos = newTodos.sort(function compare(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateA - dateB;
        });
      } else if (filter === "completed") {
        newTodos = newTodos.filter((todo) => todo.isComplete === true);
      } else if (filter === "active") {
        newTodos = newTodos.filter((todo) => todo.isComplete === undefined);
      }
    }
    return { newTodos };
  };
  const filterCompleted = (filter) => {
    if (
      filter === "sort" ||
      filter === "completed" ||
      filter === "active" ||
      filter === "all"
    ) {
      setFilter(filter);
    }
  };

  const { newTodos } = getPageData();
  let filterItems = ["All", "Sort", "Completed", "Active"];
  return (
    <>
      <h1>What's the task?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={newTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        handleTimeChange={handleTimeChange}
      />
      <hr />
      <ul className="ul-list">
        {filterItems.map((f) => (
          <li
            className={
              f.toLowerCase() === filter
                ? "li-list active"
                : "li-list"
            }
            onClick={() => filterCompleted(f.toLowerCase())}
            key={f}
          >
            {f}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;