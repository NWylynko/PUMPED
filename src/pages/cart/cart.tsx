import React, { useContext, useState } from "react";
import StoreContext from "../../store";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCart, getShoe } from "../../api";
import type { OrderItem } from "PUMPED-api/src/api/order/types";
import { apiEndpoint } from "../../config";
import { Redirect } from "react-router-dom";
import { Loading } from "../../components/loading";

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

  return <Cart />;
};

interface Props {
}

export const Cart = (props: Props): JSX.Element => {

  const { isLoading, error, data } = useQuery(`cart`, () =>
    getCart()
  );

  if (isLoading) {
    return <Loading />;
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
    return <Loading />;
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
