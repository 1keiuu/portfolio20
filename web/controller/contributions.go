package controller

import (
	"net/http"
	"strconv"
	"strings"
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

type DataStruct struct {
	Label string `json:"label"`
	Count int    `json:"count"`
}

type LabelsAndCounts struct {
	Labels []string `json:"labels"`
	Counts []int    `json:"counts"`
}

type LabelsAndCountsMultiple struct {
	Labels [][]string `json:"labels"`
	Counts [][]int    `json:"counts"`
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

	wCounts, wLabels := getWeeklyData(contributionsArray)
	mCounts, mLabels := getMonthlyData(contributionsArray)
	yCounts, yLabels := getYearlyData(contributionsArray)

	c.JSON(http.StatusOK, gin.H{
		"weekly":  LabelsAndCountsMultiple{Counts: wCounts, Labels: wLabels},
		"monthly": LabelsAndCounts{Counts: mCounts, Labels: mLabels},
		"yearly":  LabelsAndCounts{Counts: yCounts, Labels: yLabels},
	})
}

func culcWeeklyData(array []Contribution, todaysContributionIndex int) ([][]int, [][]string) {

	from := todaysContributionIndex // 週の初日
	to := from + 7                  // 週の最終日

	var counts [][]int
	var labels [][]string
	for i := 0; i < 4; i++ {
		var countsArray []int
		var labelsArray []string
		for _, item := range array[from:to] {
			countsArray = append(countsArray, item.Count)
			labelsArray = append(labelsArray, item.Date)
		}
		from = from + 7
		to = to + 7
		counts = append(counts, countsArray)
		labels = append(labels, labelsArray)
	}
	return counts, labels
}

func getWeeklyData(array []Contribution) ([][]int, [][]string) {
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

	counts, labels := culcWeeklyData(array, todaysContributionIndex)

	return counts, labels
}

func getMonthlyData(array []Contribution) ([]int, []string) {
	// 日付time.Now()を日本時間へ
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	today := nowUTC.In(jst)
	layout := "2006-01"

	var counts []int
	var labels []string
	for i := 0; i > -12; i-- {
		// "2006-01"のフォーマットのstringを今月から数えて12ヶ月分を配列へ追加
		culc := today.AddDate(0, i, 0).Format(layout)
		labels = append(labels, culc)
	}

	for _, month := range labels {
		data := DataStruct{month, culculateCount(array, month)}
		counts = append(counts, data.Count)
	}
	return counts, labels
}

func culculateCount(array []Contribution, month string) int {
	sum := 0
	for _, item := range array {
		bool := strings.Contains(item.Date, month)
		if bool {
			sum += item.Count
		}
	}
	return sum
}

func getYearlyData(array []Contribution) ([]int, []string) {
	// 日付time.Now()を日本時間へ
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	today := nowUTC.In(jst)
	layout := "2006"

	// 文字列→数値
	thisYear, _ := strconv.Atoi(today.Format(layout))
	// 観測開始(2018-01-01)と今年の差を求めてループの回数に使う
	yearCount := thisYear - 2017
	var counts []int
	var labels []string
	for i := 0; i < yearCount; i++ {
		culc := thisYear - i
		// 数値→文字列
		string := strconv.Itoa(culc)
		labels = append(labels, string)
	}

	for _, year := range labels {
		data := DataStruct{year, culculateCount(array, year)}
		counts = append(counts, data.Count)
	}
	return counts, labels
}
