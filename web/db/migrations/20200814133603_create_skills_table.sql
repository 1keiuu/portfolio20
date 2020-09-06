
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE skills(
    id int AUTO_INCREMENT,
    name varchar(255),
    background_color varchar(255),
    image_url varchar(255),
    skill_type_id int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(skill_type_id)
    REFERENCES skill_types(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE skills;