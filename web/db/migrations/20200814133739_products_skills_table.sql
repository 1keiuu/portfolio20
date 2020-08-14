
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE products_skills(
    id int AUTO_INCREMENT,
    name varchar(255),
    product_id int NOT NULL,
    skill_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(product_id)
    REFERENCES products(id),
    FOREIGN KEY(skill_id)
    REFERENCES skills(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE products_skills;