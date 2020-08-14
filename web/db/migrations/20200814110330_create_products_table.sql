
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE products(
    id int AUTO_INCREMENT,
    title varchar(255),
    span varchar(255),
    background_color varchar(255),
    PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE products;