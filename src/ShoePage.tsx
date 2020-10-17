import React from "react";
import { useParams } from "react-router-dom";

export function ShoePage() {
  let { id }: { id: string; } = useParams();

  return <h2>{id}</h2>;
}
