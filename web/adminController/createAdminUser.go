package admincontroller

import (
	"fmt"
	"log"
	"net/http"
	"work/db"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AdminUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func CreateAdminUser(c *gin.Context) {
	var json AdminUser
	// バリデーション処理

	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} else {
		email := json.Email
		password := json.Password
		if err := insertDB(email, password); err != nil {
			fmt.Println("same")
		}
		c.JSON(http.StatusOK, gin.H{"email": json.Password})
	}
}

func insertDB(email string, password string) []error {
	passwordEncrypt, _ := bcrypt.GenerateFromPassword([]byte(password), 4)
	DB := db.Connect()
	defer DB.Close()

	ins, err := DB.Prepare("INSERT INTO admin_users(email,password) VALUES(?,?)")
	if err != nil {
		log.Fatal(err)
	}
	ins.Exec(email, passwordEncrypt)

	return nil

}
