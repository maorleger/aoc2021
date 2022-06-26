package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"strconv"

	"github.com/maorleger/aoc2021/lib"
)

var check = lib.Check

func one() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, strconv.Atoi)
	check(err)

	last := math.MaxInt32
	count := 0
	for _, n := range items {
		if n > last {
			count++
		}
		last = n
	}
	return count
}

func two() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, strconv.Atoi)
	check(err)

	chunks := lib.Chunk(items, 3)

	last := math.MaxInt32
	count := 0
	for _, chunk := range chunks {
		n := lib.Sum(chunk)

		if n > last {
			count++
		}
		last = n
	}
	return count
}

func main() {
	fmt.Println("part 1: ", one())
	fmt.Println("part 2: ", two())
}
