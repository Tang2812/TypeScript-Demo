function checkSudoku(sudoku: string[][]): boolean {
    // check row
    const Counts = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    for (const row in Counts) {
        let numberInRow: string[] = [];
        for (const col in Counts) {
            const item = sudoku[row]![col];
            if (numberInRow.includes(item!)) {
                return false;
            } else {
                if (item !== ".") {
                    numberInRow.push(item!)
                }
            }
        }
    }

    // check collum
    for (const col in Counts) {
        let numberInCol: string[] = [];
        for (const row in Counts) {
            const item = sudoku[row]![col];
            if (numberInCol.includes(item!)) {
                return false;
            } else {
                if (item !== ".") {
                    numberInCol.push(item!)
                }
            }
        }
    }

    // check box 3x3
    const blocks = [
        [0, 0], [0, 3], [0, 6],
        [3, 0], [3, 3], [3, 6],
        [6, 0], [6, 3], [6, 6]
    ];

    for (const [startRow, starCol] of blocks) {
        let numberInBlox: string[] = [];
        for (const row in [startRow, startRow! + 1, startRow! + 2]) {
            for (const col in [starCol, starCol! + 1, starCol! + 2]) {
                const item = sudoku[row]![col];
                if (numberInBlox.includes(item!)) {
                    return false;
                } else {
                    if (item !== ".") {
                        numberInBlox.push(item!)
                    }
                }
            }
        }
    }

    return true;
}

const testCase =
    [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]

console.log(checkSudoku(testCase))
