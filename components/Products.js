import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import styled from "styled-components";
import { perPage } from "../config";
import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $take: Int) {
    # keystone has changed their graphql schemas so that they do not any
    # longer provide a first variable.
    products(skip: $skip, take: $take) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  console.log("This is the console logged page", page);
  console.log("This is the perpage console log", perPage);
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
