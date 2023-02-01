sSELECT *
FROM image
INSERT INTO image (user_id, image_icon)
VALUES ('7', 'senior-man-white-sweater-eyeglasses.jpg')
Select *
from bookings
    join teacher on bookings.teacher_id = teacher.id
    join users on teacher.user_id = users.id
where users.id = 7;
select *
from users
    join teacher on users.id = teacher.user_id
where users.id = 7;
INSERT into teacher (user_id, created_at, updated_at)
VALUES (7, now(), now());
select *
from teacher
DELETE FROM teacher
WHERE id = 50;
ALTER SEQUENCE teacher_id_seq RESTART WITH 47;
select *
from bookings
SELECT booking_date,
    booking_time,
    status
FROM bookings
    JOIN teacher on bookings.teacher_id = teacher.id
    JOIN student on bookings.student_id = student.id
    JOIN users on teacher.user_id = users.id - -- JOIN users on student.user_id = users.id
where users.id = 7;
select *
FROM bookings;
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
    view_teachers.username as teacher_name
from bookings
    join view_students on bookings.student_id = view_students.student_id
    join view_teachers on bookings.teacher_id = view_teachers.teacher_id
WHERE view_teachers.teacher_user_id = 7
    AND booking_date = '30-1-2023';
select *
from bookings;
select *
from bookings
where id = 2;
select *
from users
where id = 47;
select *
from teacher
where id = 47;
select *
from teacher
where id = 7;
select *
from users
where id = 49;
select *
from student
where id = 1;
select *
from users;
DROP table bookings;
CREATE TABLE bookings(
    id SERIAL primary key,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    student_id INTEGER,
    FOREIGN KEY (student_id) REFERENCES student(id),
    booking_date DATE,
    booking_time TIME,
    details TEXT,
    booking_status VARCHAR(255),
    student_status VARCHAR(255),
    teacher_status VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-1-30',
        '6:00pm',
        'Discuss about postgres',
        'confirmed',
        'confirm',
        'confirm',
        'teacher',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-1-30',
        '4:00pm',
        'Discuss about programming',
        'confirmed',
        'confirm',
        'confirm',
        'student',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-1-30',
        '5:00pm',
        'Discuss about programming',
        'pending',
        'confirm',
        'pending',
        'teacher',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-1-30',
        '1:00pm',
        'Discuss about programming',
        'pending',
        'pending',
        'confirm',
        'student',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-1-29',
        '8:00pm',
        'Discuss about programming',
        'confirmed',
        'confirm',
        'confirm',
        'teacher',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        2,
        '2023-1-29',
        '8:00pm',
        'Discuss about programming',
        'pending',
        'pending',
        'confirm',
        'teacher',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        2,
        '2023-1-31',
        '3:00am',
        'Discuss about programming',
        'pending',
        'confirm',
        'pending',
        'student',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        1,
        '2023-2-1',
        '3:00am',
        'Discuss about programming',
        'pending',
        'confirm',
        'pending',
        'student',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        2,
        '2023-1-29',
        '8:00pm',
        'Discuss about programming',
        'pending',
        'confirm',
        'pending',
        'teacher',
        now(),
        now()
    );
INSERT INTO bookings(
        teacher_id,
        student_id,
        booking_date,
        booking_time,
        details,
        booking_status,
        student_status,
        teacher_status,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        47,
        2,
        '2023-1-31',
        '5:00pm',
        'Discuss about programming',
        'pending',
        'confirm',
        'pending',
        'teacher',
        now(),
        now()
    );
select *
from bookings;
DELETE FROM bookings
WHERE id = 15;
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
WHERE view_teachers.teacher_id = 47
    AND booking_time = '20:00:00'
    AND booking_date = '2023-01-29';
select *
from image;
select *
from student;
INSERT INTO image (user_id, image_icon, created_at, updated_at)
VALUES(
        2,
        'indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university.jpg',
        now(),
        now()
    )
INSERT INTO image (user_id, image_icon, created_at, updated_at)
VALUES(
        1,
        'happy-asian-man-standing-with-arms-crossed-grey-wall.jpg',
        now(),
        now()
    )
SELECT *
from users
SELECT *
from users
    FULL OUTER JOIN student ON users.id = student.user_id
    FULL OUTER JOIN teacher ON users.id = teacher.user_id;