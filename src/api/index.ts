import axios from 'axios'

export const Server = axios.create({
  baseURL: '/api/',
})

export const addAccessTokenToServer = (access: string) => {
  Server.defaults.headers.common.Authorization = `Bearer ${access}`
  localStorage.setItem('accessToken', access)
}

export const fetcher = (url: string) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    Server.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  console.log(Server.defaults.headers.common.Authorization)
  return Server.get(url).then((res) => res.data)
}
