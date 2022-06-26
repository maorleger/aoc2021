package lib

import (
	"strings"
)

func Parse[k any](input []byte, rowParser func(string) (k, error)) ([]k, error) {
	split := strings.Split(strings.TrimSpace(string(input)), "\n")
	parsed := make([]k, len(split))

	for i, n := range split {
		res, err := rowParser(n)
		if err != nil {
			return nil, err
		}

		parsed[i] = res
	}

	return parsed, nil
}
