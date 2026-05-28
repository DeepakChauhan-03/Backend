let arr = [1, "X", "X"];
let numbers = [];
let romans = [];
let alphabets = [];
for (let i = 0; i < arr.length; i++) {

    if (typeof arr[i] === "number") {
        numbers.push(arr[i]);
    }

    else if (typeof arr[i] === "string") {

        // Single letter = Alphabet
        if (arr[i].length === 1) {
            alphabets.push(arr[i]);
        }

        // Roman 
        else if (/^[IVXLCDM]+$/i.test(arr[i])) {
            romans.push(arr[i]);
        }
    }
}

console.log("Numbers =", numbers);
console.log("Romans =", romans);
console.log("Alphabets =", alphabets);