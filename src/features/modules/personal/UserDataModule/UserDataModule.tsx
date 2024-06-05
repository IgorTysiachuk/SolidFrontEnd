import React, { useContext, useEffect, useState } from 'react'
import Content from '../../../universalCom/Content'
import Chapter from '../../../ui/titles/chapter';
import ProductsTableCom from '../../../components/tables/productsTable/ProductsTableCom';
import useFetching from '../../../hooks/useFetching';
import GlobalServices from '../../../API/global/GlobalServices';
import { useParams } from 'react-router-dom';
import { ProductType, UserType } from '../../../../types/ProductType';
import ProductItemCom from '../../../ui/items/ProductItemCom';
import LoaderAnimation from '../../../animations/ui/loaders/LoaderAnimation';
import Block from '../../../universalCom/Block';
import { PreferencesContext, ProductsContext } from '../../../../Router';
import useSelected from '../../../hooks/useSelectedProducts';
import { useSelector } from 'react-redux';

interface Params {
    userId: string;
}


function UserDataModule() {
    const { userId } = useParams<string>();
    const preferences = useSelector((item: any) => item.preferences.preferences_list)
    const [products, setproducts] = useState<(ProductType[] | null)>(null);
    const [user, setuser] = useState<(UserType | null)>(null);
    const access = useSelector((item: any) => item.verifedToken.verifed_token)
    const [fetch, loading, err] = useFetching(async () => {
        if (userId) {
            const response = await GlobalServices.GetUserData(userId)
            if (response.data) {
                switch (response.data.code) {
                    case 0:
                        setproducts(response.data.result.products)
                        setuser(response.data.result.userData)
                        break
                }
            }
        }
    })

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
        fetch()

    }, []);
    return (
        <Content>
            {user == null ?

                <LoaderAnimation />
                :
                <>
                    <Block title="IgorTysiachuk's profile">
                        <p>123</p>
                        <p>123</p>
                        <p>123</p>
                    </Block>
                    <Block title="Products">
                        <ProductsTableCom loading={data == null ? true : false} data={data as ProductType[]} render={(item: ProductType) => <ProductItemCom
                            key={item.product_Id}
                            product_id={`${item.product_Id}`}
                            type_incart={item.selected}
                            title={item.title}
                            text={item.text}
                            user_login={item.user_Id}
                            current_price={item.current_Price}
                            rate={item.rate}
                            products_list={products}

                        />} />
                    </Block>
                </>
            }
        </Content>
    );
}

export default UserDataModule;