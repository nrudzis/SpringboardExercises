DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE physician (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE patient (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE disease (
  id SERIAL PRIMARY KEY,
  disease_name TEXT UNIQUE NOT NULL
);

CREATE TABLE encounter (
  id SERIAL PRIMARY KEY,
  encounter_date TIMESTAMP NOT NULL,
  patient_id INTEGER NOT NULL REFERENCES patient ON DELETE CASCADE,
  doctor_id INTEGER REFERENCES doctor ON DELETE SET NULL
);

CREATE TABLE diagnosis (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES patient ON DELETE CASCADE,
  disease_id INTEGER NOT NULL REFERENCES disease ON DELETE CASCADE,
  diagnosing_physician INTEGER REFERENCES doctor ON DELETE SET NULL
);
