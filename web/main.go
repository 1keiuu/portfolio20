package main

import (
	"log"
	"work/admincontroller"
	"work/controller"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()

	engine.Use(cors.New(cors.Config{
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
			"PUT",
			"DELETE",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"X-CSRF-Token",
			"Authorization",
		},
		AllowOrigins: []string{
			"http://localhost:4000",
			"http://1k-cove.com",
			"https://1k-cove.com",
		},
	}))

	engine.GET("/api/contributions", controller.GetContributions)
	engine.GET("/api/products", controller.GetProducts)
	engine.GET("/api/products/:id", controller.GetProduct)
	engine.GET("/api/skills", controller.GetSkills)
	engine.POST("/api/contacts", controller.PostContacts)
	engine.POST("/api/admin/signIn", admincontroller.SignIn)
	// engine.POST("/api/admin/createAdminUser", admincontroller.CreateAdminUser)

	engine.Run(":8000")
	if err := engine.Run(); err != nil {
		log.Fatalf("main error: %s", err.Error())
	}
}
