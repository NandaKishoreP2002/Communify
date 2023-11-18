import axios from 'axios'
// const BASE_URL = "http://localhost:8080/" 
const BASE_URL = process.env.REACT_APP_API_URL+"/"


export const register = async ({ name, email, password, handleRegisterSuccess, handleRegisterFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}user/register`, {
            name,
            email,
            password
        })
        console.log('inside register ', result);
        if (result?.data?.name) {
            return handleRegisterSuccess()
        }
        
        handleRegisterFailure('Registration failed')
    } catch (error) {
        console.error('register ', error);
        handleRegisterFailure(error?.response?.data?.error)
    }
}

export const login = async ({ email, password, handleLoginSuccess, handleLoginFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}user/login`, { email, password })
        if (result?.data?.token) {
            return handleLoginSuccess(result.data)
        }
        console.log('login ', result);
    } catch (error) {
        console.error('login ', error);
        handleLoginFailure(error?.response?.data?.error)
    }
}


export const sendEmail = async ({ from, to, subject, message, handleEmailSuccess, handleEmailFailure }) => {
    try {
        const result = await axios.post(`${BASE_URL}compose/sendemail`, {
            from,
            to,
            subject,
            message
        })
        if (result) {
            return handleEmailSuccess()
        }
        console.log('result in email', result);
        handleEmailFailure('Email failed')
    } catch (error) {
        console.error('register ', error);
        handleEmailFailure(error?.response?.data?.error)
    }
}