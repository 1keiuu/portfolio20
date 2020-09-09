
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE products_skills DROP COLUMN name;

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE products_skills ADD COLUMN name;
