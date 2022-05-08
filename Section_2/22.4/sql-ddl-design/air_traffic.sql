DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passenger (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE airline (
  id SERIAL PRIMARY KEY,
  airline_name TEXT NOT NULL
);

CREATE TABLE flight (
  id SERIAL PRIMARY KEY,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  from_city TEXT NOT NULL,
  from_country TEXT NOT NULL,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL,
  airline_id INTEGER REFERENCES airline ON DELETE SET NULL
);

CREATE TABLE seat (
  id SERIAL PRIMARY KEY,
  seat_label TEXT UNIQUE NOT NULL
);

CREATE TABLE ticket (
  id SERIAL PRIMARY KEY,
  passenger_id INTEGER NOT NULL REFERENCES passenger ON DELETE CASCADE,
  flight_id INTEGER NOT NULL REFERENCES flight ON DELETE CASCADE,
  seat_id INTEGER REFERENCES seat ON DELETE SET NULL
);

INSERT INTO passenger
  (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Waneta', 'Skeleton'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Cory', 'Squibbes');

INSERT INTO airline
  (airline_name)
VALUES
  ('United'),
  ('British Airways'),
  ('Delta'),
  ('TUI Fly Belgium'),
  ('Air China'),
  ('American Airlines'),
  ('Avianca Brazil');

INSERT INTO flight
  (departure, arrival, from_city, from_country, to_city, to_country, airline_id)
VALUES
  ('2018-04-08 09:00:00', '2018-04-08 12:00:00', 'Washington DC', 'United States', 'Seattle', 'United States', 1),
  ('2018-12-19 12:45:00', '2018-12-19 16:15:00', 'Tokyo', 'Japan', 'London', 'United Kingdom', 2),
  ('2018-01-02 07:00:00', '2018-01-02 08:03:00', 'Los Angeles', 'United States', 'Las Vegas', 'United States', 3),
  ('2018-04-15 16:50:00', '2018-04-15 21:00:00', 'Seattle', 'United States', 'Mexico City', 'Mexico', 3),
  ('2018-08-01 18:30:00', '2018-08-01 21:50:00', 'Paris', 'France', 'Casablanca', 'Morocco', 4),
  ('2018-10-31 01:15:00', '2018-10-31 12:55:00', 'Dubai', 'UAE', 'Beijing', 'China', 5),
  ('2019-02-06 06:00:00', '2019-02-06 07:47:00', 'New York', 'United States', 'Charlotte', 'United States', 1),
  ('2018-12-22 14:42:00', '2018-12-22 15:56:00', 'Cedar Rapids', 'United States', 'Chicago', 'United States', 6),
  ('2019-02-06 16:28:00', '2019-02-06 19:18:00', 'Charlotte', 'United States', 'New Orleans', 'United States', 6),
  ('2019-01-20 19:30:00', '2019-01-20 22:45:00', 'Sao Paolo', 'Brazil', 'Santiago', 'Chile', 7);

INSERT INTO seat
  (seat_label)
VALUES
  -- probably would generate this by looping over and combining letters and numbers, but just using sample stand-ins for this exercise
  ('33B'),
  ('8A'),
  ('12F'),
  ('20A'),
  ('23D'),
  ('18C'),
  ('9E'),
  ('1A'),
  ('32B'),
  ('10D');

INSERT INTO ticket
  (passenger_id, flight_id, seat_id)
VALUES
  (1, 1, 1),
  (2, 2, 2),
  (3, 3, 3),
  (1, 4, 4),
  (4, 5, 5),
  (2, 6, 6),
  (5, 7, 7),
  (6, 8, 8),
  (5, 9, 9),
  (7, 10, 10);
