import React from 'react';

const ToDoCard = ({Todos, allTodos, setAllTodos}) => {

    const handleDelete = (id) => {
        setAllTodos(allTodos.filter((allTodos) =>allTodos.id !== id));
        //console.log("Delete",id);
    }

    const handleDone = (id) =>{

        setAllTodos(allTodos.filter((allTodos) => {
            if(allTodos.id === id){
                allTodos.done = !allTodos.done;
            }
            return allTodos;
        }));
    }

    return (

    <div className="todocard">

        <div className="title">
            <p style={Todos.done ? {textDecoration: 'line-through'} : {}}>{Todos.title} </p>
        </div>
        
        <div>
            <i className="fa-regular fa-circle-check done_todo" onClick={()=>{handleDone(Todos.id)}}></i>
            <i className="fa-regular fa-trash-can delete_todo"  onClick={()=>{handleDelete(Todos.id)}}></i>
        </div>

    </div>

    );
}

export default ToDoCard;

