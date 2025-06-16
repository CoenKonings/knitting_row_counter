package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type action struct {
	ID			string	`json:"id"`
	Name		string	`json:"name"`
	CycleLength	int		`json:"cycleLength"`
	NumCycles	int		`json:"numCycles"`
	StartCount	int		`json:"startCount"`
}

var actions = []action {
	{ID: "1", Name: "increase", CycleLength: 4, NumCycles: 7, StartCount: 3},
	{ID: "2", Name: "change color", CycleLength: 4, NumCycles: 7, StartCount: 7},
}

func main() {
	router := gin.Default()
	router.GET("/actions", getActions)

	router.Run(":3000")
}

func getActions(context *gin.Context) {
	context.IndentedJSON(http.StatusOK, actions)
}
