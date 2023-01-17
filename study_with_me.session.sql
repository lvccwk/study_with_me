CREATE TABLE users(
    id SERIAL primary key,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    created_at DATE,
    updated_at DATE,
    type VARCHAR
);


CREATE TABLE student(
    id SERIAL primary key,
    subject VARCHAR(255),
    academic_level VARCHAR(255), 
    school VARCHAR(255),
    created_at DATE,
    updated_at DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE teacher(
    id SERIAL primary key,
    created_at DATE,
    updated_at DATE,
    subject VARCHAR,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE subject(
    id SERIAL primary key,
    name VARCHAR(255)
);

CREATE TABLE teacher_subject(
    id SERIAL primary key,
    subject_id INTEGER,
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)
);

CREATE TABLE blog(
    id SERIAL primary key,
    created_at DATE,
    updated_at DATE,
    image VARCHAR(255),
    content VARCHAR(255),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id)        
);

CREATE TABLE chatroom(
    id SERIAL primary key,
    content VARCHAR(255),
    created_at DATE,
    updated_at DATE,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    from_user INTEGER,
    FOREIGN KEY (from_user) REFERENCES users(id),
    to_user INTEGER,
    FOREIGN KEY (to_user) REFERENCES users(id)
);

CREATE TABLE forum(
    id SERIAL primary key,
    name VARCHAR(255),
    created_at DATE,
    updated_at DATE
);

CREATE TABLE forum_post(
    id SERIAL primary key, 
    created_at DATE,
    updated_at DATE,
    content VARCHAR(255),
    status VARCHAR(255),
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id),
    forum_post_id INTEGER,
    FOREIGN KEY (forum_post_id) REFERENCES forum_post(id)
);

CREATE TABLE forum_post_comment(
    id SERIAL primary key,
    created_at DATE,
    updated_at DATE,
    content VARCHAR(255),  
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id),
    forum_post_id INTEGER,
    FOREIGN KEY (forum_post_id) REFERENCES forum_post(id)
);
