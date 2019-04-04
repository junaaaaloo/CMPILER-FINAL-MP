let scanner = require("readline-sync")

let symbol_table = { }
let routines = { 
    "writeln": function(...args) {
        for (i in args)
            process.stdout.write(args[i] + " ")
        process.stdout.write("\n")
    },
    "write": function(...args) {
        for (i in args)
            process.stdout.write(args[i] + " ")
    },
    "readln": function (...args) {
        let input =  scanner.question(args[0]);
        
        return evaluate({
            type: determine_type(input),
            value: input
        })
    }
}

let default_values = {
    "character": "",
    "string": "",
    "integer": 0,
    "boolean": true
}

function determine_type (value) {
    if (value.match(/[\+\-]?\d+/)) {
        return "integer";
    } else if (value.match(/true|false/)) {
        return "boolean";
    } else if (value.match(/[.]/)) {
        return "character";
    } else {
        return "string";
    }
}

function evaluate (AST) {
    if (!AST) {
        return;
    }

    if (AST.type == "program") {
        let routines = AST.body
        for (i in routines) {
            evaluate(routines[i])
        } 
    }

    if (AST.type == "procedure") {
        if (AST.routines) {
            let routines = AST.routines
            for (i in routines) {
                evaluate(routines[i])
            } 
        }

        let constant_values = AST.const
        for (i in constant_values) {
            let const_value = {
                "value": constant_values[i].value.replace(/[\']/g, ""),
                "type": constant_values[i].type,
                "constant": true, 
                "scope": AST.name
            }

            if (symbol_table[constant_values[i].name.value])
                symbol_table[constant_values[i].name.value].push(const_value)
            else
                symbol_table[constant_values[i].name.value] = [const_value]
        }

        let declaration_list = AST.variables
        
        for (i in declaration_list) {
            let declaration = declaration_list[i]
            for (j in declaration.name) {
                    
                let declaration_symbol = {
                    "value": default_values[declaration_list[i].type],
                    "type": declaration_list[i].type,
                    "scope": AST.name
                }

                if (symbol_table[declaration_list[i].name[j].value])
                    symbol_table[declaration_list[i].name[j].value].push(declaration_symbol)
                else
                    symbol_table[declaration_list[i].name[j].value] = [declaration_symbol]
            }
        }

        let statements = AST.body;

        for (i in statements) {
            let statement = AST.body[i]
            evaluate(statement)
        }
    }

    if (AST.type == "integer") {
        AST.value = parseInt(AST.value)
        return AST;
    }

    if (AST.type == "string") {
        AST.value = AST.value.replace(/'/g, "");
        return AST;
    }

    if (AST.type == "operator") {
        switch(AST.operator) {
            case "+":
                return {
                    type: "integer",
                    value: evaluate(AST.lhs).value + evaluate(AST.rhs).value
                }
            case "-":
                return {
                    type: "integer",
                    value: evaluate(AST.lhs).value - evaluate(AST.rhs).value
                }
            case "/":
                return {
                    type: "integer",
                    value: evaluate(AST.lhs).value / evaluate(AST.rhs).value
                }
            case "*":
                return {
                    type: "integer",
                    value: evaluate(AST.lhs).value * evaluate(AST.rhs).value
                }
            case "%":
                return {
                    type: "integer",
                    value: evaluate(AST.lhs).value % evaluate(AST.rhs).value
                }
            case ":=":
                return {
                    type: "boolean",
                    value: evaluate(AST.lhs).value = evaluate(AST.rhs).value
                }
                break;
        }
    }

    if (AST.type == "call") {
        let arguments = []
        for (i in AST.args) {
            arguments.unshift(evaluate(AST.args[i]).value)
        }
        
        return routines[AST.name.value](...arguments)
    }


    if (AST.type == "identifier") {
        return symbol_table[AST.value];
    }   
}

module.exports.evaluate = evaluate