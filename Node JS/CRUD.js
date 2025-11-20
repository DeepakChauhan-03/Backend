//File system in Node js CRUD- Create,Read,Update,Delete

const fs = require('fs');
//Create file
fs.writeFileSync("Node JS/Files/banana.txt","This is a fruit.")
fs.writeFileSync("Node JS/Files/apple.txt","This is a fruit.")
fs.writeFileSync("Node JS/Files/mango.txt","This is a fruit.")

//Delete File
fs.unlinkSync("Node JS/Files/mango.txt");

//Read File
const data = fs.readFileSync("Node JS/Files/apple.txt","utf-8");
console.log(data)

//Update File
fs.appendFileSync("Node JS/Files/apple.txt","This is good for health");