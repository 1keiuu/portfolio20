package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/PuerkitoBio/goquery"
	_ "github.com/go-sql-driver/mysql"
	"github.com/saintfish/chardet"
	"golang.org/x/net/html/charset"
)

func getDoc(URL string) *goquery.Document {
	res, _ := http.Get(URL)
	defer res.Body.Close()

	buf, _ := ioutil.ReadAll(res.Body)
	det := chardet.NewTextDetector()
	detRslt, _ := det.DetectBest(buf)
	// => EUC-JP

	// 文字コード変換
	bReader := bytes.NewReader(buf)
	reader, _ := charset.NewReaderLabel(detRslt.Charset, bReader)

	//HTMLパース
	doc, _ := goquery.NewDocumentFromReader(reader)
	return doc
}

func getContributionData(doc *goquery.Document, index string) {
	dataArr := []map[string]string{}

	// 1回目
	rslt := doc.Find("rect.day")
	rslt.Each(func(index int, s *goquery.Selection) {
		count, _ := s.Attr("data-count")
		date, _ := s.Attr("data-date")
		dataMap := map[string]string{"count": count, "date": date}
		dataArr = append(dataArr, dataMap)
	})
	Write(dataArr, index)
}

func Write(dataMap []map[string]string, index string) {
	b := []byte{}
	for _, line := range dataMap {
		ll := []byte(line["date"] + " " + line["count"] + "\n")
		for _, l := range ll {
			b = append(b, l)
		}
	}

	err := ioutil.WriteFile("data"+index+".txt", b, 0666)
	if err != nil {
		fmt.Println(os.Stderr, err)
		os.Exit(1)
	}
}

func connectDB() {
	// DBMS := "mysql"
	// USER := "root"
	// PASS := "password"
	// PROTOCOL := "tcp(db)"
	// DBNAME := "app_development"

	// CONNECT := USER + ":" + PASS + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=true&loc=Asia%2FTokyo"
	// return gorm.Open(DBMS, CONNECT)
	type Contribution struct {
		id         int
		count      int
		date       string
		created_at string
		updated_at string
	}

	db, err := sql.Open("mysql", "root:password@tcp(db)/app_development")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	rows, err := db.Query("SELECT * FROM contributions")
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	for rows.Next() {
		var contribution Contribution
		err := rows.Scan(&contribution.id, &contribution.count, &contribution.date, &contribution.created_at, &contribution.updated_at)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(contribution.date, contribution.count)
	}
}

func main() {
	connectDB()
	// _, err := connectDB()
	// if err != nil {
	// 	panic(err.Error())
	// } else {
	// 	fmt.Println("DB接続成功")
	// }

	// base, _ := url.Parse("https://github.com/ikkei12")
	// doc := getDoc(base.String())
	// var endpointArr []string

	// // 年度別にリンクを取得 endpointArrへ
	// yearCount := doc.Find("a.js-year-link")
	// yearCount.Each(func(i int, s *goquery.Selection) {
	// 	ref, _ := s.Attr("href")
	// 	reference, _ := url.Parse(ref)
	// 	endpoint := base.ResolveReference(reference).String()
	// 	endpointArr = append(endpointArr, endpoint)
	// })
	// for i, endpoint := range endpointArr {
	// 	doc := getDoc(endpoint)
	// 	getContributionData(doc, strconv.Itoa(i+1))
	// }
}
