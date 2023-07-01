import axios from 'axios'

const Http = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    Accept: 'application/json'
  }
})

export default Http
