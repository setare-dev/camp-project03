import axios from 'axios'
import swal from '../modules/SwalAlert'
import {AXIOS_ERROR} from '../constants/responses'

const baseURL = 'https://6284ab5d6b6c317d5ba7737c.endapi.io'

const instance = axios.create({baseURL, timeout: 5000})

//Ready to use if needed
//instance.interceptors.request.use(config => config, error => Promise.reject(error))
instance.interceptors.response.use(config => config, async error => {
    console.log(error)
    await axios.post(`${baseURL}/log`, {text: error})
    swal.toast('error', AXIOS_ERROR)
    return Promise.reject({code: 900})
})

export default instance