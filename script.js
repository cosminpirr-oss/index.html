const genBtn = document.getElementById("generate-btn");
const startingArray = document.getElementById("starting-array");
const arrayContainer = document.getElementById("array-container");
const sortBtn = document.getElementById("sort-btn");

function generateElement() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateArray() {
  return Array.from({ length: 5 }, () => generateElement());
}

function generateContainer() {
  const row = document.createElement("div");
  row.className = "array-row";
  return row;
}

function fillArrContainer(el, arr) {
  el.innerHTML = "";
  arr.forEach((num) => {
    const span = document.createElement("span");
    span.className = "array-item";
    span.textContent = num;
    el.appendChild(span);
  });
}

function isOrdered(a, b) {
  return a <= b;
}

function swapElements(arr, i) {
  if (!isOrdered(arr[i], arr[i + 1])) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
  }
}

function highlightCurrentEls(el, i) {
  if (el.children[i] && el.children[i + 1]) {
    el.children[i].classList.add("active");
    el.children[i + 1].classList.add("active");
  }
}

function clearSteps() {
  arrayContainer.innerHTML = "";
}

function showPlaceholder(message) {
  clearSteps();
  const placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  placeholder.textContent = message;
  arrayContainer.appendChild(placeholder);
}

genBtn.addEventListener("click", () => {
  const arr = generateArray();
  fillArrContainer(startingArray, arr);
  showPlaceholder("Array generat. Apasă pe „Sortează” pentru a vedea pașii.");
});

sortBtn.addEventListener("click", () => {
  if (!startingArray.children.length) {
    showPlaceholder("Generează mai întâi un array.");
    return;
  }

  clearSteps();

  const arr = Array.from(startingArray.children).map((el) => Number(el.textContent));
  highlightCurrentEls(startingArray, 0);

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - i - 1; j++) {
      const step = generateContainer();
      fillArrContainer(step, arr);
      highlightCurrentEls(step, j);
      arrayContainer.appendChild(step);

      if (!isOrdered(arr[j], arr[j + 1])) {
        swapElements(arr, j);
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  const finalStep = generateContainer();
  fillArrContainer(finalStep, arr);
  arrayContainer.appendChild(finalStep);
});
