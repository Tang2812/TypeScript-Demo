/**
 * split the spaces and changes string to an array of token (ex: ""3 + 5 * (2 - 8)" -> ["3", "+", "5", "*", "(2", "-", "8)"]")
 */
function splitToTokens(expression: string): string[] {
  const tokens: string[] = [];
  let numberAndOperator = '';

  for (const char of expression) {
    if (/\d|\./.test(char)) {
      numberAndOperator += char;
    } else if (/\s/.test(char)) {
      continue;
    } else {
      if (numberAndOperator.length > 0) {
        tokens.push(numberAndOperator);
        numberAndOperator = '';
      }
      tokens.push(char);
    }
  }

  if (numberAndOperator.length > 0) {
    tokens.push(numberAndOperator);
  }

  return tokens;
}

/**
 * change from array of token to Postfix Expression
 * @param tokens
 * @returns
 */
function toPostfixExpression(tokens: string[]): string[] {
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];
  const operatorPrecedence: { [key: string]: number } = { '+': 1, '-': 1, '*': 2, '/': 2 };

  // handle if token is an operator
  const handleOperator = (token: string) => {
    while (
      operatorStack.length > 0 &&
      operatorPrecedence[operatorStack[operatorStack.length - 1]!]! >= operatorPrecedence[token]!
    ) {
      outputQueue.push(operatorStack.pop()!);
    }
    operatorStack.push(token);
  };

  // handle if token is a parenthesis
  const handleParenthesis = (token: string) => {
    if (token === '(') {
      operatorStack.push(token);
    } else {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.pop();
    }
  };

  for (const token of tokens) {
    if (/\d/.test(token)) {
      outputQueue.push(token);
    } else if ('+-*/'.includes(token)) {
      handleOperator(token);
    } else {
      handleParenthesis(token);
    }
  }

  return outputQueue.concat(operatorStack.reverse());
}


function calculate(rpn: string[]): number {
  const resultStack: number[] = [];

  for (const token of rpn) {
    if (/\d/.test(token)) {
      resultStack.push(parseFloat(token));
    } else {
      const b = resultStack.pop()!;
      const a = resultStack.pop()!;
      switch (token) {
        case '+':
          resultStack.push(a + b);
          break;
        case '-':
          resultStack.push(a - b);
          break;
        case '*':
          resultStack.push(a * b);
          break;
        case '/':
          resultStack.push(a / b);
          break;
      }
    }
  }

  return resultStack[0]!;
}

function evaluateExpression(expression: string): number {
  const tokens = splitToTokens(expression);
  const rpn = toPostfixExpression(tokens);
  return calculate(rpn);
}

// Example
const expression = "(3 + 5) / (2 * 2)";
console.log(evaluateExpression(expression));
