package controller

import (
	"net/http"
	"work/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Product struct {
	ID              int    `json:"id"`
	Title           string `json:"title"`
	Span            string `json:"span"`
	BackgroundColor string `json:"background_color"`
	Images          string `json:"images"`
	Descriptions    string `json:"descriptions"`
	// CreatedAt string `json:"created_at"`
	// UpdatedAt string `json:"updated_at"`
}

func GetProducts(c *gin.Context) {
	DB := db.Connect()
	defer DB.Close()
	rows, err := DB.Query("SELECT products.id, title, span, background_color, group_concat(distinct product_contents.image_url) AS images,group_concat(distinct product_contents.description) AS descriptions FROM products INNER JOIN product_contents ON (products.id=product_contents.product_id) GROUP BY product_id;")
	if err != nil {
		panic(err.Error())
	}

	productsArray := make([]Product, 0)
	for rows.Next() {
		var products Product
		err = rows.Scan(&products.ID, &products.Title, &products.Span, &products.BackgroundColor, &products.Images, &products.Descriptions)
		if err != nil {
			panic(err.Error())
		}
		productsArray = append(productsArray, products)
	}

	c.JSON(http.StatusOK, gin.H{
		"products": productsArray,
	})
}
