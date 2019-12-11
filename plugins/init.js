import axios from 'axios'
import cookies from 'js-cookie'
import { setAuthToken, resetAuthToken } from '~/plugins/auth'

axios.defaults.baseURL = 'https://pushbots-fend-challenge.herokuapp.com/'

const token = cookies.get('token')

if (token) setAuthToken(token)
else resetAuthToken()
