import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { addToCart, getShoe } from "../../api";
import type { ShoeWithDetails as ShoeProps } from "PUMPED-api/src/api/shoe/types";
import { apiEndpoint } from "../../config";
import styled from "styled-components";
import { Stars } from "../../components/Stars";
import { Images } from "./Images";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Reviews from './reviews'
import StoreContext from '../../store'

export function ShoePage() {
  let { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery(`shoe ${id}`, () => getShoe(id));

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (!data) {
    return <p>Shoe Not Found</p>;
  }

  return <Shoe {...data} />;
}

function Shoe({
  Name,
  Description,
  Price,
  releaseDate,
  ID,
  CoverImage,
  Style,
  Section,
  Collection,
  Stars: stars,
  Brand,
  BrandIcon,
  colours,
  stock
}: ShoeProps) {

  const { customer } = useContext(StoreContext);

  return (
    <Page>
      <Header>
        <Horizontal>
          <IconImage src={`${apiEndpoint}image/${BrandIcon}/low`} />
          <Title>{Name}</Title>
        </Horizontal>

        <Stars n={stars} white />
        <StyledPriceText>${Price}</StyledPriceText>
      </Header>
      <Body>
        <Images colours={colours} CoverImage={CoverImage} />
        <BodyText>
          <Text>Brand: {Brand}</Text>
          <Text>Description: {Description}</Text>
          <Text>Style: {Style}</Text>
          <Text>Section: {Section}</Text>
          <Text>Collection: {Collection}</Text>
          <button onClick={() => {
            if (customer) {
              addToCart(ID, { StockID: stock[0].ID, quantity: 1 })
            }
          }}>Add to Cart</button>
          <button>
            Add to Wishlist{" "}
            {false ? (
              <AiFillStar color="white" />
            ) : (
              <AiOutlineStar color="white" />
            )}
          </button>
        </BodyText>
      </Body>
      <Reviews shoeID={ID} />
    </Page>
  );
}

const Page = styled.div`
  min-height: calc(101vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  width: 100%;
  max-width: 900px;
`;

const Horizontal = styled.div`
  display: inline-flex;
`;

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  margin: 10px;
  padding: 10px;
  filter: invert(1);
`;

export const Title = styled.h2`
  margin: 10px;
  padding: 10px;

  font-family: "Fugaz One", cursive;
`;

export const StyledPriceText = styled.h3`
  margin: 10px;
  padding: 10px;

  font-family: "Anton", sans-serif;
`;

const BodyText = styled.div`
  max-width: 400px;
  padding: 10px;
  margin: 10px;
`;

const Text = styled.p`
  margin: 10px;
  padding: 10px;
`;