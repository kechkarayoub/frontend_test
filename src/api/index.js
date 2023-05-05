import axios from "axios";
import {get} from "../storage";

const BASE_URL = "https://frontendtest.free.beeceptor.com";
const api_instance = axios.create({ baseURL: BASE_URL });

export const check_username_exists = username => {
    let token = get("token");
    return api_instance.get(`user_exists/${username}`, {
        Accept: 'application/json',
        headers: {Authorization: "Token " + token},
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
export const sign_up_api = data => {
    let token = get("token");
    return api_instance.post(`add_user/`, data, {
        Accept: 'application/json',
        headers: {Authorization: "Token " + token},
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}
export const sign_in_api = data => {
    let token = get("token");
    return api_instance.post(`get_user/${data.username}/`, data, {
        Accept: 'application/json',
        headers: {Authorization: "Token " + token},
    }).then(res => {
        return res.data;
    }).catch(err => {
        return err;
    });
}