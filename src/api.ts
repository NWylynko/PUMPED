import axios from 'axios'
import { apiEndpoint } from './config'
import type { BrandWithID, Brand, partOfBrand, partOfBrandWithID } from             'PUMPED-api/src/api/brand/types';
import type { removedCartItem, clearedCart, AddedToCart } from                      'PUMPED-api/src/api/cart/types';
import type { Collection, CollectionWithID } from                                   'PUMPED-api/src/api/collection/types';
import type { Colour, ColourWithID, partOfColour, updatedColour, addedColour } from 'PUMPED-api/src/api/colour/types';

import type { ShoeWithColours, ShoeWithDetails } from                               'PUMPED-api/src/api/shoe/types';
import type { Review } from                                                         'PUMPED-api/src/api/review/types';
import type { Customer, CustomerWithID } from                                       'PUMPED-api/src/api/customer/types';
import type { partOfOrderItem, OrderItem, partOfOrderItemWithIDs } from             'PUMPED-api/src/api/order/types';

import type { WishListWithShoe, WishList } from 'PUMPED-api/src/api/wishlist/types'

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
      console.log(data.error)
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
export const getBrand =         (BrandID: number | string):                           Promise<BrandWithID>                                          => x.get(`brand/${BrandID}`)
export const addBrand =         (fields: Brand):                                      Promise<Brand>                                                => x.post(`brand`, fields)
export const updateBrand =      (BrandID: number | string, fields: partOfBrand):      Promise<partOfBrandWithID>                                    => x.patch(`brand/${BrandID}`, fields)
export const removeBrand =      (BrandID: number | string):                           Promise<{BrandID: number}>                                    => x.delete(`brand/${BrandID}`)

//cart
export const getCart =          ():                                                   Promise<OrderItem[]>                                          => x.get(`cart`)
export const addToCart =        (ShoeID: number | string, fields: partOfOrderItem):   Promise<AddedToCart>                                          => x.post(`cart/add/${ShoeID}`, fields)
export const checkoutCart =     (address: string):                                    Promise<{ CustomerID: number; OrderID: number; }>             => x.post(`cart/checkout`, { address })
export const updateCart =       (ShoeID: number | string, fields: partOfOrderItem):   Promise<partOfOrderItemWithIDs>                               => x.patch(`cart/${ShoeID}`, fields)
export const removeCartItem =   (ShoeID: number | string):                            Promise<removedCartItem>                                      => x.delete(`cart/${ShoeID}`)
export const clearCart =        ():                                                   Promise<clearedCart>                                          => x.delete(`cart`)

//collection
export const getCollection =    (CollectionID: number | string):                      Promise<CollectionWithID>                                     => x.get(`collection/${CollectionID}`)
export const addCollection =    (fields: Collection):                                 Promise<{ name: string; }>                                    => x.post(`collection`, fields)
export const updateCollection = (CollectionID: number | string, fields: Collection):  Promise<{ name?: string | undefined; CollectionID: number; }> => x.patch(`collection/${CollectionID}`, fields)
export const removeCollection = (CollectionID: number | string):                      Promise<{ CollectionID: number; }>                            => x.delete(`collection/${CollectionID}`)

//colour
export const getColour =        (ColourID: number | string):                          Promise<ColourWithID>                                         => x.get(`colour/${ColourID}`)
export const addColour =        (fields: Colour):                                     Promise<addedColour>                                          => x.post(`colour`, fields)
export const updateColour =     (ColourID: number | string, fields: partOfColour):    Promise<updatedColour>                                        => x.patch(`colour/${ColourID}`, fields)
export const removeColour =     (ColourID: number | string):                          Promise<{ ColourID: number; }>                                => x.delete(`colour/${ColourID}`)

//customer
export const addCustomer = async (fields: Customer): Promise<CustomerWithID> => { 
  const CustomerDetails = await x.post(`customer`, fields) 

  setCustomerIDHeader(CustomerDetails.ID)

  return CustomerDetails
}

//image

//order

//review
export const getReviews = (id: string | number): Promise<Review[]> => x.get(`review/${id}`)

//section

//shoe
export const getShoes = (): Promise<ShoeWithColours[]> => x.get('shoe')
export const getShoe = (id: string | number): Promise<ShoeWithDetails> => x.get(`shoe/${id}`)

//stock

//style

//tag

//wishlist
export const getWishlist = (): Promise<{ ShoeID: number; }[]> => x.get(`wishlist`)
export const isInWishlist = (ShoeID: string | number): Promise<boolean> => x.get(`wishlist/${ShoeID}`)
export const addToWishlist = (ShoeID: string | number): Promise<WishListWithShoe> => x.post(`wishlist/${ShoeID}`, {})
export const removeFromWishlist = (ShoeID: string | number): Promise<WishListWithShoe> => x.delete(`wishlist/${ShoeID}`)
export const clearWishlist = (): Promise<WishList> => x.delete(`wishlist`)