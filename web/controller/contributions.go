package controller

import (
	"net/http"

	"work/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Contribution struct {
	ID        int    `json:"id"`
	Count     int    `json:"count"`
	Date      string `json:"date"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

func GetContributions(c *gin.Context) {
	db := db.Connect()
	defer db.Close()
	rows, err := db.Query("SELECT * FROM contributions")
	if err != nil {
		panic(err.Error())
	}
	//contributions型のスライスに格納します
	contributionsArgs := make([]Contribution, 0)
	for rows.Next() {
		var contributions Contribution
		err = rows.Scan(&contributions.ID, &contributions.Count, &contributions.Date, &contributions.CreatedAt, &contributions.UpdatedAt)
		if err != nil {
			panic(err.Error())
		}
		contributionsArgs = append(contributionsArgs, contributions)
	}

	c.JSON(http.StatusOK, gin.H{
		"contributions": contributionsArgs,
	})
}

func main() {

}
