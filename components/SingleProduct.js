import Head from "next/head";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import DisplayError from "./ErrorMessage";
import { gql } from "graphql-tag";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;
  console.log("This is the console logged data", data);
  const { product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.photo?.altText}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}
