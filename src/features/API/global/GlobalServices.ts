import React from 'react'
import { url } from '../../constants/urls'
import axios from 'axios'
import { GetTokenSS } from '../../../functions/tokens'

export function RequestHeaders() {
    return {
        "token": GetTokenSS()
    }
}

export default class GlobalServices {
    static async GetProductsList() {
        const response = await axios({
            method: "get",
            url: `${url}/api/products`,
            headers: RequestHeaders()
        })
        return response
    }
    static async GetPreferencesList() {
        const response = await axios({
            method: "get",
            url: `${url}/api/preferences`,
            headers: RequestHeaders()
        })
        return response
    }
    static async AddToPreferences(id: string) {
        const response = await axios({
            method: "post",
            url: `${url}/api/add-to-preferences?product_id=${id}`,
            headers: RequestHeaders()
        })
        return response
    }
    static async RemoveFromPreferences(id: string) {
        const response = await axios({
            method: "delete",
            url: `${url}/api/remove-from-preferences?product_id=${id}`,
            headers: RequestHeaders()
        })
        return response
    }
    static async PostProduct(formData: any) {
        const response = await axios({
            method: "post",
            url: `${url}/api/add-product`,
            data: formData,
            headers: {
                ...RequestHeaders(),
                "Content-Type": "multipart/form-data"
            }
        })
        return response
    }
    static async VerifyToken() {
        const response = await axios({
            method: "get",
            url: `${url}/api/verify-token`,
            headers: RequestHeaders(),
        })
        return response
    }
    static async GetUserData(userId: string) {
        const response = await axios({
            method: "get",
            url: `${url}/api/user/get-data?userId=${userId}`,
            headers: RequestHeaders(),
        })
        return response
    }
}