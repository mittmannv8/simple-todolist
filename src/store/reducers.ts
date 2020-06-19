import rfdc from 'rfdc'
const clone = rfdc()
 
export enum Types {
    ADD_LIST = 'ADD_LIST',
    REMOVE_LIST = 'REMOVE_LIST',
    SELECT_LIST = 'SELECT_LIST',
    ADD_ITEM = 'ADD_ITEM',
    TOOGLE_ITEM = 'TOOGLE_ITEM',
    REMOVE_ITEM = 'TodoListContext',
}

export interface TodoItem {
    id: number,
    text: string,
    checked: boolean,
}

export interface TodoLists {
    [key: string]: TodoItem[]
}

export type Action = 
    | { type: Types.ADD_ITEM, text: string }
    | { type: Types.ADD_LIST, name: string }
    | { type: Types.SELECT_LIST, name: string }
    | { type: Types.TOOGLE_ITEM, id: number }

export interface State {
    selected: string,
    todolists: TodoLists
}


const addItem = (state: State, text: string) => {
    const { selected, todolists } = clone(state)

    todolists[selected].push({
        id: new Date().getTime(),
        text: text,
        checked: false
    })

    return { selected, todolists }
}


export const reducer = ( state: State, action: Action) => {
    switch (action.type) {
        case Types.ADD_LIST:
            return { selected: action.name, todolists: {
                ...state.todolists, [action.name]: [] }
            }
        case Types.SELECT_LIST:
            return { ...state, selected: action.name }
        case Types.TOOGLE_ITEM:
            const { selected, todolists } = clone(state)
            const newcurrentTodo = todolists[selected].map(item => {
                if (item.id === action.id) {
                    item.checked = !item.checked
                }
                return item
            })
            return { selected, todolists: {...state.todolists, [selected]: newcurrentTodo} }
        case Types.ADD_ITEM:
            return addItem(state, action.text)
        default:
            return state
    }
}
export default reducer
