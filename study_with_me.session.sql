CREATE TABLE user(
    id SERIAL primary key,
    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    student_id INTEGER,
    teacher_id INTEGER,
    created_at timestamp,
    updated_at timestamp
)

CREATE TABLE student(
    id SERIAL primary key,

    username VARCHAR(255) not null,
    email VARCHAR(255) not null,
    payment_id INTEGER,
    teacher_id INTEGER,
    created_at timestamp,
    updated_at timestamp,
    FOREIGN KEY (user_id) REFERENCES user(id)
)
