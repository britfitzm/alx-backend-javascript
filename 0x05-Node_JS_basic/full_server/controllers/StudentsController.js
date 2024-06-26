import readDatabase from "../utils.js";

class StudentsController {
	static async getAllStudents(req, res) {
		try {
			const students = await readDatabase("./database.csv");
			const result = [];

			result.push("This is the list of our students");

			for (const key in students) {
				result.push(`Number of students in ${key}: ${students[key].length}. List: ${students[key].join(", ")}`)
			}
			res.status(200).send(result.join("\n"));
		} catch (e) {
			res.status(500).send("Cannot load the database.");
		}
	}

	static async getAllStudentsByMajor(req, res) {
		try {
			const { major } = req.params;

			if (major !== "CS" && major !== "SWE") {
				throw new Error("Major parameter must be CS or SWE");
			}

			const students = await readDatabase('./database.csv');

			if (!students) {
				throw new Error("Cannot load the database");
			}

			const result = [];

			for (const key in students) {
				if (major === key) {
					result.push(`List: ${students[key]}`)
				}
			}

			res.status(200).send(result.join(', '));

		} catch (e) {
			res.status(500).send(e.message);
		}
	}
}

export default StudentsController;
