import React, { useContext } from 'react'
import ButtonUI from '../../ui/buttons/ButtonUI';
import cl from './auth.module.scss'
import { RouterContext } from '../../../Router';

function AuthActions() {
    const router = useContext(RouterContext)
    return (
        <div className={cl.actions}>
            <ButtonUI dashed onClick={() => { router("/register", 1) }} title="register" />
            <ButtonUI onClick={() => { router("/login", 1) }} title='login' />
        </div>
    );
}

export default AuthActions;