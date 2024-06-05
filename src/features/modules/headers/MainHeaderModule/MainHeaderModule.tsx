import React, { useContext, useEffect, useState } from 'react'
import cl from './MainHeaderModule.module.scss'
import LogoUI from '../../../ui/global/logo/logo';
import CartInHeader from '../../../components/cart/CartInHeader';
import GlobalServices from '../../../API/global/GlobalServices';
import { PreferencesContext, ProductsContext, RouterContext } from '../../../../Router';
import useFetching from '../../../hooks/useFetching';
import { useDispatch, useSelector } from 'react-redux';
import { setVerifedToken } from '../../../../store/reducers/verifyToken';
import AuthActions from '../../../components/start/authActionsCom';


function MainHeaderModule() {
    const dispatch = useDispatch()
    const verifed = useSelector((item: any) => item.verifedToken.verifed_token)
    const router = useContext(RouterContext)
    const getProductsList = useContext(ProductsContext)
    const preferencesCall = useContext(PreferencesContext)

    const [fetch, isLoading, err] = useFetching(async () => {
        const response = await GlobalServices.VerifyToken();
        if (response.data) {
            switch (response.data.code) {
                case 0:
                    dispatch(setVerifedToken("True"))
                    break;
                case 404:
                    dispatch(setVerifedToken("False"))
                    break;
            }
        }
    })

    useEffect(() => {
        preferencesCall()
        fetch()
    }, [])

    return (
        <div className='header'>
            {verifed == "Loading" &&
                <>
                    <LogoUI />
                    <div className={cl.skeleton_menu}></div>

                </>
            }
            {verifed == "True" &&
                <>
                    <LogoUI />
                    <div className={cl.group}>
                        <div onClick={() => { router("/create", 2) }} className={cl.group_plus}></div>
                        <CartInHeader />
                    </div>
                </>
            }
            {verifed == "False" &&
                <>
                    <LogoUI />
                    <div className={cl.group}>
                        <AuthActions />
                    </div>
                </>
            }
        </div>
    );
}

export default MainHeaderModule;