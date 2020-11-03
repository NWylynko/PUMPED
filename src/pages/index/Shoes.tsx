import React, { useState, useEffect } from 'react'

import { ShoeWithColours } from 'PUMPED-api/src/api/shoe/types'
import { ShoeColour } from 'PUMPED-api/src/api/colour/types'
import styled from 'styled-components'
import { apiEndpoint } from '../../config'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


export const Shoes = ({ data }: { data: ShoeWithColours[] }) => {

  useEffect(() => {
    console.log(data)
  }, [data])



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

const Shoe = ({ Name, Price, ID, CoverImage, Brand, colours, BrandIcon, Stars: stars }: ShoeWithColours) => {
  
  const [ imageID, setImageID ] = useState(CoverImage)

  return (
    <ShoeContainer key={ID} to={encodeURI(`/shoe/${ID}`)}>
      <ShoeText>
      <Horizontal>
        <IconImg ImageID={BrandIcon} />
        <Stars n={stars}/>
        <p style={{ color: 'black', margin: 10, padding: 10 }}>${Price}</p>
      </Horizontal>
      <div>
        <p style={{ color: 'black', textAlign: 'center', marginTop: 20 }}>{Name}</p>
        <Colours colours={colours} setImageID={setImageID} />
      </div>
      </ShoeText>
      <CoverImg ImageID={imageID} />
    </ShoeContainer>
  )
}

const ShoeContainer = styled(Link)`
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

const ShoeText = styled.div`
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 300px;
`;

const Colours = ({ colours, setImageID }: { colours: ShoeColour[], setImageID: (n: number) => void }) => {
  return (
    <ColoursContainer>
      {colours.map((props, index) => <HoverColourCircle colour={props} key={index} setImageID={setImageID} />)}
    </ColoursContainer>
  )
}

const ColoursContainer = styled.div`
  display: inline-flex;
  width: 280px;
  justify-content: space-evenly;
  margin: 10px;
`;

const HoverColourCircle = ( {colour, setImageID}: {colour: ShoeColour, setImageID: (n: number) => void }) => {
  return <ColourCircle {...colour} onMouseEnter={() => setImageID(colour.ImageID)} />
}

const ColourCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid white;
  background-color: ${({hex}: ShoeColour) => hex};

  &:hover {
    border-color: ${({hex}: ShoeColour) => hex};
  }
`;

const IconImg = ({ ImageID }: { ImageID: string | number }) => {

  const url = `${apiEndpoint}image/${ImageID}/low`

  return <IconImage src={url} />
}

const IconImage = styled.img`
  height: 30px;
  width: 30px;
  object-fit: cover;
  padding: 10px;
  margin: 10px;
`;

const CoverImg = ({ ImageID }: { ImageID: number }) => {

  const url = `${apiEndpoint}image/${ImageID}/medium`

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

const Stars = ({n}: {n:number}) => {
  return (
    <StarContainer>
      {n >= 1 ? <AiFillStar color="black" /> : <AiOutlineStar color="black" />}
      {n >= 2 ? <AiFillStar color="black" /> : <AiOutlineStar color="black" />}
      {n >= 3 ? <AiFillStar color="black" /> : <AiOutlineStar color="black" />}
      {n >= 4 ? <AiFillStar color="black" /> : <AiOutlineStar color="black" />}
      {n >= 5 ? <AiFillStar color="black" /> : <AiOutlineStar color="black" />}
    </StarContainer>
  )
}

const StarContainer = styled.div`
  margin: 10px;
  padding: 10px;
`;