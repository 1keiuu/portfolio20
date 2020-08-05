
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE contributions ( 
 id int AUTO_INCREMENT, 
 count int, 
 date varchar(40), 
 created_at datetime default current_timestamp , 
 updated_at timestamp default current_timestamp on update current_timestamp,
 PRIMARY KEY(id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE contributions;