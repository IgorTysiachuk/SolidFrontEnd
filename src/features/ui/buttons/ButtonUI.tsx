import React from 'react'

import cl from './buttons.module.scss'
interface Props {
    title: string;
    onClick?: () => void,
    dashed?: boolean,
    loading?: boolean | undefined | Element,
    font_size?: string,
}
interface SProps {
    title: string;
    onClick?: () => void,
    dashed?: boolean,
    loading?: boolean | undefined | Element,
    font_size?: string,
    width: string,
}

function ButtonUI(props: Props) {
    return (
        <button onClick={props.onClick} className={`
            ${cl.button} 
            ${props.dashed ? cl.button_dashed : cl.button_solid} 
        `}
            style={{ fontSize: "0.8em" }}>
            {props.title}
        </button>
    );
}

export function StaticButtonUI(props: SProps) {
    return (
        <button onClick={props.onClick} className={`
            ${cl.button} 
            ${props.dashed ? cl.button_dashed : cl.button_solid} 

        `}
            style={{ fontSize: "0.8em", width: props.width }}>
            {props.title}
        </button>
    );
}

export default ButtonUI;