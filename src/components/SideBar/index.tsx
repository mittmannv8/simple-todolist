import React, { useContext, useMemo, useCallback } from 'react'

import Input from '../Input'
import ProgressBar from '../ProgressBar'
import { TodoListContext, Types } from '../../store'
import { TodoItem } from '../../store/reducers'

import './styles.css'


interface SideBarProps {
    name: string
    todos: TodoItem[]
    selected: boolean,
    onClick: Function
}


const SideBarItem: React.FC<SideBarProps> = React.memo(({ name, todos, selected, onClick }) => {
    const progress = useMemo(() => {
        return (todos.filter(t => t.checked).length / todos.length) * 100
    }, [todos])

    return (
        <div onClick={ (event) => {onClick(name)} } className={`SideBarItem ${selected ? "selected": ""}`}>
            <div className="SideBarItem-details">
                <span className="SideBarItem-details-name">{ name }</span>
                <span className="SideBarItem-details-quantity">({todos.length} items)</span>
            </div>

            <ProgressBar progress={ progress }/>
        </div>
    )
})


const SideBar: React.FC = () => {
    const { state: {selected, todolists}, dispatch} = useContext(TodoListContext)
    const lists = todolists || {}

    const addTodoList = (name: string) => {
        dispatch({
            type: Types.ADD_LIST,
            name
        })
    }

    const selectList = useCallback((name: string) => {
        dispatch({
            type: Types.SELECT_LIST,
            name
        })
    }, [dispatch])


    return (
        <div className="SideBar">
            <h3>The Todo List</h3>

            <div className="SideBarForm">
                <Input onSubmit={ addTodoList } placeholder="todo name" />
            </div>

            <ul>
                {
                    Object.keys(lists)?.map(name => (
                    <SideBarItem
                        selected={ name === selected }
                        key={ name }
                        name={ name }
                        onClick={ selectList }
                        todos={ lists[name] } />
                    ))
                }
            </ul>
        </div>
    )
}


export default SideBar