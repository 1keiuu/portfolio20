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
	"time"

	"github.com/PuerkitoBio/goquery"
	_ "github.com/go-sql-driver/mysql"
	"github.com/saintfish/chardet"
	"golang.org/x/net/html/charset"
)

func update() {

	base, _ := url.Parse("https://github.com/ikkei12")
	doc := getThisYearDoc(base.String())

	years := doc.Find("a.js-year-link")
	years.Each(func(i int, s *goquery.Selection) {
		if i == 0 {
			ref, _ := s.Attr("href")
			reference, _ := url.Parse(ref)
			endpoint := base.ResolveReference(reference).String()
			doc := getThisYearDoc(endpoint)
			getLatestContributionData(doc)
		}
	})
}

func getThisYearDoc(URL string) *goquery.Document {
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

func getLatestContributionData(doc *goquery.Document) {
	rslt := doc.Find("rect.day")
	nowUTC := time.Now().UTC()
	jst := time.FixedZone("Asia/Tokyo", 9*60*60)
	nowJST := nowUTC.In(jst).Format("2006-01-02")

	rslt.Each(func(index int, s *goquery.Selection) {
		date, _ := s.Attr("data-date")
		count, _ := s.Attr("data-count")
		Count, _ := strconv.Atoi(count)
		if date == nowJST {
			// 実行日と同じdateを持つcontributionを発見した時
			updateTodaysContribution(Count, date)
		}
	})
	fmt.Println("finished!!!")
}

func updateTodaysContribution(count int, date string) {
	ENDPOINT := os.Getenv("DB_ENDPOINT")
	USER_NAME := os.Getenv("DB_USER_NAME")
	PASS := os.Getenv("DB_PASS")
	DB_NAME := os.Getenv("DB_NAME")

	db, err := sql.Open("mysql", USER_NAME+":"+PASS+"@tcp("+ENDPOINT+")/"+DB_NAME)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	// ?入れてるのはSQL injectionを防ぐ為
	stmtInsert, err := db.Prepare("UPDATE contributions SET count=? WHERE date=?")
	if err != nil {
		panic(err.Error())
	}
	defer stmtInsert.Close()

	result, err := stmtInsert.Exec(count, date)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(result)
}
