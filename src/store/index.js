import todosReducer from './reducers/todosSlice'

import { configureStore } from '@reduxjs/toolkit'


//store
const store = configureStore({
    reducer: {
        todosReducer
    }
})

// export
export default store



