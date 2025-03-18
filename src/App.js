import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, ListGroup, ListGroupItem, FormCheck } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // ฟังก์ชันสำหรับเพิ่ม Todo ใหม่
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setInput(""); // เคลียร์ input field
    }
  };

  // ฟังก์ชันสำหรับลบ Todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // ฟังก์ชันสำหรับแก้ไข Todo
  const editTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // ฟังก์ชันสำหรับเปลี่ยนสถานะการทำงาน (ทำเสร็จ/ยังไม่เสร็จ)
  const toggleCompleted = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // ฟังก์ชันสำหรับการกด Enter เพื่อเพิ่ม Todo
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // รองรับการกด Enter
          placeholder="เพิ่มงานที่ต้องทำ"
        />
        <Button variant="primary" onClick={addTodo}>เพิ่ม</Button>
      </InputGroup>

      <ListGroup>
        {todos.map(todo => (
          <ListGroupItem
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <FormCheck
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
                label={<span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>}
              />
            </div>
            <div>
              <Button
                variant="warning"
                size="sm"
                className="mx-2"
                onClick={() => {
                  const newText = prompt("แก้ไขข้อความ", todo.text);
                  if (newText !== null) editTodo(todo.id, newText);
                }}
              >
                แก้ไข
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              >
                ลบ
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default App;
