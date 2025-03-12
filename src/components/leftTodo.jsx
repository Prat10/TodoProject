'use client';
import React, { useCallback, useEffect, useState } from "react";
import Card from "./todoCard";
import axios from "axios";
import { useTodo } from "@/context/TodoProvider ";

const LeftTodo = (props) => {
  const [content,setContent] = useState([]);
  const {selectedTodo, setSelectedTodo,todos,setTodos} = useTodo();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5

  const FetchDetail = useCallback(async () => {
    try {
      const res = await axios.get(`/api/todos/content/list?page=${currentPage}&limit=${itemsPerPage}`);
      if (res.status === 200) {
        // setContent(res.data);
        setTodos(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage]);

   // Handle page navigation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Store selected card data in context

  const createNewFile = () => {
    setSelectedTodo({})
    props.setShowEditor(true);
  }
  // console.log(content)
  useEffect(()=>{
    FetchDetail();
  },[currentPage]);

  //check latest update.
  useEffect(() =>{

  },[todos]);
  return (
    <div className="w-[402px]">
      <div className="flex justify-between">
        <div onClick={createNewFile}>
          <img src="/todo.svg"/>
        </div>
        <div>
        <img src="/search.svg"/>
        </div>
      </div>
      <div className="space-y-8 mt-8">
       {
         todos?.map((item,index)=>(
          <div key={index}>
          <Card detail={item} handleCardClick={props.handleCardClick}/>
          </div>
         ))
       }
      </div>

       {/* Pagination Controls */}
       <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeftTodo;
