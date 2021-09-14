import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../store/auth";

export function SecurePage(props) {
	const auth = useAuth();
	const history = useHistory();

	React.useEffect(
		() => {
			if (!auth.authToken) {
				history.push("/login");
			}
		},
		[auth.authToken]
	);

	return <>{props.children}</>;
}
