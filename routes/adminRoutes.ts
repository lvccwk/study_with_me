import express from 'express'
import moment from 'moment';
import path from 'path';
import { client } from '../util/db';
import { isLoggedIn } from "../util/guard";
import { logger } from '../util/logger';


let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


export const adminRoutes = express.Router()
adminRoutes.get('/', isLoggedIn, showAdmin)
adminRoutes.get('/schedule/confirm/:type/:userId/:date', isLoggedIn, findConfirmedSchedules)
adminRoutes.get('/schedule/pending/:userId', isLoggedIn, findPendingSchedules)
adminRoutes.get('/students', isLoggedIn, findAllStudent)
adminRoutes.post('/add/:userId', isLoggedIn, addSchedule)
adminRoutes.delete('/cancel/:userId', isLoggedIn, cancelSchedule)
adminRoutes.delete('/decline/:bookingId', isLoggedIn, declineSchedule)
adminRoutes.post('/checkcrash/:bookingId', isLoggedIn, checkCrashedSchedule)
adminRoutes.patch('/accept/:bookingId', isLoggedIn, acceptSchedule)
adminRoutes.get('/viewotheruser', isLoggedIn, viewOtherUser)
adminRoutes.get('/otheruser/:userId', isLoggedIn, getOtherUser)




async function showAdmin(req: express.Request, res: express.Response) {
    try {
        res.sendFile("C:\\Users\\User\\Documents\\tecky-exercises\\study_with_me\\Private\\account.html")
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function findConfirmedSchedules(req: express.Request, res: express.Response) {
    try {
        console.log(req.params.type)
        console.log(req.params.userId)
        let date = moment(req.params.date).format('DD-MM-YYYY')
        let selectSchedules = await client.query(`
        with view_students AS (
            select student.id as student_id,
             student.user_id as student_user_id,
                users.*
            from student
                inner join users on student.user_id = users.id
        ),
        view_teachers AS (
            select teacher.id as teacher_id,
                 teacher.user_id as teacher_user_id,
                users.*
            from teacher
                inner join users on teacher.user_id = users.id
        )
        select bookings.id,
            view_students.student_id as student_id,
            view_students.student_user_id as student_user_id,
            view_students.username as student_name,
            view_teachers.teacher_id as teacher_id,
            view_teachers.teacher_user_id as teacher_user_id,
            view_teachers.username as teacher_name,
            booking_time,
            booking_date,
            details,
            booking_status,
            student_status,
            teacher_status,
            created_by
        from bookings
            join view_students on bookings.student_id = view_students.student_id
            join view_teachers on bookings.teacher_id = view_teachers.teacher_id
            WHERE view_${req.params.type}s.${req.params.type}_user_id = ${req.params.userId} AND booking_date = '${date}' AND ${req.params.type}_status = 'confirm';`)
        // for (let selectSchedule of selectSchedules.rows) {
        //     console.log(selectSchedule)
        // }
        res.json(selectSchedules.rows)
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function findPendingSchedules(req: express.Request, res: express.Response) {
    try {
        let selectSchedules = await client.query(`
        with view_students AS (
            select student.id as student_id,
             student.user_id as student_user_id,
                users.*
            from student
                inner join users on student.user_id = users.id
        ),
        view_teachers AS (
            select teacher.id as teacher_id,
                 teacher.user_id as teacher_user_id,
                users.*
            from teacher
                inner join users on teacher.user_id = users.id
        )
        select bookings.id,
            view_students.student_id as student_id,
            view_students.student_user_id as student_user_id,
            view_students.username as student_name,
            view_teachers.teacher_id as teacher_id,
            view_teachers.teacher_user_id as teacher_user_id,
            view_teachers.username as teacher_name,
            bookings.id,
            booking_time,
            booking_date,
            details,
            booking_status,
            student_status,
            teacher_status,
            created_by
        from bookings
            join view_students on bookings.student_id = view_students.student_id
            join view_teachers on bookings.teacher_id = view_teachers.teacher_id
            WHERE view_teachers.teacher_user_id = ${req.params.userId} AND student_status = 'confirm' AND teacher_status = 'pending';`)
        // for (let selectSchedule of selectSchedules.rows) {
        //     console.log(selectSchedule)
        // }
        res.json(selectSchedules.rows)
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function findAllStudent(req: express.Request, res: express.Response) {
    try {
        let findAllStudent = await client.query(`
        select users.* , image.image_icon
        from users Join student on users.id = student.user_id JOIN image on users.id = image.user_id;
        `)
        res.json(findAllStudent.rows)
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function addSchedule(req: express.Request, res: express.Response) {
    try {
        console.log("received")
        console.log(req.body)
        let teacherId = await client.query(`SELECT teacher.id FROM teacher JOIN users ON teacher.user_id = users.id WHERE users.id = ${req.params.userId}`)
        console.log(teacherId.rows[0].id)
        let date = moment(req.body.inputDate).format('DD-MM-YYYY')
        console.log(date)
        await client.query(
            `INSERT INTO bookings(teacher_id, student_id, booking_date, booking_time, details, booking_status, student_status, teacher_status, created_by, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, 'pending', 'pending', 'confirm', 'teacher', now(), now())`, [teacherId.rows[0].id, req.body.studentId, date, req.body.inputTime, req.body.details])
        res.json("ok")
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function cancelSchedule(req: express.Request, res: express.Response) {
    try {
        let teacherId = await client.query(`SELECT teacher.id FROM teacher JOIN users ON teacher.user_id = users.id WHERE users.id = ${req.params.userId}`)
        let date = moment(req.body.cancelDate).format('DD-MM-YYYY')
        await client.query(
            `DELETE FROM bookings WHERE teacher_id = $1 AND student_id = $2 AND booking_date = $3 AND booking_time = $4`, [teacherId.rows[0].id, req.body.studentId, date, req.body.cancelTime])
        res.json("ok")

    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function checkCrashedSchedule(req: express.Request, res: express.Response) {
    try {
        console.log(req.body)
        let date = moment(req.body.pendingDate).format('DD-MM-YYYY')
        console.log([req.body.teacherId, req.body.pendingTime, date])
        let crashedBooking = await client.query(`
        with view_students AS (
            select student.id as student_id,
             student.user_id as student_user_id,
                users.*
            from student
                inner join users on student.user_id = users.id
        ),
        view_teachers AS (
            select teacher.id as teacher_id,
                 teacher.user_id as teacher_user_id,
                users.*
            from teacher
                inner join users on teacher.user_id = users.id
        )
        select bookings.id,
            view_students.student_id as student_id,
            view_students.student_user_id as student_user_id,
            view_students.username as student_name,
            view_teachers.teacher_id as teacher_id,
            view_teachers.teacher_user_id as teacher_user_id,
            view_teachers.username as teacher_name,
            bookings.id,
            booking_time,
            booking_date,
            details,
            booking_status,
            student_status,
            teacher_status,
            created_by
        from bookings
            join view_students on bookings.student_id = view_students.student_id
            join view_teachers on bookings.teacher_id = view_teachers.teacher_id
            WHERE view_teachers.teacher_id = $1 AND booking_time = $2 AND booking_date = $3 AND booking_status = 'confirmed' AND view_students.student_id != $4;`,
            [req.body.teacherId, req.body.pendingTime, date, req.body.studentId,])
        console.log(`crashedBooking = ${crashedBooking.rows[0]}`)
        if (crashedBooking.rows[0]) {
            res.json(crashedBooking.rows[0])
        } else {
            res.json("No Record")
        }

    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function declineSchedule(req: express.Request, res: express.Response) {
    try {
        await client.query(`DELETE FROM bookings WHERE id = $1`, [req.params.bookingId])
        res.json("ok")

    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function acceptSchedule(req: express.Request, res: express.Response) {
    try {
        await client.query(`UPDATE bookings SET teacher_status = 'confirm', booking_status = 'confirmed' WHERE id = $1`, [req.params.bookingId])
        res.json("ok")
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function viewOtherUser(req: express.Request, res: express.Response) {
    try {
        res.sendFile(`${path.join(__dirname, '..', 'private', 'accountforview.html')}`)
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}

async function getOtherUser(req: express.Request, res: express.Response) {
    try {
        let user = await client.query(`
        SELECT users.username, users.type, student.id as student_id, student.school_id, student.academic_level, teacher.id as teacher_id, image.image_icon
        from users
            FULL OUTER JOIN student ON users.id = student.user_id
            FULL OUTER JOIN teacher ON users.id = teacher.user_id
            FULL OUTER JOIN image ON users.id = image.user_id 
            WHERE users.id = ${req.params.userId};`)
        console.log(user.rows[0])
        res.json(user.rows[0])
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            message: '[USR001] - Server error'
        })
    }
}