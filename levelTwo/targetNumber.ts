export default function targetNubmer(numbers: number[], target: number) {
  let result = 0;
  sum(numbers, target, 0);
  function sum(numbers: number[], target: number, current: number) {
    if (numbers.length === 0) {
      if (target === current) result++;
      return;
    }
    sum(numbers.slice(0,numbers.length-1), target, current + numbers[numbers.length-1]);
    sum(numbers.slice(0,numbers.length-1), target, current - numbers[numbers.length-1]);
  }
  return result;
}

function isValid(numbers: number[], target: number, current: number): boolean {
  return (
    target <= numbers.reduce((sum, item) => sum + item, current) &&
    target >= numbers.reduce((minus, item) => minus - item, current)
  );
}

targetNubmer([1, 1, 1, 1, 1], 3);
