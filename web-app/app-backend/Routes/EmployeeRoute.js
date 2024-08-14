import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/employee_login", (req, res) => {
	const sql = "SELECT * from employee Where email = ?";
	con.query(sql, [req.body.email], (err, result) => {
		if (err) return res.json({ loginStatus: false, Error: "Query error" });
		if (result.length > 0) {
			bcrypt.compare(req.body.password, result[0].password, (err, response) => {
				if (err)
					return res.json({ loginStatus: false, Error: "Wrong Password" });
				if (response) {
					const email = result[0].email;
					const token = jwt.sign(
						{ role: "employee", email: email, id: result[0].id },
						"jwt_secret_key",
						{ expiresIn: "1d" }
					);
					res.cookie("token", token);
					return res.json({ loginStatus: true, id: result[0].id });
				}
			});
		} else {
			return res.json({ loginStatus: false, Error: "wrong email or password" });
		}
	});
});

router.get("/detail/:id", (req, res) => {
	const id = req.params.id;
	const sql = `
        SELECT 
            employee.id AS employee_id,
            employee.name AS employee_name,
            employee.image AS employee_image,
            employee.email AS employee_email,
            employee.salary AS employee_salary,
            department.name AS department_name,
            attendance.date,
            attendance.time,
            attendance.status
        FROM employee
        LEFT JOIN department ON employee.department_id = department.id
        LEFT JOIN attendance ON employee.id = attendance.employee_id
        WHERE employee.id = ?
    `;

	con.query(sql, [id], (err, result) => {
		if (err) return res.json({ Status: false, Error: "Query Error" });

		const employeeDetails = {
			employee_id: result[0].employee_id,
			employee_name: result[0].employee_name,
			employee_image: result[0].employee_image,
			employee_email: result[0].employee_email,
			employee_salary: result[0].employee_salary,
			department_name: result[0].department_name,
			attendance_records: result.map((row) => ({
				date: row.date,
				time: row.time,
				status: row.status,
			})),
		};

		return res.json({ Status: true, Result: employeeDetails });
	});
});

router.get("/logout", (req, res) => {
	res.clearCookie("token");
	return res.json({ Status: true });
});

export { router as EmployeeRouter };
