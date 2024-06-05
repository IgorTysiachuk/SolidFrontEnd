import React, { useEffect, useState } from "react";

import errorSvg from '../../../images/svg/error.svg'
import cl from "./style.module.scss"
import { useDispatch, useSelector } from "react-redux";

export default function ErrorMassage() {
    const dispatch = useDispatch()
    const massage = useSelector((item: any) => item.massage)

    const [text, setText] = useState<string>("")
    const [isShow, setIsShow] = useState<boolean>(false)

    useEffect(() => {
        setText(massage.text)
        setIsShow(massage.show)
    }, [massage])
    return (isShow ?
        <div className={cl.table}>
            <p className={cl.table_text}>{text}</p>
            <img className={cl.table_img} src={errorSvg}></img>
        </div>
        :
        <></>
    )
}