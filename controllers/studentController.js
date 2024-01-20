const mysql = require('mysql');
const util = require('util');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "students"
};

class StudentController {

    // [GET] /student
    async getListStudents(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const query = util.promisify(conn.query).bind(conn);
            const listStudents = await query(`SELECT * FROM students`);
            res.status(200).send(listStudents);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /student/:id
    async getStudentById(req, res) {
        const id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);
            const query = util.promisify(conn.query).bind(conn);
            const studentById = await query(`SELECT * FROM students WHERE id = '${id}'`);
            res.status(200).send(studentById[0]);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /student
    async createStudent(req, res) {
        const { id, name, address } = req.body;
        try {
            var conn = mysql.createConnection(configDB);
            const query = util.promisify(conn.query).bind(conn);
            const newStudent = await query(`INSERT INTO students VALUES (?, ?, ?)`, [id, name, address]);
            res.status(200).send(newStudent);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }

    // [DELETE] /student/:id
    async deleteStudent(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const query = util.promisify(conn.query).bind(conn);
            const id = req.params.id;
            const deleteStudent = await query(`DELETE FROM students WHERE id = ?`, id);
            res.status(200).send(deleteStudent);
        } catch (error) {
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }

    // [PUT] /student/:id
    async updateStudent(req, res) {
        try {
            var conn = mysql.createConnection(configDB);
            const query = util.promisify(conn.query).bind(conn);
            const { id, name, address } = req.body;
            const updateStudent = await query(`UPDATE students SET name = ?, address = ? WHERE id = ?`, [name, address, id]);
            res.status(200).send(updateStudent);
        } catch (error) {
            res.status(500).send(error);
        } finally {
            conn.end();
        }
    }
}

module.exports = new StudentController();
