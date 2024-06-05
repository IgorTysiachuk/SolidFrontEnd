import React from 'react'

import cl from './fields.module.scss'

interface Props {
    placeholder: string,
    label: string,
    setValue?: any,
    value?: any,
    errorText?: string
}

export function InputFieldUI(props: Props) {
    return (
        <div className={cl.overlay}>
            <p className={cl.overlay_p1}>{props.label}</p>
            <input value={props.value && props.value} onChange={e => { props.setValue(e.target.value) }} className={cl.input} placeholder={props.placeholder}></input>
            <p className={cl.overlay_p2}>{props.errorText}</p>
        </div>
    )
}

interface Numbers {
    placeholder: string,
    label: string,
    setValue?: any,
    value?: any,
    errorText?: string
}

export function InputNumbersFieldUI(props: Numbers) {
    return (
        <div className={cl.overlay}>
            <p className={cl.overlay_p1}>{props.label}</p>
            <input type='number' value={props.value && props.value} onChange={e => { props.setValue(e.target.value) }} className={cl.input} placeholder={props.placeholder}></input>
            <p className={cl.overlay_p2}>{props.errorText}</p>
        </div>
    )
}