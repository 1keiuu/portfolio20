package main

import (
	"bytes"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/saintfish/chardet"
	"golang.org/x/net/html/charset"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strconv"
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

func main() {
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
	for i, endpoint := range endpointArr {
		doc := getDoc(endpoint)
		getContributionData(doc, strconv.Itoa(i+1))
	}
}
