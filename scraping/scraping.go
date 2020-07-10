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
)

func main() {
	base,_ := url.Parse("https://github.com/ikkei12")
	res,_ := http.Get(base.String())
	defer res.Body.Close()

	buf,_ := ioutil.ReadAll(res.Body)
	det := chardet.NewTextDetector()
	detRslt, _ := det.DetectBest(buf)
	// => EUC-JP

	// 文字コード変換
	bReader := bytes.NewReader(buf)
	reader, _ := charset.NewReaderLabel(detRslt.Charset, bReader)

	//HTMLパース
	doc, _ := goquery.NewDocumentFromReader(reader)
	yearCount := doc.Find("a.js-year-link")

	yearCount.Each(func(i int, s *goquery.Selection) {
		ref,_ := s.Attr("href")
		reference,_ := url.Parse(ref)
		endpoint := base.ResolveReference(reference).String()
		fmt.Println(endpoint)
	})
	//rslt:= doc.Find("rect.day")
	//rslt.Each(func(index int, s *goquery.Selection) {
	//	count,_ := s.Attr("data-count")
	//	date,_ := s.Attr("data-date")
	//	fmt.Println(date,count)
	//})
}




//Q2 5 6 2 3

