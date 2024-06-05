import React, { useContext } from 'react'

import cl from "./logo.module.scss"
import { RouterContext } from '../../../../Router';

interface Props {
    productsLink?: boolean
}

function LogoUI({ productsLink }: Props) {
    const router = useContext(RouterContext)
    return (productsLink ?
        <p onClick={() => { router("/products", 2) }} className={cl.logo}>
            Products Shop
        </p>
        :
        <p onClick={() => { router("/", 2) }} className={cl.logo}>
            Products Shop
        </p>
    );
}

export default LogoUI;