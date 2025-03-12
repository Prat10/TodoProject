import CompleteTodo from '@/components/completeTodo';
import Navbar from '@/components/navbar';
import React from 'react'

const MainTodo = () => {
  return (
    <div className=''>
        <Navbar />
        {/* <div>Hello</div> */}
        <CompleteTodo />
    </div>
  )
}

export default MainTodo;