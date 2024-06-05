import React, { useContext, useState } from 'react'

import cl from './styles/authFormModule.module.scss'
import UniversalFormCom from '../../../components/forms/universal/UniversalFormCom';
import { InputFieldUI, InputNumbersFieldUI } from '../../../ui/auth/Fields/FieldsUI';
import { RouterContext } from '../../../../Router';
import AuthServices from '../../../API/auth/AuthServices';
import useFetching from '../../../hooks/useFetching';
import { LoginRestrictions, PasswordRestrictions } from '../../../constants/restrictions';
import { cleaner } from '../../../../types/ProductType';
import { useSelector } from 'react-redux';
import LoaderAnimation from '../../../animations/ui/loaders/LoaderAnimation';
import LoaderLayout from '../../../ui/layouts/LoaderLayout';

function RegisterFormModule() {
    const [loginValue, setLoginValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [ageValue, setageValue] = useState<number>(NaN)

    const [loginErr, setLoginErr] = useState<string>("")
    const [passwordErr, setPasswordErr] = useState<string>("")
    const [ageErr, setageErr] = useState<string>("")

    const access = useSelector((item: any) => item.verifedToken.verifed_token)

    const [register, isLoading, error] = useFetching(async () => {
        const response = await AuthServices.Register({
            login: loginValue,
            password: passwordValue,
            age: ageValue
        })
        switch (response.data.code) {
            case 0:
                console.log(response.data)
                break;
            case 409:
                setLoginErr(`UserName is already used`)
                break;
        }
    })

    const Register = () => {
        cleaner(setPasswordErr, setLoginErr, setageErr)
        let counter = 0

        if (passwordValue.length !== 0) {
            if (passwordValue.length >= PasswordRestrictions.min && passwordValue.length <= PasswordRestrictions.max) {
                counter++
            } else setPasswordErr(`only from ${PasswordRestrictions.min} to ${PasswordRestrictions.max} letters`)
        } else {
            setPasswordErr("Field cannot be empty")
        }


        if (loginValue.length !== 0) {
            if (loginValue.length >= LoginRestrictions.min && loginValue.length <= LoginRestrictions.max) {
                counter++
            } else setLoginErr(`only from ${PasswordRestrictions.min} to ${PasswordRestrictions.max} letters`)
        } else setLoginErr("Field cannot be empty")

        if (ageValue) {
            if (ageValue >= 10 && ageValue <= 110) {
                counter++
            } else setageErr("Not acceptable age")
        } else setageErr("Enter age")

        if (counter == 3) {
            register()
        }
    }

    return (access == "Loading" ?
        <LoaderLayout>
            <LoaderAnimation />
        </LoaderLayout>
        :
        <div className={cl.layout}>
            <UniversalFormCom loading={isLoading} onClick={Register} apply='Register' title='Registration'>
                <InputFieldUI errorText={loginErr} value={loginValue} setValue={setLoginValue} label='Login' placeholder='input your login' />
                <InputFieldUI errorText={passwordErr} value={passwordValue} setValue={setPasswordValue} label='Password' placeholder='input your password' />
                <InputNumbersFieldUI errorText={ageErr} setValue={setageValue} value={ageValue} label="Price" placeholder="price" />
            </UniversalFormCom>
        </div>
    );
}

export default RegisterFormModule;