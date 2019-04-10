/* MODULES */
let process = require('process')
let fs = require('fs')

/* PERSONAL MODULES */
let lexer = require('./models/lexer')
let parser = require('./models/pascalet')
let evaluator = require('./models/evaluator')

let fileName = process.argv[2]
let debug = process.argv[3] ? true : false
let data = fs.readFileSync(fileName, 'utf8')

lexer.setInput(data)
let tokens = lexer.lex()

let stream = tokens.data.map((token, i) => { return token.value }).join(" ")

let AST = parser.parse(stream)
console.log("** DEBUGGING MODE **")
evaluator.evaluate(AST, debug);
