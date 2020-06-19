import React, { useRef, useEffect } from 'react'

import './styles.css'


interface InputProps {
    onSubmit: Function,
    placeholder?: string,
    button?: string,
    autofocus?: boolean,
}

const Input: React.FC<InputProps> = ({ placeholder, button, onSubmit, autofocus}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const buttonLabel: string = button ? button : '+'
    const buttonStyle: object = button ? { fontSize: '1rem' } : {}

    useEffect(() => {
        if (autofocus) {
            inputRef.current?.focus()
        }
    })

    function submit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (inputRef.current?.value) {
            onSubmit(inputRef.current.value)
            inputRef.current.value = ""
            // inputRef.current.focus()
        }
    }

    return (
        <form onSubmit={ submit } className="Input">
            <input type="text" ref={ inputRef } placeholder={ placeholder } />
            <button type="submit" style={ buttonStyle }>{ buttonLabel }</button>
        </form>
    )
}

export default Input