import React, { createContext, useState } from "react";
import type { CustomerWithID } from 'PUMPED-api/src/api/customer/types';

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

  const [customer, setCustomer] = useState<CustomerWithID>()

  const store: Istore = {
    customer, setCustomer
  };

  return (
    <StoreContext.Provider value={store as Istore}>
      {children}
    </StoreContext.Provider>
  );
}