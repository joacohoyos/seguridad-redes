-- This is an empty migration.

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  password_to_confirm VARCHAR(255),
  is_admin BOOLEAN DEFAULT false,
  role INTEGER NOT NULL
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    expiration TIME DEFAULT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  description TEXT,
  image VARCHAR(255)
);

INSERT INTO products (name, price, description, image) VALUES ('Product 1', 10.99, 'Sample description 1', 'image1.jpg');
INSERT INTO products (name, price, description, image) VALUES ('Product 2', 19.99, 'Sample description 2', 'image2.jpg');

INSERT INTO notifications (text) VALUES ('Some text');


INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', 'password123', 0),
       ('User 1', 'user1@example.com', 'password456', 1),
       ('User 2', 'user2@example.com', 'password789', 1);

