import axiosClient from "./axiosClient"
import { PARTNER_ENDPOINT } from "./endpoint"

export const partnerService = {
  getPartners: (params) => {
    // TODO('Not yet implemented' )
    console.log(params)
    return axiosClient.get(PARTNER_ENDPOINT+"/explore", {
      params
    })
  }
}
