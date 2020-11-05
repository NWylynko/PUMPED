import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

export function Stars({ n, white, style }: { n: number; white?: boolean, style?: React.CSSProperties }) {

  const colour = white ? "white" : "black"

  return (
    <StarContainer style={style}>
      {n >= 1 ? <AiFillStar color={colour} /> : <AiOutlineStar color={colour} />}
      {n >= 2 ? <AiFillStar color={colour} /> : <AiOutlineStar color={colour} />}
      {n >= 3 ? <AiFillStar color={colour} /> : <AiOutlineStar color={colour} />}
      {n >= 4 ? <AiFillStar color={colour} /> : <AiOutlineStar color={colour} />}
      {n >= 5 ? <AiFillStar color={colour} /> : <AiOutlineStar color={colour} />}
    </StarContainer>
  );
}

const StarContainer = styled.div`
  margin: 10px;
  padding: 10px;
`;