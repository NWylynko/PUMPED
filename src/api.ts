import axios from 'axios'
import { apiEndpoint } from './config'
import type { ShoeWithColours, ShoeWithDetails } from 'PUMPED-api/src/api/shoe/types';
import type { Review } from 'PUMPED-api/src/api/review/types';
import type { Customer, CustomerWithID } from 'PUMPED-api/src/api/customer/types';
import type { partOfOrderItem, OrderItem } from 'PUMPED-api/src/api/order/types';

let instance = axios.create({
  baseURL: apiEndpoint,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const setCustomerIDHeader = (CustomerID: number) => {
  instance = axios.create({
    baseURL: apiEndpoint,
    headers: { CustomerID: CustomerID }
  });
}

const get = async (url: string) => {
  const response = await instance.get(url)

  const { data } = response

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

const post = async (url: string, fields: any) => {
  const response = await instance.post(url, fields )

  const { data } = response

  if (data.error) {
    throw new Error(data.error)
  }

  return data.data
}

export const getShoes = (): Promise<ShoeWithColours[]> => get('shoe')

export const getShoe = (id: string | number): Promise<ShoeWithDetails> => get(`shoe/${id}`)

export const getReviews = (id: string | number): Promise<Review[]> => get(`review/${id}`)

export const addCustomer = async (fields: Customer): Promise<CustomerWithID> => { 
  const CustomerDetails = await post(`customer`, fields) 

  setCustomerIDHeader(CustomerDetails.ID)

  return CustomerDetails
}

export const addToCart = (shoeID: number, fields: partOfOrderItem) => post(`cart/add/${shoeID}`, fields)

export const getCart = (): Promise<OrderItem[]> => get(`/cart`)