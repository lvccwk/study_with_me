-- //1 == 1
CREATE TABLE users(
    id SERIAL primary key,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    type VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    display_name VARCHAR(255)
);
-- //2 == 2
CREATE TABLE teacher(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //3 == 3
CREATE TABLE subject(
    id SERIAL primary key,
    name VARCHAR(255),
    chinese_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //4 == 4
CREATE TABLE teacher_subject(
    id SERIAL primary key,
    subject_id INTEGER,
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //5
CREATE TABLE blog(
    id SERIAL primary key,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    image VARCHAR(255),
    title text,
    content VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //6 == 6
CREATE TABLE school(
    id SERIAL primary key,
    name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //7
CREATE TABLE student(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    subject_id INTEGER,
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    school_id INTEGER,
    FOREIGN KEY (school_id) REFERENCES school(id),
    academic_level VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //8
CREATE TABLE image(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    image_icon VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) --//9
CREATE TABLE public_chat(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    sender VARCHAR(255),
    chat_record text,
    chat_message_time TIME,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) -- //8
-- CREATE TABLE chatroom(
--     id SERIAL primary key,
--     content VARCHAR(255),
--     from_user INTEGER,
--     FOREIGN KEY (from_user) REFERENCES users(id),
--     to_user INTEGER,
--     FOREIGN KEY (to_user) REFERENCES users(id),
--     conetent_time TIMESTAMP,
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- );
-- //9
-- CREATE TABLE forum(
--     id SERIAL primary key,
--     name VARCHAR(255),
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- );
-- -- //10
-- CREATE TABLE forum_post_comment(
--     id SERIAL primary key,
--     content TEXT,
--     author_id INTEGER,
--     FOREIGN KEY (author_id) REFERENCES users(id),
--     forum_post_id INTEGER,
--     FOREIGN KEY (forum_post_id) REFERENCES forum_post(id),
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- ) -- //11
-- CREATE TABLE forum_post(
--     id SERIAL primary key,
--     title VARCHAR(255),
--     status VARCHAR(255),
--     forum_id INTEGER,
--     FOREIGN KEY (forum_id) REFERECREATE TABLENCES forum(id),
--     author_id INTEGER,
--     FOREIGN KEY (author_id) REFERENCES users(id),
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- );
--//14
-- CREATE TABLE chatroom_message(
--     id SERIAL primary key,
--     chatroom_id INTEGER,
--     FOREIGN KEY (chatroom_id) REFERENCES chatroom(id),
--     message text,
--     message_time TIMESTAMP,
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- ) --//15
-- CREATE TABLE chat_history(
--     id SERIAL primary key,
--     sender INTEGER,
--     FOREIGN KEY (sender) REFERENCES users(id),
--     receiver INTEGER,
--     FOREIGN KEY (receiver) REFERENCES users(id),
--     chat_record text,
--     room_id INTEGER,
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- );
-- --//13
-- CREATE TABLE schedule(
--     id SERIAL primary key,
--     title text,
--     subject_id INTEGER,
--     end_date DATE,
--     description VARCHAR(255),
--     launch_data DATE,
--     launch_time TIME,
--     created_at TIMESTAMP,
--     updated_at TIMESTAMP
-- ) 
-- CREATE TABLE dm()
-- ALTER TABLE public_chat
-- ADD COLUMN is_public BOOLEAN
-- ALTER TABLE public_chat
-- ADD COLUMN receiver INTEGER
-- ALTER TABLE public_chat
-- ADD COLUMN room_id INTEGER
-- ALTER TABLE public_chat
-- ALTER TABLE employees
--     RENAME COLUMN id TO employ_id;
-- -- //1
-- -- SELECT * FROM users;
-- -- SELECT * FROM teacher;
-- -- SELECT * FROM subject;
-- -- SELECT * FROM teacher_subject;
-- -- SELECT * FROM blog;
-- -- SELECT * FROM student;
-- -- SELECT * FROM school;
-- -- SELECT * FROM chatroom;
-- -- SELECT * FROM forum_post;
-- -- SELECT * FROM forum_post_comment;
-- -- SELECT * FROM forum;
-- SELECT DISTINCT subject.chinese_name,
--     users.username,
--     image.image_icon,
--     subject.id,
--     users.type
-- from users
--     join teacher on teacher.user_id = users.id
--     join teacher_subject on teacher_subject.teacher_id = teacher.id
--     join subject on subject.id = teacher_subject.subject_id
--     join image on image.user_id = users.id
-- WHERE users.type = 'teacher'
-- LIMIT 5 -- LIMIT 5 OFFSET 1
-- ;
-- SELECT DISTINCT subject.chinese_name
-- from subject
-- SELECT users.username,
--     image.image_icon,
--     subject.id,
--     subject.chinese_name,
--     users.type
-- from users
--     join teacher on teacher.user_id = users.id
--     join teacher_subject on teacher_subject.teacher_id = teacher.id
--     join subject on subject.id = teacher_subject.subject_id
--     join image on image.user_id = users.id
-- WHERE users.type = 'student'
-- SELECT chatroom.id
-- from chatroom
--     JOIN users on users.id = chatroom.from_user
-- select content
-- from chatroom
-- where from_user = 7
-- Select username
-- from users
-- where users.email =
-- select users.id,
--     users.username,
--     image.image_icon
-- from users
--     JOIN image ON users.id = image.user_id
-- Select users.username,
--     public_chat.chat_record
-- FROM public_chat
--     JOIN users ON users.id = public_chat.user_id
-- ORDER BY public_chat.id ASC
-- Select (1 = users.id) as is_myself,
--     (2 = receiver) as is_receiver,
--     users.id,
--     users.username,
--     public_chat.chat_record
-- FROM public_chat
--     JOIN users ON users.id = public_chat.user_id
-- ORDER BY public_chat.id ASC;
-- Select (1 = users.id) as is_myself_,
--     (2 = receiver) as is_receiver,
--     (3 = users.id) as is_receiver,
--     (4 = receiver) as is_myself,
--     users.id,
--     users.username,
--     public_chat.chat_record
-- FROM public_chat
--     JOIN users ON users.id = public_chat.user_id
-- ORDER BY public_chat.id ASC;
-- select *
-- FROM public_chat
-- where (
--         sender = 1
--         and receiver = 2
--     )
--     or (
--         sender = 2
--         and receiver = 1
--     )
-- ORDER BY id ASC
-- select users.id,
--     users.username,
--     users.type,
--     image.image_icon
-- from users
--     left JOIN image ON users.id = image.user_id
-- SELECT username
-- from users
-- WHERE users.id = 67