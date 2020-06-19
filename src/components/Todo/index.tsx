import React, { useContext, useCallback } from 'react';

import Input from '../Input'
import { TodoListContext, Types } from '../../store'
import { TodoItem } from '../../store/reducers'

import './styles.css'


interface TodoList {
    [key: string]: TodoItem[]
}

interface TodoListItemProps {
    id: number,
    text: string,
    checked: boolean,
    onClick: Function,
}

const TodoListItem: React.FC<TodoListItemProps> = ({ id, text, checked, onClick }) => {
    const itemId = `TodoListItem-${id}`

    return (
        <div onClick={(e) => {e.preventDefault(); onClick(id)} } className={`TodoListItem ${checked ? "selected":""}`}>
            <input id={itemId} type="checkbox" />
            <label htmlFor={itemId}>{ text }</label>
        </div>
    )
}

const TodoList:React.FC = () => {
    const { state: {selected, todolists}, dispatch } = useContext(TodoListContext)
    const todolist = todolists[selected]
    const orderedTodos = todolist
                            .sort((a, b) => b.id - a.id)
                            .sort((a, b) => a.checked && !b.checked ? 1 : -1)

    const addTodo = (text: string) => {
        dispatch({
            type: Types.ADD_ITEM,
            text
        })
    }

    const toogleItem = useCallback((id: number) => {
        console.log('A', id)
        dispatch({
            type: Types.TOOGLE_ITEM,
            id
        })
    }, [dispatch])


    return (
        <div className="TodoList">
            <h3>{ selected }</h3>

            <div className="form">
                <Input placeholder="new todo" onSubmit={ addTodo } autofocus={ true }/>
            </div>
            <ul>
                {
                    orderedTodos.map(t => (
                        <TodoListItem
                            key={t.id}
                            {...t}
                            onClick={ toogleItem } />
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList