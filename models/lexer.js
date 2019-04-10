/* MODULES */
const Lexer = require('lex')
/* PERSONAL MODULES */
const values = require('./values')

class LexicalError extends Error { }

tokens = []
const lexer = new Lexer((token) => {
    lexer.debug && console.log("[" + token + "]" + " Unexpected character")
    throw new LexicalError("[LEXICAL] Unexpected character token: \'" + token + "\'")
})

tokens = []
    
lexer.setDebug = (condition) => {
    lexer.debug = condition
}

for (i in values.keywords) {
    let keyword = values.keywords[i]
    let expression = new RegExp(keyword,"i")
    let handler = (token) => {
        lexer.debug && console.log("[" + token + "] (KEYWORD)")
        tokens.push({
            "value": token.toLowerCase(),
            "type": "KEYWORD"
        })
    }

    lexer.addRule(expression, handler)
}

for (i in values.rules) {
    let rule = values.rules[i]
    let expression = new RegExp(rule.expression, "i")
    let handler = (token) => {
        if (rule.type && rule.token) {
            lexer.debug && console.log("[" + token + "] (" + rule.type + ")")
            tokens.push({
                "value": rule.type == "IDENTIFIER" ? token.toLowerCase() : token,
                "type": rule.type
            })
        }
    }

    lexer.addRule(expression, handler)
}

lexer.addRule(/$/, (token) => {
    lexer.debug && console.log("[EOF]")
    return {
        'status': "SUCCESS",
        'data': tokens
    }
})

module.exports = lexer