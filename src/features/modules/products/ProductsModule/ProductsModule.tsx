import React, { useContext, useEffect, useState } from 'react'
import Content from '../../../universalCom/Content';
import ProductsTableCom from '../../../components/tables/productsTable/ProductsTableCom';
import ProductItemCom from '../../../ui/items/ProductItemCom';
import { ProductType } from '../../../../types/ProductType';
import useFetching from '../../../hooks/useFetching';
import GlobalServices from '../../../API/global/GlobalServices';
import ButtonUI from '../../../ui/buttons/ButtonUI';
import useSelected from '../../../hooks/useSelectedProducts';
import { useSelector, useDispatch } from 'react-redux';
import { PreferencesContext, ProductsContext } from '../../../../Router';

function ProductsModule() {
    const dispatch = useDispatch()
    const preferences = useSelector((item: any) => item.preferences.preferences_list)
    const products = useSelector((item: any) => item.products.products_list)
    const access = useSelector((item: any) => item.verifedToken.verifed_token)

    const getProductsList = useContext(ProductsContext)
    const [sort, data] = useSelected()
    useEffect(() => {
        if (preferences && products && products !== null) {
            sort(products, preferences)
        }
        if (products && access == "False") {
            sort(products, [])
        }
    }, [products, preferences])
    useEffect(() => {
        getProductsList()
    }, [])
    return (
        <Content>
            <ProductsTableCom
                loading={data == null ? true : false}
                data={data as ProductType[]}
                render={(item: ProductType) =>
                    <ProductItemCom
                        key={item.product_Id}
                        product_id={`${item.product_Id}`}
                        type_incart={item.selected}
                        title={item.title}
                        text={item.text}
                        user_login={item.user_Id}
                        current_price={item.current_Price}
                        rate={item.rate}
                    />}
            />
        </Content>
    );
}

export default ProductsModule;