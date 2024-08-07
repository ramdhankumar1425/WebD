/*************************** Accessing required elements *********************/
let barsDiv = document.querySelector(".barsDiv");
let playPauseBtn = document.querySelector(".playIcon");
let sortAlgoType = document.querySelector(".algoSelector select");
let slider = document.querySelector("#inputSize");
let speed = document.querySelector("#speed");
/*************************** Accessing required elements *********************/

// declaring some global vars to access in all functions
let arr = [];
const maxElement = 1000;
const heightCoff = 88 / maxElement;
let bars;
let speedVal;

/*************************** Support functions for sorting algorithms *********************/

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateBarHeight(idx) {
  let el = arr[idx];

  let h = heightCoff * el;

  bars[idx].style.height = `${h}vh`;
}

async function changeBarColor(idx, currColor, targetColor, sleepTime) {
  bars[idx].style.backgroundColor = targetColor;
  await sleep(sleepTime);
  bars[idx].style.backgroundColor = currColor;
}

function swap(idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

async function merge(left, right) {
  // sleepTime according to user choice
  let sleepTime;
  if (speedVal === "Fast") sleepTime = 10;
  else if (speedVal === "Medium") sleepTime = 50;
  else sleepTime = 100;

  for (let i = left; i <= right; i++) {
    updateBarHeight(i);
  }
  let mid = Math.floor(left + (right - left) / 2);

  let size1 = mid - left + 1;
  let size2 = right - mid;

  let first = new Array(size1);
  let second = new Array(size2);
  let k = left;

  // copy values from original array
  for (let i = 0; i < size1; i++) {
    first[i] = arr[k++];
  }
  for (let i = 0; i < size2; i++) {
    second[i] = arr[k++];
  }

  // merge first and second and paste in original array
  let i = 0,
    j = 0;
  k = left;

  while (i < size1 && j < size2) {
    if (first[i] < second[j]) {
      arr[k++] = first[i++];
    } else {
      arr[k++] = second[j++];
    }
    updateBarHeight(k - 1);
    await changeBarColor(k - 1, "green", "red", sleepTime);
  }
  // if elements left in first array
  while (i < size1) {
    arr[k++] = first[i++];
    updateBarHeight(k - 1);
    await changeBarColor(k - 1, "green", "red", sleepTime);
  }
  // if elements left in second array
  while (j < size2) {
    arr[k++] = second[j++];
    updateBarHeight(k - 1);
    await changeBarColor(k - 1, "green", "red", sleepTime);
  }
  for (let i = left; i <= right; i++) {
    bars[i].style.backgroundColor = "green";
  }
}

async function partition(left, right) {
  // sleepTime according to user choice
  let sleepTime;
  if (speedVal === "Fast") sleepTime = 60;
  else if (speedVal === "Medium") sleepTime = 200;
  else sleepTime = 500;

  let pivot = arr[left];

  let count = 0;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < pivot) {
      count++;
    }
  }

  let pivotIdx = left + count;

  swap(left, pivotIdx);
  updateBarHeight(left);
  updateBarHeight(pivotIdx);
  await changeBarColor(left, "aqua", "green", sleepTime);
  await changeBarColor(pivotIdx, "aqua", "green", sleepTime);

  let low = left;
  let high = right;

  while (low < pivotIdx && high > pivotIdx) {
    while (arr[low] < pivot && low < pivotIdx) {
      low++;
    }
    while (arr[high] >= pivot && high > pivotIdx) {
      high--;
    }

    if (low < pivotIdx && high > pivotIdx) {
      swap(low, high);
      updateBarHeight(low);
      updateBarHeight(high);
      await changeBarColor(low, "aqua", "green", sleepTime);
      await changeBarColor(high, "aqua", "green", sleepTime);
      low++;
      high--;
    }
  }
  return pivotIdx;
}

async function finalColorTravel(sleepTime) {
  for (let i = 0; i < arr.length; i++) {
    bars[i].style.backgroundColor = "green";
    await sleep(sleepTime);
  }
}
/*************************** Support functions for sorting algorithms *********************/

