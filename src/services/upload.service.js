import axiosClient from "./axiosClient"
import { UPLOAD_IMAGE_ENDPOINT } from "./endpoint"

export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return axiosClient.post(UPLOAD_IMAGE_ENDPOINT, formData)
  }
}
