package controller

import (
	"database/sql"
	"net/http"
	"strconv"
	"work/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Product struct {
	ID              int              `json:"id"`
	Title           string           `json:"title"`
	Span            string           `json:"span"`
	BackgroundColor string           `json:"background_color"`
	Images          string           `json:"images"`
	Descriptions    string           `json:"descriptions"`
	StartDate       string           `json:"start_date"`
	Skills          []ProductsSkills `json:"skills"`
}
type ProductsSkills struct {
	ProductId       int    `json:"product_id"`
	SkillId         string `json:"skill_id"`
	SkillName       string `json:"skill_name"`
	SkillTypeName   string `json:"skill_type_name"`
	BackgroundColor string `json:"background_color"`
	ImageUrl        string `json:"image_url"`
}

type ProductDescription struct {
	Id       sql.NullInt64  `json:"id"`
	ImageUrl sql.NullString `json:"image_url"`
}

func GetProducts(c *gin.Context) {
	DB := db.Connect()
	defer DB.Close()
	productsRows, err := DB.Query("SELECT products.id, title, span, background_color,start_date, group_concat(distinct product_contents.image_url) AS images,group_concat(distinct product_contents.description) AS descriptions FROM products INNER JOIN product_contents ON (products.id=product_contents.product_id) GROUP BY product_id;")
	if err != nil {
		panic(err.Error())
	}

	// productへ紐づくskillsを取得
	productsSkillsRows, err := DB.Query("SELECT product_id, skill_id, (skills.name) AS skill_name, (skill_types.name) AS skill_type_name, skills.background_color, skills.image_url FROM products_skills INNER JOIN skills ON products_skills.skill_id = skills.id INNER JOIN skill_types ON skills.skill_type_id=skill_types.id;")

	productsSkillsArray := make([]ProductsSkills, 0)
	for productsSkillsRows.Next() {
		var productsSkills ProductsSkills
		err = productsSkillsRows.Scan(&productsSkills.ProductId, &productsSkills.SkillId, &productsSkills.SkillName, &productsSkills.SkillTypeName, &productsSkills.BackgroundColor, &productsSkills.ImageUrl)
		if err != nil {
			panic(err.Error())
		}
		productsSkillsArray = append(productsSkillsArray, productsSkills)
	}

	productsArray := make([]Product, 0)
	for productsRows.Next() {
		var product Product
		err = productsRows.Scan(&product.ID, &product.Title, &product.Span, &product.BackgroundColor, &product.StartDate, &product.Images, &product.Descriptions)
		if err != nil {
			panic(err.Error())
		}
		for _, productSkill := range productsSkillsArray {
			if product.ID == productSkill.ProductId {
				product.Skills = append(product.Skills, productSkill)
			}
		}
		productsArray = append(productsArray, product)
	}

	c.JSON(http.StatusOK, gin.H{
		"products": productsArray,
	})
}

func GetProduct(c *gin.Context) {
	//paramsからproductを取得showの部分
	id, _ := strconv.Atoi(c.Param("id"))

	DB := db.Connect()
	defer DB.Close()
	productRow := DB.QueryRow("SELECT products.id, title, span, background_color,start_date, group_concat(distinct product_contents.image_url) AS images,group_concat(distinct product_contents.description) AS descriptions FROM products INNER JOIN product_contents ON (products.id=product_contents.product_id) where products.id = ? GROUP BY product_id;", id)
	prevProductRow := DB.QueryRow("SELECT product_id AS id, image_url FROM product_contents WHERE product_id = ?;", id-1)
	nextProductRow := DB.QueryRow("SELECT product_id AS id, image_url FROM product_contents WHERE product_id = ?;", id+1)

	productsSkillsRows, err := DB.Query("SELECT product_id, skill_id, (skills.name) AS skill_name, (skill_types.name) AS skill_type_name, skills.background_color, skills.image_url FROM products_skills INNER JOIN skills ON products_skills.skill_id = skills.id INNER JOIN skill_types ON skills.skill_type_id=skill_types.id WHERE product_id = ?;", id)
	productsSkillsArray := make([]ProductsSkills, 0)
	for productsSkillsRows.Next() {
		var productsSkills ProductsSkills
		err = productsSkillsRows.Scan(&productsSkills.ProductId, &productsSkills.SkillId, &productsSkills.SkillName, &productsSkills.SkillTypeName, &productsSkills.BackgroundColor, &productsSkills.ImageUrl)
		if err != nil {
			panic(err.Error())
		}
		productsSkillsArray = append(productsSkillsArray, productsSkills)
	}

	var product Product
	err = productRow.Scan(&product.ID, &product.Title, &product.Span, &product.BackgroundColor, &product.StartDate, &product.Images, &product.Descriptions)
	if err != nil {
		panic(err.Error())
	}

	// 一つ前のproduct
	var prevProduct ProductDescription
	err = prevProductRow.Scan(&prevProduct.Id, &prevProduct.ImageUrl)

	// 一つ後のproduct
	var nextProduct ProductDescription
	err = nextProductRow.Scan(&nextProduct.Id, &nextProduct.ImageUrl)

	for _, productSkill := range productsSkillsArray {
		if product.ID == productSkill.ProductId {
			product.Skills = append(product.Skills, productSkill)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"product":      product,
		"next_product": nextProduct,
		"prev_product": prevProduct,
	})
}
