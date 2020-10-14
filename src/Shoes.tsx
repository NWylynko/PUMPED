import React from 'react'
import { useQuery } from "react-query";
import { getShoes } from './api'
import { ShoeWithColours } from 'PUMPED-api/src/api/shoe/types'
import { basicColour } from 'PUMPED-api/src/api/colour/types'
import styled from 'styled-components'

export const Shoes = () => {

  const { isLoading, error, data } = useQuery("shoes", getShoes);

  // console.log(data)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>error</p>
  }

  return (<Grid>{data.map(Shoe)}</Grid>)
}

const Grid = styled.main`
  display: grid;
  grid-template-columns: auto auto auto;

  @media (max-width: 960px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: 650px) {
    grid-template-columns: auto;
  }
`;

const Shoe = ({ Name, Price, ID, CoverImage, Brand, colours }: ShoeWithColours) => {
  return (
    <ShoeContainer key={ID}>
      <CoverImg ImageID={CoverImage} />
      <Horizontal>
        <p>{Brand}</p>
        <p><b>{Name}</b></p>
        <p>${Price}</p>
      </Horizontal>
      <Colours colours={colours} />
    </ShoeContainer>
  )
}

const ShoeContainer = styled.div`
  margin: 10px;
  padding: 10px;
  max-width: 300px;
`;

const Horizontal = styled.div`
  width: 300px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 4px;
  margin-bottom: 4px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const Colours = ({ colours }: { colours: basicColour[] }) => {
  return (
    <ColoursContainer>
      {colours.map((props, index) => <ColourCircle {...props} key={index} />)}
    </ColoursContainer>
  )
}

const ColoursContainer = styled.div`
  display: inline-flex;
  width: 100%
`;

const ColourCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({hex}: basicColour) => hex};
`;

const CoverImg = ({ ImageID }: { ImageID: number }) => {

  const url = `http://localhost:5000/image/${ImageID}/low`

  // const { isLoading, error, data } = useQuery("shoes", () => getImage(url));

  // if (isLoading) {
  //   return null;
  // }

  // if (error) {
  //   return null;
  // }

  // const { name, src } = data

  return <Image src={url} alt={''} />

  // return null
}

const Image = styled.img`
  width: 300px;
  height: 300px;

  object-fit: cover;

`;