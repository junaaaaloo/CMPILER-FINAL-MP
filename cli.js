/* MODULES */
let process = require('process')
let fs = require('fs')

/* PERSONAL MODULES */
let lexer = require('./models/lexer')
let parser = require('./models/pascalet')

let fileName = process.argv[2]
let data = fs.readFileSync(fileName, 'utf8')

console.log("--" + fileName + "--")
lexer.setInput(data)
let tokens = lexer.lex()

let stream = tokens.data.map((token, i) => { return token.value }).join("")
console.log(stream)
try {
    parser.parse(stream)
} catch (error) {
    console.log("\n" + error.message + "\n")
}