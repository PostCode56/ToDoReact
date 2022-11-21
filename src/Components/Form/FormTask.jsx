import React, {useEffect, useState} from 'react';
import classes from './Form.module.css';
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
const getLocalStorage = () => {
    let todos = localStorage.getItem("todos");
    if (todos){
        return (todos = JSON.parse(localStorage.getItem("todos")));
    } else {
        return [];
    }
}
const FormTask = () => {
    const [todos,setTodos] = useState(getLocalStorage);
    const [value, setValue] = useState("");
    const [allTodos,setAllTodos] = useState(0);
    const [allComplete, setAllComplete] = useState(0);
    useEffect( ()=>{
        localStorage.setItem("todos", JSON.stringify(todos))
        setAllComplete(todos.filter(todo => todo.done === true).length)
        setAllTodos(todos.length)
    }, [todos])
    const putToDO = (value) =>{
        if(value){
            setTodos([...todos,  {id:Date.now(), text: value, done:false}])
        } else{
            alert("Введите текст")
        }
    }
    const toggleToDO  = (id) => {
        setTodos(todos.map(todo =>{
            if (todo.id !== id) return todo;
            return {
                ...todo,
                done: !todo.done
            }
        }))
    }
    const removeToDO = (id) =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const clearTask = () =>{
        setTodos([]);
    }
    return (
        <form onSubmit={e => {
            e.preventDefault();
            putToDO(value);
            setValue("");
        }}>
                <div className={classes.form_item}>
                    <h1>ToDoApp</h1>
                    <div className={classes.form_block}>
                        <MyInput
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <MyButton onClick={putToDO}>Добавить</MyButton>
                    </div>
                    <div className={classes.ul}>
                        {todos.map(todo => {
                            return (
                                <div className={classes.task}>
                                    <div className={todo.done ? classes.list_done : classes.list_task }
                                         key={todo.id}
                                         onClick={() => toggleToDO(todo.id)}>
                                        <div className={classes.textTodo}>{todo.text}</div>
                                        <img className={classes.delete_task} src="./delete.png" onClick={e => {
                                            e.stopPropagation();
                                            removeToDO(todo.id)
                                        }}/>
                                    </div>
                                </div>
                            )})}
                        <div className={classes.allToDo}>
                            <span> Всего заметок: {allTodos}</span>
                            <div className={classes.btnAll} onClick={clearTask}> Удалить все</div>
                            <span> Выделено: {allComplete}</span>
                        </div>
                    </div>
                </div>
        </form>
    );
};
export default FormTask;