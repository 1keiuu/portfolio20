package controller

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
)

type Params struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Content string `json:"content"`
}

type Credentials struct {
	To   string `json:"to"`
	From string `json:"from"`
	Pw   string `json:"pw"`
}

func PostContacts(c *gin.Context) {
	var json Params

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	err := sendMail(json)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{"name": json.Name, "email": json.Email, "content": json.Content})
}

func sendMail(params Params) error {
	dat, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		return errors.New("error occurred while reading credential file")
	}
	var cr Credentials
	json.Unmarshal(dat, &cr)

	// client := config.Client(oauth2.NoContext, &token)
	from := cr.From
	to := cr.To
	password := cr.Pw

	// func PlainAuth(identity, username, password, host string) Auth
	auth := smtp.PlainAuth("", from, password, "smtp.gmail.com")

	msg := []byte("" +
		"From:" + params.Name + "<" + from + ">\r\n" +
		"To: " + to + "\r\n" +
		"Subject: ポートフォリオ経由の連絡\r\n" +
		"\r\n" +
		params.Content + "\r\n\n\r" +
		"From " + params.Name + "様" + "(" + params.Email + ")" +
		"")

	// func SendMail(addr string, a Auth, from string, to []string, msg []byte) error
	err2 := smtp.SendMail("smtp.gmail.com:587", auth, from, []string{to}, msg)
	if err2 != nil {
		fmt.Fprintf(os.Stderr, "エラー: %v\n", err)
		return errors.New("エラーです")
	}

	return nil
}
