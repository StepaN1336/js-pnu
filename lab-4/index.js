const denseArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 20000));
const sparseArray = [...denseArray];
for (let i = 0; i < sparseArray.length; i += 40) {
    delete sparseArray[i];
}

console.log("=== Dense Array Sorting ===");
console.log(`--- Starting Array ---\n${denseArray}`);
console.log(sortLib.bubbleSort(denseArray));
console.log(sortLib.selectionSort(denseArray, false));
console.log(sortLib.insertionSort(denseArray));
console.log(sortLib.shellSort(denseArray, false));
console.log(sortLib.quickSort(denseArray));

console.log("\n=== Sparse Array Sorting ===");
console.log(`--- Starting Array ---\n${sparseArray}`);
console.log(sortLib.bubbleSort(sparseArray, false));
console.log(sortLib.selectionSort(sparseArray));
console.log(sortLib.insertionSort(sparseArray));
console.log(sortLib.shellSort(sparseArray));
console.log(sortLib.quickSort(sparseArray, false));