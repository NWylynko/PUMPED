import React, { createContext, useState } from "react";
import type { CustomerWithID } from 'PUMPED-api/src/api/customer/types';
import { setCustomerIDHeader } from './api'

interface Istore {
  customer?: CustomerWithID;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerWithID | undefined>>
}

const StoreContext = createContext({} as Istore);
export default StoreContext;

export function StoreProvider({
  children,
  TestValues,
}: {
  children: React.ReactNode;
  TestValues?: Istore;
}): JSX.Element {

  const storageCustomer = localStorage.getItem('customer')

  const ParsedStoreCustomer: CustomerWithID | undefined = storageCustomer ? JSON.parse(storageCustomer) : undefined

  if (ParsedStoreCustomer) {
    setCustomerIDHeader(ParsedStoreCustomer.ID)
  }

  const [customer, setCustomer] = useState<CustomerWithID | undefined>(ParsedStoreCustomer)

  const store: Istore = {
    customer, setCustomer
  };

  return (
    <StoreContext.Provider value={store as Istore}>
      {children}
    </StoreContext.Provider>
  );
}