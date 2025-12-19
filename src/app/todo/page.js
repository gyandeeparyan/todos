import React from 'react';
import { getTodos } from '../../utils/api';
import Container from '@/Component/Container';


const Todo = async()=>{
    let todolist = [];
    try {
        todolist= await getTodos();
    } catch (error) {
        return null;
        
    }
    return (
        <>
        <div className='px-2 md:px-8'>

        <Container todolist={todolist}/>
        </div>
        
        </>
       
    )
}

export default Todo;