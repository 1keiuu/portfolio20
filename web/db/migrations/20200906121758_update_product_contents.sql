
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE product_contents ADD title varchar(255);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

ALTER TABLE product_contents DROP title;