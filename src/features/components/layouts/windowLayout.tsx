
import React from 'react'

import cl from './window.module.scss'

interface Props {
    children?: React.ReactNode,
    onClick?: () => void
}

function WindowLayout({ children, onClick }: Props) {
    return (
        <div onClick={onClick} className={cl.window}>
            {children}
        </div>
    );
}

export default WindowLayout;