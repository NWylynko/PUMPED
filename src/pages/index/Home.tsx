import React from 'react';
import { Shoes } from './Shoes'
import { useQuery } from "react-query";
import { getShoes } from '../../api'

function Home() {

  const { isLoading, error, data = [] } = useQuery("shoes", getShoes);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>error</p>
  }

  return (
      <Shoes data={data} />
  );
}

export default Home;
