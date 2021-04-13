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

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    Post(where: { id: $id }) {
        id
        title
        status
        content
        publishDate
        author 
        tags {
            name
        }
      }
    }
  }
`;

export default function SinglePost({ id }) {
	const { data, loading, error } = useQuery(SINGLE_POST_QUERY, {
		variables: {
			id: id,
		},
	});
	if (loading) return <p>Loading ...</p>;
	if (error) return <DisplayError error={error} />;
	const { Post } = data;
	return (
		<ProductStyles>
			<Head>
				<title>Sick Fits | {Post.title}</title>
			</Head>

			<div className="details">
				<h2>{Post.title}</h2>
				<p>{Post.publishDate}</p>
			</div>
		</ProductStyles>
	);
}
