package controller

import (
	"net/http"
	"work/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Skill struct {
	Id               int    `json:"id"`
	SkillTypeName    string `json:"skill_type_name"`
	SkillNames       string `json:"name"`
	BackgroundColors string `json:"background_color"`
	ImageURLs        string `json:"image_url"`
}

func GetSkills(c *gin.Context) {
	DB := db.Connect()
	defer DB.Close()
	rows, err := DB.Query("SELECT skill_types.name AS skill_type_name,skills.id, skills.name,skills.background_color,skills.image_url  FROM skill_types INNER JOIN skills ON skill_types.id = skills.skill_type_id;")
	if err != nil {
		panic(err.Error())
	}

	skillsArray := make([]Skill, 0)
	for rows.Next() {
		var skills Skill
		err = rows.Scan(&skills.SkillTypeName, &skills.Id, &skills.SkillNames, &skills.BackgroundColors, &skills.ImageURLs)
		if err != nil {
			panic(err.Error())
		}
		skillsArray = append(skillsArray, skills)
	}

	c.JSON(http.StatusOK, gin.H{
		"skills": skillsArray,
	})
}
