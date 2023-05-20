DROP DATABASE IF EXISTS biztime;
CREATE DATABASE biztime;

\c biztime

DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS industries_companies;
DROP TABLE IF EXISTS invoices;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
    code text PRIMARY KEY,
    industry text NOT NULL UNIQUE
);

CREATE TABLE industries_companies (
    ind_code text NOT NULL REFERENCES industries ON DELETE CASCADE,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    PRIMARY KEY(ind_code, comp_code)
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries
  VALUES ('technology', 'Technology'),
         ('electronics', 'Electronics'),
         ('consumer-electronics', 'Consumer Electronics'),
         ('mainframe-computing', 'Mainframe Computing');

INSERT INTO industries_companies
  VALUES ('technology', 'apple'),
         ('technology', 'ibm'),
         ('electronics', 'apple'),
         ('electronics', 'ibm'),
         ('consumer-electronics', 'apple'),
         ('mainframe-computing', 'ibm');
