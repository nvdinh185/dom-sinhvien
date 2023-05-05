import sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();
const dbFile = './database/students.db';

class studentController {

    // [GET] /students
    async getStudents(req, res) {
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const listStudents = await new Promise((resolve, reject) => {
                db.all(`SELECT * FROM students`, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                })
            })
            res.status(200).json(listStudents);
        } catch (err) {
            res.status(500).json(err);
        } finally {
            db.close();
        }
    }

    // [POST] /students
    async createStudent(req, res) {
        const { id, name, address } = req.body;
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const newStudent = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO students VALUES (?, ?, ?)`,
                    [id, name, address], function (err) {
                        if (err) {
                            reject(new Error(err.message));
                        }
                        resolve(this.changes);
                    });
            });
            res.status(200).json(newStudent);
        } catch (error) {
            res.status(500).json(error);
        } finally {
            db.close();
        }
    }

    // [DELETE] /students/:id
    async deleteStudent(req, res) {
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const id = req.params.id;
            const deleteStudent = await new Promise((resolve, reject) => {
                db.run(`DELETE FROM students WHERE id = ?`, id, function (err) {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(this.changes);
                });
            })
            res.status(200).json(deleteStudent);
        } catch (error) {
            res.status(500).json(error);
        } finally {
            db.close();
        }
    }

    // [PUT] /students/:id
    async updateStudent(req, res) {
        try {
            var db = new sqlite3.Database(dbFile);
            db.serialize();
            const { id, name, address } = req.body;
            const updateStudent = await new Promise((resolve, reject) => {
                db.run(`UPDATE students SET name = ?, address = ? WHERE id = ?`,
                    [name, address, id], function (err) {
                        if (err) {
                            reject(new Error(err.message));
                        }
                        resolve(this.changes);
                    });
            })
            res.status(200).json(updateStudent);
        } catch (error) {
            res.send({ "error": error.message });
        } finally {
            db.close();
        }
    }
}

export default new studentController();
