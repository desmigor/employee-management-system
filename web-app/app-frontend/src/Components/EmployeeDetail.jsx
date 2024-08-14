import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetail = () => {
	const [employee, setEmployee] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:3000/employee/detail/" + id)
			.then((result) => {
				console.log(result.data.Result);
				setEmployee(result.data.Result);
			})
			.catch((err) => console.log(err));
	}, []);
	const handleLogout = () => {
		axios
			.get("http://localhost:3000/employee/logout")
			.then((result) => {
				if (result.data.Status) {
					localStorage.removeItem("valid");
					navigate("/employee_login");
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<div className="p-2 d-flex gap-3 align-items-center justify-content-center shadow">
				<h4>Employee Dashboard</h4>
				<button className="btn btn-danger btn-lg" onClick={handleLogout}>
					Logout
				</button>
			</div>
			{employee && (
				<div className="d-flex justify-content-center flex-column align-items-center mt-5">
					<img
						src={`http://localhost:3000/Images/` + employee.employee_image}
						className="emp_det_image mb-3"
					/>
					<div className="d-flex align-items-center flex-column mt-3 gap-2 mb-5">
						<div className="d-flex flex-column text-center">
							<h6 className="text-secondary">Name</h6>
							<h5>{employee.employee_name}</h5>
						</div>
						<div className="d-flex flex-column text-center">
							<h6 className="text-secondary">Email</h6>
							<h5>{employee.employee_email}</h5>
						</div>
						<div className="d-flex flex-column text-center">
							<h6 className="text-secondary">Department</h6>
							<h5>{employee.department_name}</h5>
						</div>
						<div className="d-flex flex-column text-center">
							<h6 className="text-secondary">Salary</h6>
							<h5>
								{employee.employee_salary
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
								RWF
							</h5>
						</div>
						<div className="d-flex flex-column">
							<h6 className="text-secondary text-center">Attendance</h6>

							<table className="table">
								<thead>
									<tr>
										<th>Date</th>
										<th>Time</th>
										<th>Attendance Status</th>
									</tr>
								</thead>
								<tbody>
									{employee.attendance_records.map((e, i) => (
										<tr key={i}>
											<td>{e.date}</td>
											<td>{e.time}</td>
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
				</div>
			)}
		</div>
	);
};

export default EmployeeDetail;
