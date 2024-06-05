import React, { ReactNode } from 'react'

import cl from "./layouts.module.scss"

interface Props {
    children: ReactNode
}

function LoaderLayout(props: Props) {
    return (
        <div className={cl.loader}>
            {props.children}
        </div>
    );
}

export default LoaderLayout;