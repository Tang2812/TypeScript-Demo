// return false if has duplication in row
function checkRow(sudoku: string[][], row: number): boolean {
  const numberInRow: string[] = [];
  for (let col = 0; col < 9; col++) {
    const item = sudoku[row]![col];
    if (numberInRow.includes(item!)) {
      return false;
    } else {
      if (item !== ".") {
        numberInRow.push(item!);
      }
    }
  }
  return true;
}

// return false if has duplication in col
function checkCol(sudoku: string[][], col: number): boolean {
  const numberInCol: string[] = [];
  for (let row = 0; row < 9; row++) {
    const item = sudoku[row]![col];
    if (numberInCol.includes(item!)) {
      return false;
    } else {
      if (item !== ".") {
        numberInCol.push(item!);
      }
    }
  }
  return true;
}

// return false if has duplication in block
function checkBlock(sudoku: string[][], startRow: number, startCol: number): boolean {
  const numberInBlock: string[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const item = sudoku[startRow + i]![startCol + j];
      if (numberInBlock.includes(item!)) {
        return false;
      } else {
        if (item !== ".") {
          numberInBlock.push(item!);
        }
      }
    }
  }
  return true;
}

function checkSudoku(sudoku: string[][]): boolean {
  const Counts = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // Check rows
  for (const row of Counts) {
    if (!checkRow(sudoku, row)) {
      return false;
    }
  }

  // Check columns
  for (const col of Counts) {
    if (!checkCol(sudoku, col)) {
      return false;
    }
  }

  // Check 3x3 blocks
  const blocks = [
    [0, 0], [0, 3], [0, 6],
    [3, 0], [3, 3], [3, 6],
    [6, 0], [6, 3], [6, 6]
  ];

  for (const [startRow, startCol] of blocks) {
    if (!checkBlock(sudoku, startRow!, startCol!)) {
      return false;
    }
  }

  return true;
}

const testCase = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

// example
console.log(checkSudoku(testCase));
