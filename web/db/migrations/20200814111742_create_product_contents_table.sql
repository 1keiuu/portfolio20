
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE product_contents(
    id int AUTO_INCREMENT,
    description varchar(255),
    image_url varchar(255),
    product_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(product_id)
    REFERENCES products(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE product_contents;