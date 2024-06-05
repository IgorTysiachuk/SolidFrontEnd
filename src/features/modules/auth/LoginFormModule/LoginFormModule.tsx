import React, { useContext, useState } from 'react'

import cl from './styles/authFormModule.module.scss'
import UniversalFormCom from '../../../components/forms/universal/UniversalFormCom';
import { InputFieldUI } from '../../../ui/auth/Fields/FieldsUI';
import { RouterContext } from '../../../../Router';
import useFetching from '../../../hooks/useFetching';
import AuthServices from '../../../API/auth/AuthServices';
import { LoginRestrictions, PasswordRestrictions } from '../../../constants/restrictions';
import { SetTokenSS } from '../../../../functions/tokens';
import { useSelector } from 'react-redux';
import LoaderAnimation from '../../../animations/ui/loaders/LoaderAnimation';
import LoaderLayout from '../../../ui/layouts/LoaderLayout';

function LoginFormModule() {
    const access = useSelector((item: any) => item.verifedToken.verifed_token)

    const router = React.useContext(RouterContext)
    const [loginValue, setLoginValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")

    const [loginErr, setLoginErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")

    const [fetchData, isLoading, error] = useFetching(async () => {
        const response = await AuthServices.Login({
            login: loginValue,
            password: passwordValue
        })
        if (response.data) {
            switch (response.data.code) {
                case 0:
                    SetTokenSS(response.data.result.token)
                    router('/', 2)
                    break;
                case 403:
                    break;
                case 401:
                    setPasswordErr("Wrong login or password!")
                    break;
            }
        }
    });
    const Login = () => {
        setPasswordErr("")
        setLoginErr("")


        let counter = 0
        if (loginValue.length !== 0) {
            if (loginValue.length <= LoginRestrictions.max && loginValue.length >= LoginRestrictions.min) {
                counter++
            } else {
                setLoginErr(`only from ${PasswordRestrictions.min} to ${PasswordRestrictions.max} letters`)
            }
        } else {
            setLoginErr(`Field cannot be empty`)
        }

        if (passwordValue.length !== 0) {
            if (passwordValue.length <= PasswordRestrictions.max && passwordValue.length >= PasswordRestrictions.min) {
                counter++
            } else {
                setPasswordErr(`only from ${PasswordRestrictions.min} to ${PasswordRestrictions.max} letters`)
            }
        } else {
            setPasswordErr("Field cannot be empty")
        }
        if (counter == 2) {
            fetchData()
        }
    }


    return (access == "Loading" ?
        <LoaderLayout>
            <LoaderAnimation />
        </LoaderLayout>
        :
        <div className={cl.layout}>
            <UniversalFormCom loading={isLoading} onClick={Login} apply='Login' title='Log in'>
                <InputFieldUI errorText={loginErr} value={loginValue} setValue={setLoginValue} label='Login' placeholder='input your login' />
                <InputFieldUI errorText={passwordErr} value={passwordValue} setValue={setPasswordValue} label='Password' placeholder='input your password' />
            </UniversalFormCom>
        </div>
    );
}

export default LoginFormModule;