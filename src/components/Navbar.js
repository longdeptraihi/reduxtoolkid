import React from 'react'
import { useSelector } from 'react-redux'
import { todosSelector } from '../store/reducers/todosSlice'

const Navbar = () => {
    const todos = useSelector(todosSelector)
    return (
        <div className="navbar">
            <h1>My redux todos app</h1>
            <ul>
                <li>home</li>
                <li>about</li>
                <li>total : {todos.length}</li>
            </ul>
        </div>
    )
}

export default Navbar
