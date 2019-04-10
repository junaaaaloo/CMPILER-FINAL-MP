let keywords = [
    /* DATA TYPES */
    "char",
    "integer",
    "string",
    "real",
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
    "do",
    /* OPERATORS */
    "mod",
    "div",
    "and",
    "or",
    "not"
]

let rules = [
    { token: true, expression: /[\+\-]?[\d]+\.[\d]+/, type: "REAL" },
    { token: true, expression: /\'.\'/, type: "CHARACTER" },
    { token: true, expression: /\'.*\'/, type: "STRING" },
    { token: true, expression: /[\+\-]?\d+/, type: "INTEGER" },
    { token: true, expression: /;/, type: "SEMICOLON" },
    { token: true, expression: /\./, type: "EOF" },
    { token: true, expression: /,/, type: "COMMA" },
    { token: true, expression: /[%+/*()=\-\[\]]|<=|>=|:=|:|<>|<|>/, type: "OPERATOR" },
    { token: true, expression: /[$a-zA-Z_]+[A-Za-z0-9_]*/, type: "IDENTIFIER" },
    { token: false, expression: /{[\s\S]*?}|\(\*[\s\S]*?\*\)/, type: "COMMENTS" },
    { token: true, expression: /\n/, type: "NEWLINE" },
    { token: false, expression: /\s/, type: "WHITESPACE" }
]

let routines = [
    { name: "readln", type: "procedure", args: "*", return_type: "void"},
    { name: "write", type: "procedure", args: "*", return_type: "void"},
    { name: "writeln", type: "procedure", args: "*", return_type: "void"},
]

module.exports.keywords = keywords
module.exports.rules = rules
module.exports.routines = routines