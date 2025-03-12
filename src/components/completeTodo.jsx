"use client";
import React, { useEffect, useState } from "react";
import LeftTodo from "./leftTodo";
import { useTodo } from "@/context/TodoProvider ";
import RighTodo from "./CustomEditor";

const CompleteTodo = () => {
  const [showEditor, setShowEditor] = useState(false);
  const {selectedTodo, setSelectedTodo } = useTodo();

  // Handle card click
  const handleCardClick = (item) => {
    console.log("Clicked", item);
    setSelectedTodo({
      id: item.id,
      description: item.description,
      title: item.title,
    });
    setShowEditor(true);
  };
  console.log(showEditor);
  // Handle back to card list
  const handleBack = () => {
    setShowEditor(false);
    setSelectedTodo({});
  };
  useEffect(() => {}, [selectedTodo]);
  return (
    <div className="flex flex-row gap-[72px] sm:mx-[16px] mx-[16px] md:mx-[16px] lg:mx-[114px] my-[59px]">
      {/* Left Todo (Always Visible) */}
      <div className={`${showEditor ? "max-sm:hidden" : "block"}`}>
        <LeftTodo handleCardClick={handleCardClick} setShowEditor={setShowEditor}/>
      </div>
      {/* RightTodo (Visible on large screens or when card clicked) */}
      <div className={`min-sm:block ${showEditor ? "max-sm:block" : "max-sm:hidden"}`}>
        {/* Back Button (Only visible on small screens) */}
        <div className="flex min-sm:hidden items-center gap-2 cursor-pointer mb-4" onClick={handleBack}>
          <img className="" src="/back.svg" alt="Back" />
          <span className="text-[24px] font-semibold font-[Poppins]">Back</span>
        </div>
        <RighTodo />
      </div>
    </div>
  );
};

export default CompleteTodo;
