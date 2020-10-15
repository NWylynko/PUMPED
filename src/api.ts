import axios from 'axios'
import { apiEndpoint } from './config'

const instance = axios.create({
  baseURL: apiEndpoint,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const get = async (url: string) => {
  // const response = await instance.get(url)
  const response = await fetch(apiEndpoint + url)

  // const { data } = response
  const data = await response.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

export const getShoes = () => get('shoe')

export const getImage = async (url: string) => {
  // const response = await instance.get(url)
  const response = await fetch(url)

  // console.log(response.headers.get('image-name'))

  // const src = Buffer.from(response.data, 'binary').toString('base64')
  // const name = response.headers

  throw new Error('error')
}