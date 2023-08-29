const Student = require('../model/student.js');

class StudentController {

    // [GET] /student
    async getListStudents(req, res) {
        try {
            const listStudents = await Student.find();
            res.status(200).send(listStudents);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    // [POST] /student
    async createStudent(req, res) {
        try {
            const { id, name, address } = req.body;
            const newStudent = await Student.create({ id, name, address });
            res.status(200).send(newStudent);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // [GET] /student/:id
    async getStudentById(req, res) {
        try {
            const id = req.params.id;
            const student = await Student.findOne({ id });
            res.status(200).send(student);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // [DELETE] /student/:id
    async deleteStudent(req, res) {
        try {
            const id = req.params.id;
            const deleteStudent = await Student.findOneAndDelete({ id });
            res.status(200).send(deleteStudent);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // [PUT] /student/:id
    async updateStudent(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const updateStudent = await Student.findOneAndUpdate({ id }, body);
            res.status(200).send(updateStudent);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = new StudentController();
