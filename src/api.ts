import axios from 'axios'
import { apiEndpoint } from './config'
import { ShoeWithColours } from 'PUMPED-api/src/api/shoe/types';

const instance = axios.create({
  baseURL: apiEndpoint,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const get = async (url: string) => {
  const response = await instance.get(url)

  const { data } = response

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

export const getShoes = (): Promise<ShoeWithColours[]> => get('shoe')

export const getShoe = (id: string): Promise<ShoeWithColours> => get(`shoe/${id}`)
