import axios from 'axios'
import { apiEndpoint } from './config'
import type { BrandWithID, Brand, partOfBrand, partOfBrandWithID } from 'PUMPED-api/src/api/brand/types';
import type { removedCartItem, clearedCart } from 'PUMPED-api/src/api/cart/types';
import type { ShoeWithColours, ShoeWithDetails } from 'PUMPED-api/src/api/shoe/types';
import type { Review } from 'PUMPED-api/src/api/review/types';
import type { Customer, CustomerWithID } from 'PUMPED-api/src/api/customer/types';
import type { partOfOrderItem, OrderItem, partOfOrderItemWithIDs } from 'PUMPED-api/src/api/order/types';

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

const x = {
  get: async (url: string) => {
    const response = await instance.get(url)
  
    const { data } = response
  
    if (data.error) {
      throw new Error(data.error)
    }
  
    return data.data
  },
  post: async (url: string, fields: any) => {
    const response = await instance.post(url, fields )
  
    const { data } = response
  
    if (data.error) {
      throw new Error(data.error)
    }
  
    return data.data
  },
  patch: async (url: string, fields: any) => {
    const response = await instance.patch(url, fields )
  
    const { data } = response
  
    if (data.error) {
      throw new Error(data.error)
    }
  
    return data.data
  },
  delete: async (url: string) => {
    const response = await instance.delete(url)
  
    const { data } = response
  
    if (data.error) {
      throw new Error(data.error)
    }
  
    return data.data
  }
}

// brand
export const getBrand = (BrandID: number | string): Promise<BrandWithID> => x.get(`brand/${BrandID}`)
export const addBrand = (fields: Brand): Promise<Brand> => x.post(`brand`, fields)
export const updateBrand = (BrandID: number | string, fields: partOfBrand): Promise<partOfBrandWithID> => x.patch(`brand/${BrandID}`, fields)
export const removeBrand = (BrandID: number | string): Promise<{BrandID: number}> => x.delete(`brand/${BrandID}`)

//cart
export const getCart = (): Promise<OrderItem[]> => x.get(`/cart`)
export const addToCart = (ShoeID: number | string, fields: partOfOrderItem) => x.post(`cart/add/${ShoeID}`, fields)
export const checkoutCart = (address: string): Promise<{ CustomerID: number; OrderID: number; }> => x.post(`cart/checkout`, { address })
export const updateCart = (ShoeID: number | string, fields: partOfOrderItem): Promise<partOfOrderItemWithIDs> => x.patch(`cart/${ShoeID}`, fields)
export const removeCartItem = (ShoeID: number | string): Promise<removedCartItem> => x.delete(`cart/${ShoeID}`)
export const clearCart = (): Promise<clearedCart> => x.delete(`cart`)

export const getShoes = (): Promise<ShoeWithColours[]> => x.get('shoe')

export const getShoe = (id: string | number): Promise<ShoeWithDetails> => x.get(`shoe/${id}`)

export const getReviews = (id: string | number): Promise<Review[]> => x.get(`review/${id}`)

export const addCustomer = async (fields: Customer): Promise<CustomerWithID> => { 
  const CustomerDetails = await x.post(`customer`, fields) 

  setCustomerIDHeader(CustomerDetails.ID)

  return CustomerDetails
}

