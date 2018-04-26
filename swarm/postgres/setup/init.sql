CREATE EXTENSION "uuid-ossp";

CREATE TABLE pwms (
       id SERIAL PRIMARY KEY,
       uuid UUID,
       pwm REAL[][]
);

CREATE TABLE logos (
       id SERIAL PRIMARY KEY,
       pwm INT,
       uuid UUID,
       typeid INT,
       isfrequency BOOLEAN,
       scale REAL,
       firstbase INT
);
