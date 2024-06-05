import axios from 'axios'
import React from 'react'
import { url } from '../../constants/urls'

export default class AuthServices {
    static async Login(data: any) {
        const response = await axios({
            method: "post",
            url: `${url}/api/login`,
            data: data
        })
        return response
    }
    static async Register(data: any) {
        const response = await axios({
            method: "post",
            url: `${url}/api/register`,
            data: data
        })
        return response
    }
}