import React from 'react'

import cl from './universal.module.scss'
import Overlay from '../ui/loaders/overlay';

interface Props {
    children?: React.ReactNode,
    loading?: boolean
}

function Content({ children, loading }: Props) {
    return (
        <div className={cl.content}>
            {children}
            <Overlay loading={loading} />
        </div>
    );
}

export default Content;