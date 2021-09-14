import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/auth";

export function RegisterUser() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const history = useHistory();

	const auth = useAuth();

	React.useEffect(
		() => {
			if (auth.authToken) {
				history.push("/dashboard");
			}
		},
		[auth.authToken]
	);

	return (
		<div className="container">
			<h3>Register User</h3>
			{auth.authError && <div className="alert alert-danger">Authentication Error</div>}

			<div className="form-floating mb-3">
				<label>Email address</label>
				<input
					value={email}
					onChange={ev => setEmail(ev.target.value)}
					type="email"
					className="form-control"
					placeholder="name@example.com"
				/>
			</div>
			<div className="form-floating">
				<label>Password</label>
				<input
					value={password}
					onChange={ev => setPassword(ev.target.value)}
					type="password"
					className="form-control"
					placeholder="Enter your password here"
				/>
			</div>
			<button className="btn btn-primary mt-3" onClick={() => auth.registerUser(email, password)}>
				Register
			</button>
		</div>
	);
}
