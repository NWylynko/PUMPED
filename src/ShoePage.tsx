import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getShoe } from "./api";
import type { Shoe as ShoeProps } from "PUMPED-api/src/api/shoe/types";

export function ShoePage() {
  let { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery(`shoe ${id}`, () => getShoe(id));

  console.log(data);

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
}: ShoeProps) {
  return (
    <>
      <p>{Name}</p>
      <p>{Brand}</p>
      <p>${Price}</p>
      <p>{Description}</p>
    </>
  );
}