/**************************************************** SORTING ALGORITHMS ***********************************************/
async function bubbleSort() {
  let n = arr.length;

  // sleepTime according to user choice
  let sleepTime;
  if (speedVal === "Fast") sleepTime = 0.1;
  else if (speedVal === "Medium") sleepTime = 30;
  else sleepTime = 100;

  // Loop for passes
  for (let i = 1; i < n; i++) {
    // Loop for each pass
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(j, j + 1);
        updateBarHeight(j);
        updateBarHeight(j + 1);
        await changeBarColor(j + 1, "aqua", "green", sleepTime);
      }
    }
  }
}
async function selectionSort() {
  let n = arr.length;

  // sleepTime according to user choice
  let sleepTime;
  if (speedVal === "Fast") sleepTime = 10;
  else if (speedVal === "Medium") sleepTime = 90;
  else sleepTime = 350;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    await changeBarColor(i, "aqua", "green", sleepTime);
    await changeBarColor(minIdx, "aqua", "green", sleepTime);
    swap(i, minIdx);
    updateBarHeight(i);
    updateBarHeight(minIdx);
  }
}
async function insertionSort() {
  let n = arr.length;

  // sleepTime according to user choice
  let sleepTime;
  if (speedVal === "Fast") sleepTime = 0.1;
  else if (speedVal === "Medium") sleepTime = 30;
  else sleepTime = 100;

  let j;
  for (let i = 1; i < n; i++) {
    let val = arr[i];
    for (j = i - 1; j >= 0; j--) {
      if (arr[j] <= val) {
        break;
      }
      arr[j + 1] = arr[j];
      updateBarHeight(j + 1);
      await changeBarColor(j + 1, "aqua", "green", sleepTime);
    }
    arr[j + 1] = val;
    updateBarHeight(j + 1);
    await changeBarColor(j + 1, "aqua", "green", sleepTime);
  }
}
async function mergeSort(left, right) {
  if (left >= right) return;

  let mid = Math.floor(left + (right - left) / 2);

  // sort left half
  await mergeSort(left, mid);

  // sort right half
  await mergeSort(mid + 1, right);

  // merge both sorted halves
  await merge(left, right);
}
async function quickSort(left, right) {
  // base case
  if (left >= right) {
    return;
  }

  const p = await partition(left, right);
  await Promise.all([quickSort(left, p - 1), quickSort(p + 1, right)]);
}
/************************************************ SORTING ALGORITHMS ****************************************************/

/************************************************** SORT FUNCTION ******************************************************/
async function sort() {
  let algoType = sortAlgoType.value;

  if (algoType === "BubbleSort") {
    await bubbleSort();
  } else if (algoType === "SelectionSort") {
    await selectionSort();
  } else if (algoType === "InsertionSort") {
    await insertionSort();
  } else if (algoType === "MergeSort") {
    await mergeSort(0, arr.length - 1);
  } else if (algoType === "QuickSort") {
    await quickSort(0, arr.length - 1);
  }

  // final color travel over array
  finalColorTravel(20);
}
/*************************************************** SORT FUNCTION *****************************************************/

/*********************** Function to generate random array ******************/

function randomArr(arrSize) {
  let size = arrSize;
  let arr = [];
  // to fill the arr
  for (let i = 0; i < size; i++) {
    // generate a random element for arr
    let el = Math.floor(Math.random() * maxElement);
    arr[i] = el;
  }
  return arr;
}
/*********************** Function to generate random array ******************/

/*********************** Function to remove current Bars ******************/
function removeBars() {
  console.log("Removing bars");
  barsDiv.innerHTML = "";
}
/*********************** Function to remove current Bars ******************/

/******* Function to generate Bars *******/
function generateBars() {
  // generating bars
  for (let el of arr) {
    let newBar = document.createElement("div");

    let h = heightCoff * el;
    let w = 90 / arr.length;
    newBar.style.height = `${h}vh`;
    newBar.style.width = `${w}vw`;

    barsDiv.append(newBar);
  }
}
/******* Function to generate Bars *******/

/******* Function to initialze bars *******/
(function () {
  let size = slider.value;
  arr = randomArr(size);
  generateBars();
  bars = document.querySelectorAll(".barsDiv div");
})();
/******* Function to initialze bars *******/

/**************************************************Event Listeners *******************************************/

/******* Play/Pause button eventListener *******/
playPauseBtn.addEventListener("click", async () => {
  speedVal = speed.value;
  sort(speedVal);
});
/******* Play/Pause button eventListener *******/

/******* ArraySize Slider eventListener *******/
slider.addEventListener("input", () => {
  // console.log("Changing arrSize");
  // console.log(slider.value);
  arr = randomArr(slider.value);
  removeBars();
  generateBars();
  bars = document.querySelectorAll(".barsDiv div");
  console.log(arr);
});
/******* ArraySize Slider eventListener *******/
