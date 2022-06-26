package lib

type RunResult[a any] struct {
	Success bool
	Result  *a
	Error   error
}

func Run[a any, b any](
	partOne func() (a, error),
	partTwo func() (b, error)) (RunResult[a], RunResult[b]) {
	res, err := partOne()
	res2, err2 := partTwo()

	retOne := RunResult[a]{
		Success: err == nil,
		Result:  &res,
		Error:   err,
	}

	retTwo := RunResult[b]{
		Success: err2 == nil,
		Result:  &res2,
		Error:   err2,
	}

	return retOne, retTwo

}
