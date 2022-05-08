DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  team_name TEXT NOT NULL
);

CREATE TABLE player (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  team_id INTEGER REFERENCES team ON DELETE SET NULL
);

CREATE TABLE referee (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT
);

CREATE TABLE season (
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE match (
  id SERIAL PRIMARY KEY,
  team_1_id INTEGER REFERENCES team ON DELETE SET NULL,
  team_2_id INTEGER REFERENCES team ON DELETE SET NULL,
  season_id INTEGER NOT NULL REFERENCES season ON DELETE CASCADE
);

CREATE TABLE goal (
  id SERIAL PRIMARY KEY,
  match_id INTEGER NOT NULL REFERENCES match ON DELETE CASCADE,
  player_id INTEGER REFERENCES player ON DELETE SET NULL
);

CREATE TABLE referee_match (
  id SERIAL PRIMARY KEY,
  referee_id INTEGER REFERENCES referee ON DELETE SET NULL,
  match_id INTEGER NOT NULL REFERENCES match ON DELETE CASCADE
);

-- probably able to be captured by query, but a table stand-in for now:
CREATE TABLE ranking (
  id SERIAL PRIMARY KEY,
  season_id INTEGER NOT NULL REFERENCES season ON DELETE CASCADE,
  team_id INTEGER REFERENCES team ON DELETE SET NULL
  rank INTEGER NOT NULL
);
