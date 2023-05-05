import Student from "../model/student.js";

class studentController {

    // [GET] /students
    async getStudents(req, res) {
        try {
            const listStudents = await Student.find();
            res.status(200).json(listStudents);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /students
    async createStudent(req, res) {
        try {
            const { id, name, address } = req.body;
            const newStudent = await Student.create({ id, name, address });
            res.status(200).json(newStudent);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [GET] /students/:id
    async getAStudent(req, res) {
        try {
            const id = req.params.id;
            const student = await Student.findOne({ id });
            res.send(student);
        } catch (error) {
            res.send({ "error": error.message });
        }
    }

    // [DELETE] /students/:id
    async deleteStudent(req, res) {
        try {
            const id = req.params.id;
            const deleteStudent = await Student.findOneAndDelete({ id });
            res.send(deleteStudent);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [PUT] /students/:id
    async updateStudent(req, res) {
        try {
            const id = req.params.id;
            const body = req.body;
            const updateStudent = await Student.findOneAndUpdate({ id }, body);
            res.send(updateStudent);
        } catch (error) {
            res.send({ "error": error.message });
        }
    }
}

export default new studentController();
