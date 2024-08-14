import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordAttendance = () => {
	const currentDate = new Date();
	let day = currentDate.getDate();
	let month = currentDate.getMonth() + 1;
	let year = currentDate.getFullYear();
	let hour = currentDate.getHours();
	let minute = currentDate.getMinutes();

	const [attendance, setAttendance] = useState({
		date: `${day}-${month}-${year}`,
		time: `${hour}:${minute}`,
		employee_id: "",
		status: "",
	});
	const [employee, setEmployee] = useState([]);
	const navigate = useNavigate();

	const attendaceStatus = [
		{ status: "Present" },
		{ status: "Absent with no reason" },
		{ status: "Absent with reason" },
		{ status: "On Vacation" },
	];

	useEffect(() => {
		axios
			.get("http://localhost:3000/auth/employee")
			.then((result) => {
				if (result.data.Status) {
					setAttendance({
						...attendance,
						employee_id: result.data.Result[0].id,
						status: attendaceStatus[0].status,
					});
					setEmployee(result.data.Result);
				} else {
					alert(result.data.Error);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(attendance);

		axios
			.post("http://localhost:3000/auth/record_attendance", attendance)
			.then((result) => {
				if (result.data.Status) {
					navigate("/dashboard/employee");
				} else {
					console.log(result.data);
					alert(result.data.Error);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="d-flex justify-content-center align-items-center mt-3">
			<div className="p-3 rounded w-50 border">
				<h3 className="text-center">Record Attendance</h3>
				<form className="d-flex gap-2 row g-1" onSubmit={handleSubmit}>
					<div className="col-12">
						<label htmlFor="inputName" className="form-label">
							Date
						</label>
						<input
							type="text"
							className="form-control rounded-0"
							id="inputName"
							placeholder={`${day}-${month}-${year}`}
							disabled
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputName" className="form-label">
							Time
						</label>
						<input
							type="text"
							className="form-control rounded-0"
							id="inputName"
							placeholder={`${hour}:${minute}`}
							disabled
						/>
					</div>
					<div className="col-12">
						<label htmlFor="department" className="form-label">
							Select Employee
						</label>
						<select
							name="department"
							id="department"
							className="form-select"
							onChange={(e) => {
								setAttendance({ ...attendance, employee_id: e.target.value });
							}}
						>
							{employee.map((c) => {
								return (
									<option key={c.id} value={c.id}>
										{c.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="col-12">
						<label htmlFor="department" className="form-label">
							Attendance Status
						</label>
						<select
							name="department"
							id="department"
							className="form-select"
							onChange={(e) => {
								setAttendance({ ...attendance, status: e.target.value });
							}}
						>
							{attendaceStatus.map((c) => {
								return (
									<option key={c.status} value={c.status}>
										{c.status}
									</option>
								);
							})}
						</select>
					</div>
					<div className="col-12 mt-3">
						<button type="submit" className="btn btn-primary w-100">
							Record Attendace
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RecordAttendance;
