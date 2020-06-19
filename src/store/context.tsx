import React, { createContext, useReducer } from 'react'

import { reducer, State, Action} from './reducers'


const initial = {
    selected: 'todo',
    todolists: {
        todo: [],
    }
}


interface ProviderValue {
    state: State,
    dispatch: React.Dispatch<Action>
}


const TodoListContext = createContext<ProviderValue>({
    state: initial,
    dispatch: () => null
})


const TodoListProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial)

    return (
        <TodoListContext.Provider value={{state, dispatch}}>
            { children }
        </TodoListContext.Provider>
    )

}

export {
    TodoListContext,
}

export default TodoListProvider