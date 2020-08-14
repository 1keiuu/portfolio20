package admincontroller

import (
	"net/http"
	"work/db"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AU struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignIn(c *gin.Context) {
	var json AU

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	// DBから取得したユーザーパスワード(Hash)
	dbPassword := getUser(json.Email).Password

	// フォームから取得したユーザーパスワード
	postedPassword := json.Password

	if err := bcrypt.CompareHashAndPassword([]byte(dbPassword), []byte(postedPassword)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "failed"})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	}

}

func getUser(email string) AU {
	DB := db.Connect()
	defer DB.Close()
	var adminUser AU
	err := DB.QueryRow("SELECT email, password FROM admin_users WHERE email =?", email).Scan(&adminUser.Email, &adminUser.Password)
	if err != nil {
		panic(err.Error())
	}

	return adminUser
}
