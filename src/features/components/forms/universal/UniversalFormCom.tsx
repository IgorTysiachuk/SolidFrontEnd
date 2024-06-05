import React, { Children } from 'react'

import cl from './forms.module.scss'
import ButtonUI from '../../../ui/buttons/ButtonUI';
import Overlay from '../../../ui/loaders/overlay';
import closeSvg from '../../../../images/svg/close.svg'
interface Props {
    title: string,
    children: React.ReactNode,
    apply: string,
    onClick?: () => void,
    loading?: boolean | undefined,
    close?: () => void
}

function UniversalFormCom(props: Props) {
    return (
        <div className={cl.form}>
            {props.close !== undefined &&
                <button onClick={props.close} className={cl.form_cross}>
                    <img src={closeSvg}></img>
                </button>
            }
            <div className={cl.form_top}>
                {props.title}
            </div>
            <div className={cl.form_middle}>
                {props.children}
            </div>
            <div onClick={props.onClick} className={cl.form_bottom}>
                <ButtonUI loading={props.loading} title={props.apply} />
            </div>
            {props.loading &&
                <Overlay loading={props.loading} />
            }
        </div>
    );
}

export default UniversalFormCom;