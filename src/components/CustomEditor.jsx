"use client";
import { useTodo } from "@/context/TodoProvider ";
import axios from "axios";
// import { useTodo } from "@/context/TodoProvider";
import React, { useState, useRef, useEffect, useCallback } from "react";

const RighTodo = () => {
  const [content, setContent] = useState("");
  const { selectedTodo, setSelectedTodo, todos, setTodos } = useTodo();
  const editorRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState("New Additions");
  const [isUppercase, setIsUppercase] = useState(true);

  // Formatting functions
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const toggleCase = () => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        const newText = isUppercase
          ? selectedText.toUpperCase()
          : selectedText.toLowerCase();

        const textNode = document.createTextNode(newText);
        range.deleteContents();
        range.insertNode(textNode);
        setIsUppercase(!isUppercase);
      }
      editorRef.current?.focus();
    }
  };

  const applyColor = (e) => {
    console.log("Color Picked: ", e.target.value);
    setSelectedColor(e.target.value);
    applyFormat("foreColor", e.target.value);
    editorRef.current?.focus();
  };
  const handleInput = () => {
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  // Debounce function to delay the update
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Handle title change with debounce
  const handleChange = (e) => {
    setTempTitle(e.target.value);
    debounce(() => setIsEditing(false), 5000)();
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    const styledContent = editorRef.current.innerHTML;
    const operation = Object.keys(selectedTodo).length === 0 ? "new" : "update";
    const id = selectedTodo?.id || "";
  
    try {
      const response = await axios.post("/api/todos/content", {
        title: tempTitle,
        description: styledContent,
        operation,
        id,
      });
  
      if (response.status === 201) {
        alert(
          operation === "new"
            ? "Data added successfully"
            : "Data updated successfully"
        );
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    setSelectedTodo({});
  
    try {
      const response = await axios.delete(`/api/todos/content/${id}`);
      if (response.status === 200) {
        alert("Content deleted successfully");
        setTodos(todos.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  // Initialize content when selectedTodo changes
  useEffect(() => {
    if (selectedTodo) {
      setTempTitle(selectedTodo.title || "New Additions");
      if (editorRef.current) {
        editorRef.current.innerHTML = selectedTodo.description || "";
      }
    }
  }, [selectedTodo]);

  // Toolbar component
  const Toolbar = () => (
    <div className="toolbar bg-[#ffffff]">
      {["bold", "italic", "underline"].map((cmd) => (
        <button key={cmd} onClick={() => applyFormat(cmd)} title={cmd}>
          <img src={`/${cmd}.svg`} />
        </button>
      ))}
      {["insertUnorderedList", "insertOrderedList"].map((cmd, index) => (
        <button key={cmd} onClick={() => applyFormat(cmd)} title={cmd}>
          <img src={index === 0 ? "/bullet.svg" : "/number.svg"} />
        </button>
      ))}
      {["justifyCenter", "justifyRight", "justifyFull"].map((cmd, index) => (
        <button key={cmd} onClick={() => applyFormat(cmd)} title={cmd}>
          <img src={["/center.svg", "/right.svg", "/left.svg"][index]} />
        </button>
      ))}
      <button
        onClick={toggleCase}
        title={isUppercase ? "To Uppercase" : "To Lowercase"}
      >
        <img src="/text.svg" />
      </button>
      <label className="relative cursor-pointer">
        <img src="/color.svg" alt="Pick Color" className="py-2" />
        <input
          type="color"
          value={selectedColor}
          onChange={applyColor}
          className="opacity-0 absolute left-0 w-full h-full cursor-pointer"
        />
      </label>

      <button onClick={handleSave} title="Save">
        <img src="/save.svg" />
      </button>
    </div>
  );

  return (
    <div className="h-[736px] w-[404px] sm:w-[404px] lg:w-[652px] bg-white border border-gray-300 rounded-md gap-4 p-[35px_42px] flex flex-col">
      <div className="flex justify-between">
        {isEditing ? (
          <input
            className="text-[36px] font-semibold outline-none"
            value={tempTitle}
            onChange={handleChange}
            style={{ fontFamily: "Poppins" }}
            autoFocus
          />
        ) : (
          <span
            className="text-[36px] font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
            style={{ fontFamily: "Poppins" }}
          >
            {tempTitle}
          </span>
        )}
        <button
          className="text-[36px] cursor-pointer"
          onClick={() => {
            if (selectedTodo && Object.keys(selectedTodo).length !== 0) {
              handleDelete(selectedTodo.id);
            }
          }}
        >
          <img src="/delete.svg" alt="Delete" />
        </button>
      </div>

      <Toolbar />
      <div
        ref={editorRef}
        className="editor flex-1 overflow-auto min-h-0"
        contentEditable={true}
        onInput={handleInput}
        placeholder="To stay representative of framework & new example apps."
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default RighTodo;
