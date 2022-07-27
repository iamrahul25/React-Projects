import './App.css';
import { useState, useEffect } from 'react';
import ToDoCard from './ToDoCard';
import {v4 as uuidv4} from 'uuid';

function App() {

    const initialState = JSON.parse(localStorage.getItem('TodoApp')) || [];
    const [allTodos, setAllTodos] = useState(initialState);

    // ***
    const [todoItem, setTodoItem] = useState('');

    //useEffect to add new todo item
    useEffect(() => {
        localStorage.setItem('TodoApp', JSON.stringify(allTodos));
    }, [allTodos]);


    function addTodoItem() {
        const d = {title: todoItem, id: uuidv4(), done: false};
        
        //Checking if the input is empty. 
        if(todoItem.trim() !== ''){
            setAllTodos([...allTodos, d]);
            setTodoItem('');
        }
    }


    return (
        <div className="App">

            <div className="todoapp">

                <div className="headingdiv">
                    <h1>To-do App 📝</h1>
                </div>

    
                <form onSubmit={(e)=>{e.preventDefault()}} className='formdiv'>
                    
                    <input type="text" placeholder="Enter todo..." 
                    value={todoItem}
                    onChange={(e) => setTodoItem(e.target.value)}
                    />

                    <button type='submit' onClick={()=>{addTodoItem()}}>Add</button>
                    
                </form>


                <div className="alltodos">

                    {allTodos.map((Todos) => (
                        <ToDoCard key={Todos.id} Todos={Todos} allTodos={allTodos} setAllTodos={setAllTodos} />
                    ))}

                </div>
            </div>

        </div>
    );
}

export default App;
