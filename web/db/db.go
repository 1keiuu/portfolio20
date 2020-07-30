package db

import (
	"database/sql"
	"os"
)

func Connect() *sql.DB {
	ENDPOINT := os.Getenv("DB_ENDPOINT")
	USER_NAME := os.Getenv("DB_USER_NAME")
	PASS := os.Getenv("DB_PASS")
	DB_NAME := os.Getenv("DB_NAME")

	db, err := sql.Open("mysql", USER_NAME+":"+PASS+"@tcp("+ENDPOINT+")/"+DB_NAME)

	if err != nil {
		panic(err.Error())
	}
	return db
}
