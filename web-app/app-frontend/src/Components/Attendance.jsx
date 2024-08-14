import axios from "axios";
import React, { useEffect, useState } from "react";

const Attendance = () => {
	const [attendance, setAttendance] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3000/auth/attendance-list")
			.then((result) => {
				if (result.data.Status) {
					setAttendance(result.data.Result);
				} else {
					alert(result.data.Error);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="px-5 mt-3">
			<div className="d-flex justify-content-center">
				<h3>Attendance Records</h3>
			</div>
			<div className="mt-3">
				<table className="table">
					<thead>
						<tr>
							<th>Date</th>
							<th>Time</th>
							<th>Employee Name</th>
							<th>Employee Email</th>
							<th>Employee Department</th>
							<th>Attendance Status</th>
						</tr>
					</thead>
					<tbody>
						{attendance.map((e) => (
							<tr key={e.attendance_id}>
								<td>{e.date}</td>
								<td>{e.time}</td>
								<td>{e.employee_name}</td>
								<td>{e.employee_email}</td>
								<td>{e.department_name}</td>
								<td>
									<span
										className={
											e.status === "Present"
												? "text-success"
												: e.status === "Absent with reason" ||
												  e.status === "On Vacation"
												? "text-primary"
												: "text-danger"
										}
									>
										&#9673;
									</span>{" "}
									{e.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Attendance;
