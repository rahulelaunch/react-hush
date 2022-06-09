import axios from 'axios'
import Security from './Security'
import {
    configHeaderAxios,
} from "../helpers/response";

function AxiosMiddleware(method, url, data, options) {
    // if (data.env !== 'touring' && url.search("env=touring") === -1) {
    //     data = (new Security()).encrypt(data);
    // }

    switch (method) {
        case 'get':
            return axios.get(url, { ...options, params: data });
        case 'post':
            return axios.post(url, data, options);
        case 'head':
            return axios.head(url, data, options);
        case 'patch':
            return axios.patch(url, data, options);
        case 'put':
            return axios.put(url, data, options);
        case 'delete':
            return axios.delete(url, { ...options, params: data });
    }
}
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = "token.content";

axios.interceptors.response.use(

    (response) => {
        if (response.data.mac !== undefined) {
            response.data = new Security.decrypt(response.data);
        }

        if (response.status === 204) {
            localStorage.clear();
            window.location.reload();
        }
        return response
    },
    (error) => {

        let errorData = error.response.data;

        if (errorData.mac !== undefined) {
            errorData = new Security.decrypt(errorData);
        }
        return Promise.reject(error);
    }
)


export function callApi(url, data = []) {

    var options = configHeaderAxios();
    return AxiosMiddleware(url[0], process.env.REACT_APP_BASE_URL + url[1], data, options)
}

export function setBearerToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export function setVerifyToken(token) {
    axios.defaults.headers.common['VerifyToken'] = `Bearer ${token}`;
}
export function setLocalizationLanguage(language) {
    axios.defaults.headers.common['X-localization'] = `${language}`;
}
