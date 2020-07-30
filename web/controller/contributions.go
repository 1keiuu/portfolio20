package controller

import (
	"net/http"
	"time"

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
	DB := db.Connect()
	defer DB.Close()
	rows, err := DB.Query("SELECT * FROM contributions")
	if err != nil {
		panic(err.Error())
	}

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
		"contributions": sortContributionsData(contributionsArgs),
	})
}

func sortContributionsData(array []Contribution) string {
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	nowJST := nowUTC.In(jst)

	today := nowJST.AddDate(0, 0, -7).Format("2006-01-02")
	return today
}
