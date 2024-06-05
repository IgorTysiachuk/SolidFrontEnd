import { useState } from "react"
import { ProductType } from "../../types/ProductType";

type Result = [(item: ProductType[], preferences: ProductType[]) => void, (object[] | null)];

export default function useSelected(): Result {
    const [data, setData] = useState<ProductType[] | null>(null);
    const sort = (array: ProductType[], preferences: ProductType[]) => {
        let newArray: ProductType[] = [];
        if (array.length !== 0) {
            newArray = []
            array.forEach(item => {
                if (preferences.some(pref => pref.product_Id == item.product_Id)) {
                    newArray.push({ ...item, selected: true })
                } else {
                    newArray.push({ ...item, selected: false })
                }

            })
        }
        setData(newArray)
    }

    return [sort, data]
}