let keywords = [
    /* DATA TYPES */
    "character",
    "integer",
    "string",
    "boolean",
    "array",
    "true",
    "false",
    /* PROGRAM */
    "program",
    "begin",
    "end",
    /* DECLARATION */
    "var",
    "function",
    "if",
    "then",
    "else",
    "for",
    "to",
    "of",
    "do"
]

let rules = [
    { token: true, expression: /\'.'/, type: "CHARACTER LITERAL" },
    { token: true, expression: /\'.*\'/, type: "STRING LITERAL" },
    { token: false, expression: /{.*}|\(\*.*\*\)/, type: "COMMENTS" },
    { token: true, expression: /[\+\-]?\d+/, type: "INTEGER LITERAL" },
    { token: true, expression: /;/, type: "SEMICOLON" },
    { token: true, expression: /\./, type: "EOF" },
    { token: true, expression: /,/, type: "COMMA" },
    { token: true, expression: /[%+/*()=\-\[\]]|<|>|<=|>=|:=|:/, type: "OPERATOR" },
    { token: true, expression: /[$a-zA-Z_]+[A-Za-z0-9_]*/, type: "IDENTIFIER" },
    { token: true, expression: /\n/, type: "NEWLINE" },
    { token: false, expression: /\s/, type: "WHITESPACE" }
]

module.exports.keywords = keywords
module.exports.rules = rules