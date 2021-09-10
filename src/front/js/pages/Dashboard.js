import React from "react";
import { useAuth } from "../store/flux";

export function Dashboard() {
	const auth = useAuth();

	return (
		<div>
			<h3>Dashboard</h3>
			<button className="btn btn-outline-primary" onClick={() => auth.logout()}>
				Exit
			</button>
		</div>
	);
}
