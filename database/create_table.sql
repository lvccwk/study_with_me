-- //1
CREATE TABLE users(
    id SERIAL primary key,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    type VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //2
CREATE TABLE teacher(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //3
CREATE TABLE subject(
    id SERIAL primary key,
    name VARCHAR(255),
    chinese_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //4
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
    content VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //6
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
CREATE TABLE chatroom(
    id SERIAL primary key,
    content VARCHAR(255),
    from_user INTEGER,
    FOREIGN KEY (from_user) REFERENCES users(id),
    to_user INTEGER,
    FOREIGN KEY (to_user) REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //9
CREATE TABLE forum(
    id SERIAL primary key,
    name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //111
CREATE TABLE forum_post(
    id SERIAL primary key,
    title VARCHAR(255),
    status VARCHAR(255),
    forum_id INTEGER,
    FOREIGN KEY (forum_id) REFERENCES forum(id),
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //10
CREATE TABLE forum_post_comment(
    id SERIAL primary key,
    content TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id),
    forum_post_id INTEGER,
    FOREIGN KEY (forum_post_id) REFERENCES forum_post(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
-- //12
CREATE TABLE image(
    id SERIAL primary key,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    image_icon VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)