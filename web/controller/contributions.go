package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func GetContributions(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"contributions": "con",
	})
}

func main() {

}