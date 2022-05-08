DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE region (
  id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL
);

CREATE TABLE user_data (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL,
  user_region INTEGER REFERENCES region ON DELETE SET NULL
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  post_title VARCHAR(50) DEFAULT '(no title)',
  post_text VARCHAR(1000) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES user_data ON DELETE CASCADE,
  location VARCHAR(25),
  region INTEGER NOT NULL REFERENCES region ON DELETE CASCADE
);

CREATE TABLE post_category (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES post ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES category ON DELETE CASCADE
);