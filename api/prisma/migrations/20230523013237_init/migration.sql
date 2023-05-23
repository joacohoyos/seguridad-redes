-- This is an empty migration.

CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  section VARCHAR(255) NOT NULL,
  hidden BOOLEAN DEFAULT false
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
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

INSERT INTO menu (name, url, section, hidden)
VALUES ('Home', '/', 'home', false),
       ('Products', '/products', 'home', false),
       ('Users', '/users/show', 'admin', true);

INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', 'password123', 'admin'),
       ('User 1', 'user1@example.com', 'password456', 'user'),
       ('User 2', 'user2@example.com', 'password789', 'user');

