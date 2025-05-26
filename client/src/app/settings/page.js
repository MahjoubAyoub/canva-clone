"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function SettingsPage() {
	const { data: session, status, update } = useSession();
	const [form, setForm] = useState({
		name: "",
		email: "",
		image: "",
	});
	const [loading, setLoading] = useState(false);

	// Move fetchUserProfile outside useEffect so it can be reused
	async function fetchUserProfile() {
		if (session?.user && session.idToken) {
			try {
				const res = await axios.get("http://localhost:5004/user/profile", {
					headers: { Authorization: `Bearer ${session.idToken}` },
				});
				if (res.data?.success && res.data.data) {
					setForm({
						name: res.data.data.name || "",
						email: res.data.data.email || "",
						image: res.data.data.image || "",
					});
				}
			} catch (err) {
				// Optionally handle error
			}
		}
	}

	useEffect(() => {
		fetchUserProfile();
	}, [session]);

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"http://localhost:5004/user/update-profile",
				form,
				{ headers: { Authorization: `Bearer ${session.idToken}` } }
			);
			if (res.data?.success) {
				if (update) await update(); // Refresh session if needed
				await fetchUserProfile(); // Refetch profile from backend to update UI
			}
		} catch (err) {
			console.error(err);// handle error
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-10 px-4">
			<Card className="w-full max-w-xl rounded-3xl border border-purple-100/60 shadow-2xl p-0 overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 60%, rgba(236, 233, 255, 0.7) 100%)', backdropFilter: 'blur(16px)'}}>
				<CardHeader className="flex flex-col items-center gap-2 pt-10 pb-4 bg-gradient-to-b from-purple-100/60 to-transparent">
					<Avatar className="w-20 h-20 shadow-lg ring-4 ring-purple-200 mb-2">
						{form.image ? (
							<AvatarImage src={form.image} alt={form.name} />
						) : null}
						<AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
							{form.name?.[0]}
						</AvatarFallback>
					</Avatar>
					<CardTitle className="text-2xl font-bold text-purple-700">Account Settings</CardTitle>
					<CardDescription className="text-gray-500 text-center">
						Update your profile information
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit} className="space-y-8 px-8 pb-10 pt-2">
					<div className="flex flex-col gap-4">
						<label className="block text-sm font-semibold text-gray-700">Profile Picture</label>
						<input
							type="file"
							accept="image/*"
							onChange={async (e) => {
								const file = e.target.files[0];
								if (!file) return;
								try {
									setLoading(true);
									const formData = new FormData();
									formData.append("file", file); // Use 'file' as the field name
									const res = await axios.post("/v1/media/upload", formData, {
										headers: { Authorization: `Bearer ${session.idToken}` },
									});
									if (res.data?.success && res.data.data?.url) {
										setForm((prev) => ({ ...prev, image: res.data.data.url }));
									}
								} catch (err) {
									console.error(err);
								} finally {
									setLoading(false);
								}
							}}
							className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="block text-sm font-semibold text-gray-700">Name</label>
						<Input
							name="name"
							value={form.name}
							onChange={handleChange}
							className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-400 text-base bg-gray-50"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="block text-sm font-semibold text-gray-700">Email</label>
						<Input
							name="email"
							value={form.email}
							onChange={handleChange}
							className="rounded-xl border-gray-200 focus:ring-2 focus:ring-purple-400 text-base bg-gray-50"
						/>
					</div>
					<div className="flex gap-4 pt-2">
						<Button type="submit" disabled={loading} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl py-3 shadow-md transition">
							{loading ? "Saving..." : "Save Changes"}
						</Button>
						<Button
							type="button"
							variant="outline"
							className="flex-1 border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl py-3 font-bold shadow-sm transition"
							onClick={() => (window.location.href = "/dashboard-user")}
						>
							Go Back
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
