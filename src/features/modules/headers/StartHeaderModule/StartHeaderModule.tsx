import React from 'react'
import LogoUI from '../../../ui/global/logo/logo';
import AuthActionsCom from '../../../components/start/authActionsCom';

function StartHeaderModule() {
    return (
        <div className='header'>
            <LogoUI />
            <AuthActionsCom />
        </div>
    );
}

export default StartHeaderModule;