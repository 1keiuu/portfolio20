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
	rows, err := DB.Query("SELECT * FROM contributions ORDER BY id DESC")
	if err != nil {
		panic(err.Error())
	}

	contributionsArray := make([]Contribution, 0)
	for rows.Next() {
		var contributions Contribution
		err = rows.Scan(&contributions.ID, &contributions.Count, &contributions.Date, &contributions.CreatedAt, &contributions.UpdatedAt)
		if err != nil {
			panic(err.Error())
		}
		contributionsArray = append(contributionsArray, contributions)
	}
	c.JSON(http.StatusOK, gin.H{
		"weekly":  getWeeklyData(contributionsArray),
		"monthly": getMonthlyData(contributionsArray),
		"Yearly":  getYearlyData(contributionsArray),
	})
}

func culcWeeklyData(array []Contribution, todaysContributionIndex int) [][]Contribution {

	from := todaysContributionIndex // 週の初日
	to := from + 7                  // 週の最終日

	var newArray [][]Contribution
	for i := 0; i < 4; i++ {
		newArray = append(newArray, array[from:to])
		from = from + 7
		to = to + 7
	}
	return newArray
}

func getWeeklyData(array []Contribution) [][]Contribution {
	// 日付time.Now()を日本時間へ
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	today := nowUTC.In(jst)

	var todaysContributionIndex int
	for i, s := range array {
		// 全データから今日の日付のデータのindexを取得する
		layout := "2006-01-02"
		t, _ := time.Parse(layout, s.Date)

		if today.Format(layout) == t.Format(layout) {
			// Format()は"2006-01-02"の形のstringを返す
			todaysContributionIndex = i
			break
		}
	}

	weekly := culcWeeklyData(array, todaysContributionIndex)

	// lastdayOfThisYear := today.AddDate(0, 0, -365)
	// var contributionOfThisYear []Contribution
	// for _, s := range array {
	// 	layout := "2006-01-02"
	// 	t, _ := time.Parse(layout, s.Date)

	// 	if today.Unix() > t.Unix() && t.Unix() > lastdayOfThisYear.Unix() {
	// 		contributionOfThisYear = append(contributionOfThisYear, s)
	// 	}
	// }
	// var contributionOfThisMonth []Contribution
	// for i := 0; i < 5; i++ {
	// 	thisDay := today.AddDate(0, 0, -(7 * i))
	// 	fmt.Println(thisDay)
	// 	for _, s := range contributionOfThisYear {
	// 		layout := "2006-01-02"
	// 		t, _ := time.Parse(layout, s.Date)

	// 		if thisDay.Unix() > t.Unix() && t.Unix() >= thisDay.AddDate(0, 0, -7).Unix() {
	// 			contributionOfThisMonth = append(contributionOfThisMonth, s)
	// 		}
	// 	}
	// }
	return weekly
}

func getMonthlyData(array []Contribution) [][]Contribution {
}

func getYearlyData(array []Contribution) [][]Contribution {
}
