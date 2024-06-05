import React from 'react'
import Chapter from '../ui/titles/chapter';

import cl from './universal.module.scss'

interface Props {
    title: string,
    children: React.ReactNode,
}

function Block(props: Props) {
    return (
        <div className={cl.block}>
            <Chapter title={props.title} />
            <div className={cl.block_place}>
                {props.children}
            </div>
        </div>
    );
}

export default Block;