import React from 'react';
import { Shoes } from './Shoes'
import { useQuery } from "react-query";
import { getShoes } from '../../api'
import { Loading } from '../../components/loading';

function Home() {

  const { isLoading, error, data = [] } = useQuery("shoes", getShoes);

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>error</p>
  }

  return (
      <Shoes data={data} />
  );
}

export default Home;
