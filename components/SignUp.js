import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		createUser(data: { email: $email, name: $name, password: $password }) {
			id
			email
			name
		}
	}
`;

export default function SignUp() {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		name: "",
		password: "",
	});
	const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
		// refetch the currently logged in user
		// refetchQueries: [{ query: CURRENT_USER_QUERY }]
	});
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(inputs);
		const res = await signup().catch(console.error);
		console.log(res);
		console.log({ data, loading, error });
		resetForm();
		// Send the email and password to the graphqlAPI
	}

	return (
		<Form method="POST" onSubmit={handleSubmit}>
			<h2>Sign Up For an Account</h2>
			<DisplayError error={error} />
			<fieldset>
				{data?.createUser && (
					<p>Signed up with {data.createUser.email} - Please Sign In!</p>
				)}
				<label htmlFor="name">
					Your Name
					<input
						type="text"
						name="name"
						placeholder="Your Name"
						autoComplete="name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
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
					Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign Up!</button>
			</fieldset>
		</Form>
	);
}
