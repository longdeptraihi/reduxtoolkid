import React,{ useState} from 'react'
import { addTodo } from '../store/reducers/todosSlice'
import { useDispatch } from 'react-redux'

const TodoForm = () => {
    const [title,setTitle] = useState([])
    
    const changeTitle = e => {
        setTitle(e.target.value)
    }
    const dispatch = useDispatch()
    const addSingeTodo = (e) => {
        e.preventDefault()
        dispatch(addTodo(title))
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={addSingeTodo}>
                <input type="text" value={title} onChange={changeTitle}/>
                <input type="submit"  value="add"/>
            </form>
        </div>
    )
}

export default TodoForm
