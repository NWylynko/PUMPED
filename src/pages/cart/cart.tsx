import React, { useContext, useState } from "react";
import StoreContext from "../../store";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCart, getShoe } from "../../api";
import type { CustomerWithID } from "PUMPED-api/src/api/customer/types";
import type { OrderItem } from "PUMPED-api/src/api/order/types";
import { apiEndpoint } from "../../config";
import { Redirect } from "react-router-dom";

export const CheckCustomerID = () => {
  const { customer } = useContext(StoreContext);

  if (!customer) {
    return (
      <Page>
        <h2>Cart</h2>
        <p>no customer id</p>
      </Page>
    );
  }

  return <Cart customer={customer} />;
};

interface Props {
  customer: CustomerWithID;
}

export const Cart = ({ customer }: Props): JSX.Element => {

  const { isLoading, error, data } = useQuery(`cart ${customer.ID}`, () =>
    getCart(customer.ID)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (data?.length === 0 || !data) {
    return (
      <Page>
        <h2>Cart</h2>
        <p>The cart is empty</p>
      </Page>
    );
  }

  return (
    <Page>
      <h2>Cart</h2>
      <Shoes data={data} />
    </Page>
  );
};

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Shoes = ({ data }: {data: OrderItem[] }) => {
  return ( <>{data.map(Shoe)}</> )
}

const Shoe = ({ ShoeID, StockID, quantity }: OrderItem) => {
  const [redirect, setRedirect] = useState('');

  const { isLoading, error, data } = useQuery(`shoe ${ShoeID}`, () =>
    getShoe(ShoeID)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (!data) {
    return <p>shoe doesnt exist</p>;
  }

  if (redirect) {
    return <Redirect to={redirect}/>
  }

  return (
    <Container onClick={() => setRedirect(`/shoe/${ShoeID}`)}>
      <SmallImage src={`${apiEndpoint}image/${data.CoverImage}/low`} />
      <p>{data.Name}</p>
      <p>quantity: {quantity}</p>
      <p>${data.Price}</p>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  width: 500px;
  justify-content: space-between;
`;

const SmallImage = styled.img`
  height: 60px;
  width: 60px;

  object-fit: cover;

  padding: 2px;
  margin: 2px;
`;
