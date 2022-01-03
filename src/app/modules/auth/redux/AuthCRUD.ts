import axios from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = 'http://103.58.166.106:8004/api'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/get-user`
export const LOGIN_URL = `${API_URL}/userlogin`
export const REGISTER_URL = `${API_URL}/auth/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/verifyforgotemail`
export const OTP_VERIFICATION = `${API_URL}/verifyforgototp`
export const FORGOT_PASSWORD = `${API_URL}/forgotpassword`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {email, password})
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    firstname,
    lastname,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: any}>(REQUEST_PASSWORD_URL, {email})
}

// Server should return object => { result: boolean } (Is Email in DB)
export function optVerification(request_id: any, otp: any ) {
  return axios.post<{result: any}>(OTP_VERIFICATION, {request_id,otp})
}

// Server should return object => { result: boolean } (Is Email in DB)
export function forgotPassword(new_password: any, confirm_password: any, id: any ) {
  return axios.post<{result: any}>(FORGOT_PASSWORD, {new_password,confirm_password, id})
}


export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}


