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
			"http://ec2-54-249-216-252.ap-northeast-1.compute.amazonaws.com",
		},
	}))

	engine.GET("/api/contributions", controller.GetContributions)
	engine.POST("/api/admin/signIn", admincontroller.SignIn)
	engine.POST("/api/admin/createAdminUser", admincontroller.CreateAdminUser)

	engine.Run(":8000")
	if err := engine.Run(); err != nil {
		log.Fatalf("main error: %s", err.Error())
	}
}
