import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { useRouter } from "next/router";

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

export default function SignIn() {
	const router = useRouter();

	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
	});
	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		//refeatch the currently logged user
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting
		console.log(inputs);
		const res = await signin();
		console.log(res);
		resetForm();
		// router.push("/products");

		// Send the email and password to the graphqlAPI
	}
	const error =
		data?.authenticateUserWithPassword.__typename ===
		"UserAuthentactionWithPasswordFailure"
			? data?.authenticateUserWithPassword
			: undefined;

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Sign Into Your Account</h2>
			<DisplayError error={error} />
			<fieldset>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="password">
					Email
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign In</button>
			</fieldset>
		</Form>
	);
}
