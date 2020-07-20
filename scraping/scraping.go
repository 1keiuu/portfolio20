package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strconv"

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
	// dataArr := []map[string]string{}

	rslt := doc.Find("rect.day")

	rslt.Each(func(index int, s *goquery.Selection) {
		count, _ := s.Attr("data-count")
		date, _ := s.Attr("data-date")
		Count, _ := strconv.Atoi(count)
		// dataMap := map[string]string{"count": count, "date": date}
		// dataArr = append(dataArr, dataMap)
		insertDB(Count, date)
	})

	// Write(dataArr, index)
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

func insertDB(count int, date string) {
	// type Contribution struct {
	// 	id         int
	// 	count      int
	// 	date       string
	// 	created_at string
	// 	updated_at string
	// }

	db, err := sql.Open("mysql", "root:password@tcp(db)/app_development")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	// ?入れてるのはSQL injectionを防ぐ為 → timestampもそうするべき？
	stmtInsert, err := db.Prepare("INSERT INTO contributions(count, date,created_at,updated_at) VALUES(?,?,current_timestamp,current_timestamp)")
	if err != nil {
		panic(err.Error())
	}
	defer stmtInsert.Close()

	result, err := stmtInsert.Exec(count, date)
	if err != nil {
		panic(err.Error())
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(lastInsertID)

	// rows, err := db.Query("SELECT * FROM contributions")
	// if err != nil {
	// 	panic(err.Error())
	// }
	// defer rows.Close()
	// for rows.Next() {
	// 	var contribution Contribution
	// 	err := rows.Scan(&contribution.id, &contribution.count, &contribution.date, &contribution.created_at, &contribution.updated_at)
	// 	if err != nil {
	// 		panic(err.Error())
	// 	}
	// 	fmt.Println(contribution.date, contribution.count)
	// }
}

func main() {

	// _, err := connectDB()
	// if err != nil {
	// 	panic(err.Error())
	// } else {
	// 	fmt.Println("DB接続成功")
	// }

	base, _ := url.Parse("https://github.com/ikkei12")
	doc := getDoc(base.String())
	var endpointArr []string

	// 年度別にリンクを取得 endpointArrへ
	yearCount := doc.Find("a.js-year-link")
	yearCount.Each(func(i int, s *goquery.Selection) {
		ref, _ := s.Attr("href")
		reference, _ := url.Parse(ref)
		endpoint := base.ResolveReference(reference).String()
		endpointArr = append(endpointArr, endpoint)
	})
	for i, j := 0, len(endpointArr)-1; i < j; i, j = i+1, j-1 {
		// endpointArrを反転(reverse)
		endpointArr[i], endpointArr[j] = endpointArr[j], endpointArr[i]
	}
	for i, endpoint := range endpointArr {
		doc := getDoc(endpoint)
		getContributionData(doc, strconv.Itoa(i+1))
	}
}
