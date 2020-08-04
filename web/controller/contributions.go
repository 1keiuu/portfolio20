package controller

import (
	"fmt"
	"net/http"
	"time"

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
	// DB := db.Connect()
	// defer DB.Close()
	// rows, err := DB.Query("SELECT * FROM contributions")
	// if err != nil {
	// 	panic(err.Error())
	// }

	// contributionsArgs := make([]Contribution, 0)
	// for rows.Next() {
	// 	var contributions Contribution
	// 	err = rows.Scan(&contributions.ID, &contributions.Count, &contributions.Date, &contributions.CreatedAt, &contributions.UpdatedAt)
	// 	if err != nil {
	// 		panic(err.Error())
	// 	}
	// 	contributionsArgs = append(contributionsArgs, contributions)
	// }

	c.JSON(http.StatusOK, gin.H{
		// "contributions": sortContributionsData(contributionsArgs),
		"contributions": "test",
	})
}

func sortContributionsData(array []Contribution) []Contribution {
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	today := nowUTC.In(jst)

	// lastdayOfThisWeek := today.AddDate(0, 0, -7).Format("2006-01-02")
	// 一年以内のcontribution
	lastdayOfThisYear := today.AddDate(0, 0, -365)
	var contributionOfThisYear []Contribution
	for _, s := range array {
		layout := "2006-01-02"
		t, _ := time.Parse(layout, s.Date)

		if today.Unix() > t.Unix() && t.Unix() > lastdayOfThisYear.Unix() {
			contributionOfThisYear = append(contributionOfThisYear, s)
		}
	}
	var contributionOfThisMonth []Contribution
	for i := 0; i < 5; i++ {
		thisDay := today.AddDate(0, 0, -(7 * i))
		fmt.Println(thisDay)
		for _, s := range contributionOfThisYear {
			layout := "2006-01-02"
			t, _ := time.Parse(layout, s.Date)

			if thisDay.Unix() > t.Unix() && t.Unix() >= thisDay.AddDate(0, 0, -7).Unix() {
				contributionOfThisMonth = append(contributionOfThisMonth, s)
			}
		}
	}
	return contributionOfThisMonth
}
