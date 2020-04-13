CREATE DATABASE perntodo;

-- SERIAL keeps Primary Key unique automatically at insertion
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);