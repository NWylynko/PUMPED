import React, { useContext, useState, useEffect } from "react";
import StoreContext from "../../store";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCart, getShoe } from "../../api";
import type { OrderItem } from "PUMPED-api/src/api/order/types";
import { apiEndpoint } from "../../config";
import { Loading } from "../../components/loading";
import { Link } from "react-router-dom";

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

interface Props {}

export const Cart = (props: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<OrderItem[]>();

  useEffect(() => {
    const run = async () => {
      try {
        const cart = await getCart();
        setData(cart);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

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

  const total = data.reduce(
    (sum, { currentPrice, quantity }) => sum + currentPrice * quantity,
    0
  );

  return (
    <Page>
      <h2>Cart</h2>
      <Shoes data={data} />
      <TotalContainer>
        <Total>Total ${total}</Total>
      </TotalContainer>
      <ButtonContainer>
        <button>Clear the cart</button>
        <button>Checkout</button>
      </ButtonContainer>
    </Page>
  );
};

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Total = styled.p`
  width: 700px;
  text-align: end;
  margin: 2px;
  padding: 10px;
  border-radius: 5px;

  background-color: #131212;
`;

const TotalContainer = styled.div`
  margin: 10px;
  background: linear-gradient(to right, #131212, #131212, #131212, white);
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  /* align-items: center; */
`;

const Shoes = ({ data }: { data: OrderItem[] }) => {
  return <>{data.map(Shoe)}</>;
};

const Shoe = ({ ShoeID, StockID, quantity }: OrderItem) => {
  const { isLoading, error, data } = useQuery(`shoe ${ShoeID}`, () =>
    getShoe(ShoeID)
  );

  if (isLoading) {
    return <Loading key={ShoeID} />;
  }

  if (error) {
    return <p key={ShoeID}>error</p>;
  }

  if (!data) {
    return <p key={ShoeID}>shoe doesnt exist</p>;
  }

  return (
    <Container key={ShoeID}>
      <SmallImage src={`${apiEndpoint}image/${data.CoverImage}/low`} />
      <NameLink to={`/shoe/${ShoeID}`}>
        <Name>{data.Name}</Name>
      </NameLink>
      <p>Quantity {quantity}</p>
      <p>${data.Price}</p>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  width: 700px;
  justify-content: space-between;
  text-decoration: none;
  align-items: center;
`;

const SmallImage = styled.img`
  height: 60px;
  width: 60px;

  object-fit: cover;

  padding: 2px;
  margin: 2px;
`;

const Name = styled.h3`
  min-width: 400px;
`;

const NameLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
