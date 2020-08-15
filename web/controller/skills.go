package controller

import (
	"net/http"
	"work/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Skill struct {
	SkillTypeName    string `json:"skill_type_name"`
	SkillNames       string `json:"skill_names"`
	BackgroundColors string `json:"background_colors"`
	ImageURLs        string `json:"image_urls"`
}

func GetSkills(c *gin.Context) {
	DB := db.Connect()
	defer DB.Close()
	rows, err := DB.Query("SELECT skill_types.name AS skill_type_name,group_concat(distinct skills.name) AS skill_names, group_concat(distinct skills.background_color) AS background_colors,group_concat(distinct skills.image_url) AS image_urls  FROM skill_types INNER JOIN skills ON skill_types.id = skills.skill_type_id GROUP BY skill_type_id;")
	if err != nil {
		panic(err.Error())
	}

	skillsArray := make([]Skill, 0)
	for rows.Next() {
		var skills Skill
		err = rows.Scan(&skills.SkillTypeName, &skills.SkillNames, &skills.BackgroundColors, &skills.ImageURLs)
		if err != nil {
			panic(err.Error())
		}
		skillsArray = append(skillsArray, skills)
	}

	c.JSON(http.StatusOK, gin.H{
		"skills": skillsArray,
	})
}
