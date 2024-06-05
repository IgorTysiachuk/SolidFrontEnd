import React from 'react'

import cl from './productsTable.module.scss'

import loading_color from '../../../../images/svg/loading-color.svg'
import { ProductType } from '../../../../types/ProductType';
import WarningTitle from '../../../ui/warning/title';

interface Props {
    render: (item: ProductType) => React.ReactNode,
    data: ProductType[] | null,
    loading?: boolean
}

function SkeletonItem() {
    return (
        <div className={cl.skeleton_item}>
            <div className={cl.skeleton_item_img}></div>
            <div className={cl.skeleton_item_title}></div>
            <div className={cl.skeleton_item_text}></div>
            <div className={cl.skeleton_item_user}></div>
        </div>
    )
}

function ProductsTableCom(props: Props) {
    return (
        <div className={cl.table}>
            {props.loading &&
                <>
                    <SkeletonItem />
                    <SkeletonItem />
                    <SkeletonItem />
                    <SkeletonItem />
                    <SkeletonItem />
                </>
            }
            {!props.loading && props.data !== null && props.data.length == 0 && <WarningTitle title="Products hasn't found" />}
            {!props.loading && props.data && props.data.map((item) => (
                props.render(item)
            ))}
        </div>
    );
}

export default ProductsTableCom;