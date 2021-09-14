import React from "react";
import { useAuth } from "../store/auth";
import { useQueryData, useUpdateData } from "../store/data";

export function Dashboard() {
	const auth = useAuth();
	const { loading, data } = useQueryData("/api/userinfo");
	const { updating, updated, updateData } = useUpdateData("/api/userinfo");

	return (
		<div>
			<h3>Dashboard</h3>
			{loading && <div className="spinner-border" role="status" />}

			{data && (
				<div className="card" style={{ width: "18rem" }}>
					<div className="card-body">
						<h5 className="card-title">User Info</h5>
						<p className="card-text">{data.email}</p>
						<button onClick={() => updateData({ email: "jhon@gmail.com" })}>
							Update Email to jhon@gmail.com
						</button>
					</div>
				</div>
			)}
			<button className="btn btn-outline-primary" onClick={() => auth.logout()}>
				Exit
			</button>
		</div>
	);
}
