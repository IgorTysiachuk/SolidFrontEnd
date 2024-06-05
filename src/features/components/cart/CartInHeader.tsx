import React, { useState } from 'react'

import cl from './cart.module.scss'
import cart from '../../../images/svg/cart.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addPreference } from '../../../store/reducers/preferences';
import ButtonUI from '../../ui/buttons/ButtonUI';
import { ProductType } from '../../../types/ProductType';
import crossSvg from '../../../images/svg/close.svg'
import ProductItemCom from '../../ui/items/ProductItemCom';
import WarningTitle from '../../ui/warning/title';
import ProductItemInCartCom from '../../ui/items/ProductItemInCartCom';



function CartInHeader() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const preferences = useSelector((item: any) => item.preferences.preferences_list)
    return (
        <div className={cl.cart}>
            <p onClick={() => { setIsOpen(!isOpen) }} className={cl.cart_title}>Cart</p>
            <div onClick={() => { setIsOpen(!isOpen) }} className={cl.cart_icon}>
                <img src={cart}></img>
                <div className={cl.cart_icon_counter}>{preferences && (preferences.length !== 0 ? preferences.length : "-")}</div>
            </div>
            {isOpen &&
                <div className={cl.cart_table}>
                    <p className={cl.cart_table_title}>Preferences</p>
                    <div className={cl.cart_table_line}></div>
                    <div className={cl.cart_table_place}>
                        {/* {preferences.map((item: any) => <Item data={item} key={item.product_id} />)} */}
                        {preferences && preferences.length == 0 && <WarningTitle title='Nothing' />}
                        {preferences.map((item: ProductType) => <ProductItemCom
                            key={item.product_Id}
                            product_id={`${item.product_Id}`}
                            type_incart={true}
                            title={item.title}
                            text={item.text}
                            user_login={item.user_Id}
                            current_price={item.current_Price}
                            rate={item.rate}
                            isInCartTable

                        />)}
                    </div>
                    <div className={cl.cart_table_line}></div>
                    <div className={cl.cart_table_bottom}>
                        <ButtonUI title='buy' />
                    </div>
                    <button onClick={() => { setIsOpen(false) }} className={cl.cart_table_cross}>
                        <img className={cl.cart_table_cross_img} src={crossSvg} alt='cross'></img>
                    </button>
                </div>
            }

        </div >
    );
}

export default CartInHeader;