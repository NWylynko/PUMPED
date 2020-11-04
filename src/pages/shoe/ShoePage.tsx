import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getShoe } from "../../api";
import type { ShoeColour } from 'PUMPED-api/src/api/colour/types';
import type { ShoeWithColours as ShoeProps } from "PUMPED-api/src/api/shoe/types";
import { apiEndpoint } from '../../config'
import styled from 'styled-components'

export function ShoePage() {
  let { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery(`shoe ${id}`, () => getShoe(id));

  useEffect(() => {
    console.log(data);
  }, [data])

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
  Stars,
  Brand,
  BrandIcon,
  colours,
}: ShoeProps) {
  return (
    <Page>
      <Images colours={colours} />
      <p>Name: {Name}</p>
      <p>Brand: {Brand}</p>
      <p>Price: ${Price}</p>
      <p>Description: {Description}</p>
      <p>releaseDate: {new Date(releaseDate).toString()}</p>
      <p>CoverImage: {CoverImage}</p>
      <p>Style: {Style}</p>
      <p>Section: {Section}</p>
      <p>Collection: {Collection}</p>
      <p>Stars: {Stars}</p>
      <p>BrandIcon: {BrandIcon}</p>
    </Page>
  );
}

const Page = styled.div`
  min-height: calc(101vh - 300px);
`;

interface ImageProps {
  colours: ShoeColour[];
}

const Images = ({ colours = [] }: ImageProps) => {

  return (
    <div>
      {colours.map(({ImageID}) => <Image src={`${apiEndpoint}image/${ImageID}/medium`} />)}
    </div>
  )
}

const Image = styled.img`
  max-width: 300px;
`;