
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE skill_types(
    id int AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE skill_types;