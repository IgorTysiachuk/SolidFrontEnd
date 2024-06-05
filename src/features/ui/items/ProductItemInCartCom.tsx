import React, { useContext, useEffect, useState, useRef } from 'react'

import cl from './items.module.scss'
import ButtonUI, { StaticButtonUI } from '../buttons/ButtonUI';
import useFetching from '../../hooks/useFetching';
import GlobalServices from '../../API/global/GlobalServices';
import { PreferencesContext } from '../../../Router';
import { url } from '../../constants/urls';

import colorStar from '../../../images/svg/Star.svg'
import greyStar from '../../../images/svg/StarGrey.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addPreference } from '../../../store/reducers/preferences';
import { ProductType } from '../../../types/ProductType';
import { setMassage } from '../../../store/reducers/massage';
import MassageCall from '../../../functions/massageCall';

interface Props {
    title: string,
    text?: string,
    product_id: string,
    user_id?: string,
    action_button?: React.ReactNode,
    type_incart?: boolean,
    isInCartTable?: boolean,
    user_login?: string,
    current_price: number,
    sale_price?: number,
    rate: number | null,
}

function ProductItemInCartCom(props: Props) {
    const dispatch = useDispatch()
    const preferencesList = useSelector((item: any) => item.preferences.preferences_list)
    const productsList = useSelector((item: any) => item.products.products_list)
    const verifedToken = useSelector((item: any) => item.verifedToken.verifed_token)
    const PreferencesCall = useContext(PreferencesContext)

    const productId = props.product_id

    const timeToStop = 4000

    const dispatchAddPreferences = () => {
        productsList.forEach((item: ProductType) => {
            if (item.product_Id == productId) {
                if (!preferencesList.some((el: any) => el.product_Id == item.product_Id)) {
                    dispatch(addPreference([...preferencesList, item]))
                }
            }
        });

    }
    const dispatchRemovePreferences = () => {

        dispatch(addPreference(preferencesList.filter((item: any) => item.product_Id !== productId)))
    }



    const [overRemove, setOverRemove] = useState<boolean>(false)
    const [overAdd, setOverAdd] = useState<boolean>(false)

    const isAuthorized = async (func: any) => {
        if (verifedToken == "True") {
            func()
        }
        if (verifedToken == "False") {
            MassageCall("Login", dispatch)
        }
    }

    const [addTocart, isLoading, err] = useFetching(async () => {
        const timeoutId = setTimeout(() => {
            dispatchRemovePreferences()
            MassageCall("The request encountered an error, please try again later.", dispatch)
        }, timeToStop)
        try {
            const response = await GlobalServices.AddToPreferences(productId)
            if (response) {
                clearTimeout(timeoutId)
                if (response.data.code !== 0) {
                    dispatchRemovePreferences()
                    MassageCall("The request encountered an error, please try again later.", dispatch)
                }
            }
        } catch (er) {
            clearTimeout(timeoutId)
            dispatchRemovePreferences()
            MassageCall("The request encountered an error, please try again later.", dispatch)
        }
    })
    const [removeFromCart, isLoadingRemove, errRemove] = useFetching(async () => {
        const timeoutId = setTimeout(() => {
            dispatchAddPreferences()
            MassageCall("The request encountered an error, please try again later.", dispatch)
        }, timeToStop)
        try {
            const response = await GlobalServices.RemoveFromPreferences(productId)
            if (response) {
                clearTimeout(timeoutId)
                if (response.data.code !== 0) {
                    dispatchAddPreferences()
                    MassageCall("The request encountered an error, please try again later.", dispatch)
                }
            }
        } catch (er) {
            clearTimeout(timeoutId)
            dispatchAddPreferences()
            MassageCall("The request encountered an error, please try again later.", dispatch)
        }

    })

    const preFetchRemove = () => {
        dispatchRemovePreferences();
        setOverRemove(true)

    }
    const preFetchAdd = () => {
        setOverAdd(true)
        dispatchAddPreferences();
    }
    useEffect(() => {
        if (overRemove) {
            setOverRemove(false)
            removeFromCart()
        }
    }, [overRemove])
    useEffect(() => {
        if (overAdd) {
            setOverAdd(false)
            addTocart()
        }
    }, [overAdd])
    return (
        <div className={props.isInCartTable ? `${cl.item} ${cl.item_isCart}` : cl.item}>
            <div className={props.isInCartTable ? `${cl.item_isCart_hole}` : cl.item_hole}>
                <img className={props.isInCartTable ? `${cl.item_hole_img} ${cl.item_isCart_hole_img}` : cl.item_hole_img} src={`https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg`} alt={productId}></img>
            </div>
            <div className={cl.item_edit}>
                <div className={cl.item_texts}>
                    <div className={cl.item_texts_top}>
                        <p className={cl.item_texts_top_title}>{props.title}</p>
                        <div className={cl.item_texts_top_rate}>
                            <img className={cl.item_texts_top_rate_star} src={colorStar} alt='star'></img>
                            <img className={cl.item_texts_top_rate_star} src={colorStar} alt='star'></img>
                            <img className={cl.item_texts_top_rate_star} src={colorStar} alt='star'></img>
                            <img className={cl.item_texts_top_rate_star} src={colorStar} alt='star'></img>
                            <img className={cl.item_texts_top_rate_star} src={colorStar} alt='star'></img>
                        </div>
                    </div>
                    <p className={cl.item_texts_text}>{props.text}</p>
                </div>
                <div className={cl.item_price}>
                    <div className={cl.item_price_owner}>
                        <div className={cl.item_price_owner_icon}></div>
                        <p className={cl.item_price_owner_name}>Owner</p>
                    </div>
                    <div className={cl.item_price_numbers}>
                        {props.sale_price &&
                            <p className={cl.item_price_numbers_p1}>{props.sale_price}$</p>
                        }
                        <p className={cl.item_price_numbers_p2}>{props.current_price}$</p>
                    </div>
                </div>
                <div className={cl.item_actions}>
                    <StaticButtonUI width='100%' onClick={!props.type_incart ? () => { preFetchAdd() } : () => { preFetchRemove() }} loading={isLoading} dashed={props.type_incart} font_size='0.8em' title={props.type_incart ? "cansel" : "add to cart"} />
                </div>
            </div>
        </div>
    );
}

export default ProductItemInCartCom;