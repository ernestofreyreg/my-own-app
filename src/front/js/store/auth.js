import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
	persist(
		(set, get) => ({
			authToken: null,
			authError: null,

			registerUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 204) {
							throw new Error("register-error");
						}

						get().loginUser(email, password);
					})
					.catch(error => set({ authError: error, authToken: null }));
			},

			logout: () => set({ authToken: null }),

			loginUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 200) {
							throw new Error("authentication-error");
						}

						return resp.json();
					})
					.then(data => set({ authToken: data.token, authError: null }))
					.catch(error => set({ authToken: null, authError: error }));
			}
		}),
		{
			name: "auth-storage",
			getStorage: () => sessionStorage
		}
	)
);
