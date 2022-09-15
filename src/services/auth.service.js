import axiosClient from "./axiosClient"

const route = "oauth"

export const authService = {

    getMessage : (publicAddress) => {
        return axiosClient.get(`/${route}/wallet?language=en&address=${publicAddress}`)
    },

    login : (params) => {
        //: /v1/tron/auth/wallet
        ///v1/oauth/wallet
        return axiosClient.post(`/${route}/wallet`,params)
    },

    loginTron : (params) => {
        //: /v1/tron/auth/wallet
        ///v1/oauth/wallet
        return axiosClient.post(`/tron/auth/wallet`,params)
    },

    loginGoogle : (params) => {
        return axiosClient.post(`${route}/firebase`,params)
    },
    
};
