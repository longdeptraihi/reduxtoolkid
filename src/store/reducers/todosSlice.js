import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//reducer thunk 
export const getTodos = createAsyncThunk('todos/todosFetched', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return response.data
})

export const addTodo = createAsyncThunk('todos/todoAdded', async title => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false
    }
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    return newTodo
})
export const deleteTodo = createAsyncThunk('todos/todoDeleted', async todoId => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    return todoId
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        // addTodo: {
        //     reducer(state, action) {
        //         state.allTodos.unshift(action.payload)
        //     },
        //     prepare(title) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false
        //             }
        //         }
        //     }
        // },
        markComplete(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos = state.allTodos.map(todo => {
                if (todo.id === todoId) todo.completed = !todo.completed
                return todo
            })
        },
        // deleteTodos(state, action) {
        //     const todoId = action.payload
        //     state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        // },
        // todoFetched(state, action) {
        //     state.allTodos = action.payload
        // }
    },
    extraReducers: {
        //get all todos
        [getTodos.pending]: (state, action) => {
            console.log('fetch')
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log('Done')
            state.allTodos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            console.log('failed to fulfill')
        },
        // add todos 
        [addTodo.fulfilled]: (state, action) => {
            state.allTodos.unshift(action.payload)
        },
        //delete 
        [deleteTodo.fulfilled]: (state, action) => {
            const todoId = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        }
    }
})


//async actiom creator, action and reducer dispatch
// export const getTodos = () => {
//     const getTodosAsync = async dispatch => {
//         try {
//             const response = await axios.get(
//                 'https://jsonplaceholder.typicode.com/todos?_limit=5'
//             )
//             dispatch(todoFetched(response.data))
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return getTodosAsync
// }
// export const getTodos = () => async dispatch => {
//     try {
//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/todos?_limit=5'
//         )
//         dispatch(todoFetched(response.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

//reducers
const todosReducer = todosSlice.reducer

//selector
export const todosSelector = state => state.todosReducer.allTodos

// export action
export const {
    //addTodo,
    markComplete,
    //deleteTodo
    //todoFetched
} = todosSlice.actions

//export reducer
export default todosReducer