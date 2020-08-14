
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE admin_users (
 id int AUTO_INCREMENT,
 email varchar(255),
 password varchar(255),
 PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE admin_users;