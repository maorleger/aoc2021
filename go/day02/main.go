package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"

	"github.com/maorleger/aoc2021/lib"
)

var check = lib.Check

type Command struct {
	direction string
	amount    int
}

type Submarine struct {
	horizontal int
	depth      int
	aim        int
}

func rowParser(row string) (*Command, error) {
	fields := strings.Split(row, " ")
	if len(fields) < 2 {
		return nil, fmt.Errorf("invalid row data: %s", row)
	}
	direction := fields[0]
	amount, err := strconv.Atoi(fields[1])
	if err != nil {
		return nil, err
	}

	return &Command{
		direction: direction,
		amount:    amount,
	}, nil
}

func one() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, rowParser)
	check(err)

	var position Submarine

	for _, n := range items {
		switch n.direction {
		case "forward":
			position.horizontal += n.amount
		case "down":
			position.depth += n.amount
		case "up":
			position.depth -= n.amount
		}
	}

	return position.depth * position.horizontal
}

func two() int {
	input, err := ioutil.ReadFile("./input.txt")
	check(err)
	items, err := lib.Parse(input, rowParser)
	check(err)

	var position Submarine

	for _, n := range items {
		switch n.direction {
		case "forward":
			position.horizontal += n.amount
			position.depth += n.amount * position.aim
		case "down":
			position.aim += n.amount
		case "up":
			position.aim -= n.amount
		}
	}

	return position.depth * position.horizontal
}

func main() {
	fmt.Println("part 1: ", one())
	fmt.Println("part 3: ", two())
}
