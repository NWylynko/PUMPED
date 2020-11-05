import axios from 'axios'
import { apiEndpoint } from './config'
import type { ShoeWithColours, ShoeWithDetails } from 'PUMPED-api/src/api/shoe/types';
import type { Review } from 'PUMPED-api/src/api/review/types';
import type { Customer, CustomerWithID } from 'PUMPED-api/src/api/customer/types';
import type { partOfOrderItem, OrderItem } from 'PUMPED-api/src/api/order/types';

const instance = axios.create({
  baseURL: apiEndpoint,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const get = async (url: string, CustomerID?: number) => {
  const response = await instance.get(url, { headers: { CustomerID } })

  const { data } = response

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

const post = async (url: string, fields: any, CustomerID?: number) => {
  const response = await instance.post(url, fields, { headers: { CustomerID } } )

  const { data } = response

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

export const getShoes = (): Promise<ShoeWithColours[]> => get('shoe')

export const getShoe = (id: string | number): Promise<ShoeWithDetails> => get(`shoe/${id}`)

export const getReviews = (id: string | number): Promise<Review[]> => get(`review/${id}`)

export const addCustomer = (fields: Customer): Promise<CustomerWithID> => post(`customer`, fields)

export const addToCart = (shoeID: number, CustomerID: number, fields: partOfOrderItem) => post(`cart/add/${shoeID}`, fields, CustomerID)

export const getCart = (CustomerID: number): Promise<OrderItem[]> => get(`/cart`, CustomerID)