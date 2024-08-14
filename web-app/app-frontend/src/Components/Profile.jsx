import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminProfile from "../../public/Images/admin-image.png";

const Profile = () => {
	const [admin, setAdmin] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/auth/admin_details/" + 1)
			.then((result) => {
				console.log(result.data[0]);
				setAdmin(result.data[0]);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="d-flex align-items-center flex-column gap-2 mt-5">
			<img src={AdminProfile} className="mb-3" style={{ width: "160px" }} />

			<div className="d-flex align-items-center flex-column mt-3 gap-2 mb-5">
				<div className="d-flex flex-column text-center">
					<h6 className="text-secondary">Name</h6>
					<h5>{admin.name}</h5>
				</div>
				<div className="d-flex flex-column text-center">
					<h6 className="text-secondary">Email</h6>
					<h5>{admin.email}</h5>
				</div>
				<div className="d-flex flex-column text-center">
					<h6 className="text-secondary">Role</h6>
					<h5>{admin.role}</h5>
				</div>
			</div>
		</div>
	);
};

export default Profile;
