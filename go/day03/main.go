package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	"github.com/maorleger/aoc2021/lib"
)

var check = lib.Check

func rowParser(row string) ([]string, error) {
	fields := strings.Split(row, "")
	return fields, nil
}

func mostCommonBit(items [][]string, idx int) string {
	var zeroCount, oneCount int
	for _, item := range items {
		if item[idx] == "0" {
			zeroCount++
		} else if item[idx] == "1" {
			oneCount++
		} else {
			panic(item)
		}
	}

	if zeroCount <= oneCount {
		return "1"
	} else {
		return "0"
	}
}

func toInt(digits []string) int {
	result, err := strconv.ParseInt(strings.Join(digits, ""), 2, 0)
	if err != nil {
		panic(err)
	}
	return int(result)
}

func one() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, rowParser)
	check(err)

	gamma := make([]string, len(items[0]))
	epsilon := make([]string, len(items[0]))
	for i := 0; i < len(gamma); i++ {
		if mostCommonBit(items, i) == "0" {
			gamma[i] = "0"
			epsilon[i] = "1"
		} else {
			gamma[i] = "1"
			epsilon[i] = "0"
		}
	}

	return toInt(gamma) * toInt(epsilon)
}

func filter(items [][]string, idx int, value string) [][]string {
	var result [][]string
	for _, item := range items {
		if item[idx] == value {
			result = append(result, item)
		}
	}
	return result
}

func two() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, rowParser)
	check(err)

	oxyRating := items
	i := 0
	for len(oxyRating) > 1 {
		oxyRating = filter(oxyRating, i, mostCommonBit(oxyRating, i))
		i++
	}

	co2ScrbrRating := items
	i = 0
	for len(co2ScrbrRating) > 1 {
		leastCommonBit := "0"
		if mostCommonBit(co2ScrbrRating, i) == "0" {
			leastCommonBit = "1"
		}
		co2ScrbrRating = filter(co2ScrbrRating, i, leastCommonBit)
		i++
	}

	return toInt(co2ScrbrRating[0]) * toInt(oxyRating[0])
}

func main() {
	fmt.Println("part 1: ", one())
	fmt.Println("part 2: ", two())
}
