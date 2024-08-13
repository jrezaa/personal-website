export default function QuestionTypePage() {
  const arr1 = [1, 2, 3, 4, 5, 7, 8, 6];
  const arr2 = [8, 7, 6, 5, 4, 3, 2, 1];
  const arr3 = [3, 2, 5, 2, 5, 6, 1];
  console.log(selectionSort(arr3));
  console.log(arr3.sort((a, b) => a - b));
  return <h1>Sorting</h1>;
}

function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr;
}
