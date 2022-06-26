package lib

func Chunk[k any](items []k, size int) [][]k {
	var chunks [][]k
	start, end := 0, 3
	for end <= len(items) {
		chunks = append(chunks, items[start:end])
		start++
		end++
	}
	return chunks
}

func Sum(items []int) (sum int) {
	for _, n := range items {
		sum += n
	}
	return
}
