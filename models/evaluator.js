let scanner = require('readline-sync')
let symbol_table = { }
let scope = [ ]

let default_values = {
    "char": "",
    "string": "",
    "integer": 0,
    "boolean": true,
    "real": 0.0,
    "array": {}
}

function die (message) {
    throw new Error (message)
}

function determine_type (value) {
    if (value.match(/[\+\-]?\d+\.\d+/)) {
        return "real";
    } else if (value.match(/[\+\-]?\d+/)) {
        return "integer";
    } else if (value.match(/./g) && value.length == 1) {
        return "char";
    } else if (value.match(/true|false/)) {
        return "boolean"
    } else if (value.data_type && value.data_type.name == "array") {
        return "array["+value.data_type.data_type+"]"
    } else {
        return "string";
    }
}

let routines = {
    "writeln": {
        "execute": function(args) {
            for (i in args)
                process.stdout.write(args[i].value.toString())
            process.stdout.write("\n")
        }
    },
    "write": {   
        "execute": function(args) {
            for (i in args)
                process.stdout.write(args[i].value.toString())
        }
    },
    "readln": {
        "execute": function (args) {
            
            for (i in args) {
                
                let input =  scanner.question();
                
                if (args[i].data_type != determine_type(input) && args[i].data_type != "string")
                    die("[RUNTIME] Datatype mismatch: " + args[i].data_type + " != " + determine_type(input))
                
                if (args[i].constant)
                    die("[RUNTIME] Attempting to change constant value " + args[i].name.value)
                switch(args[i].data_type) {
                    case "integer":
                        args[i].value = parseInt(input);
                        break;
                    case "real":
                        args[i].value = parseFloat(input);
                        break;
                    case "boolean":
                        args[i].value = input == "true";
                        break;
                    case "char":
                    case "string":
                        args[i].value = input;
                        break;
                    default:
                        break;
                }
            }

            return args;
        }
    }
}   

function message (str) {
    process.stdout.write(str)
    scanner.question(null, {hideEchoBack: true, mask: ""})
}
function evaluate (AST, debug) {
    if (!AST) {
        return;
    }

    if (AST.type == "program") {
        scope.unshift(AST.name.value)
        let subroutines = AST.routines
        debug && message("Running the program " +AST.name.value)
        for (i in subroutines) {
            evaluate(subroutines[i], debug)
        } 
    }

    if (AST.type == "procedure" || AST.type == "function") {
        debug && message("FUNCTION: " + JSON.stringify(AST))
        if (AST.routines) {
            let subroutines = AST.routines
            for (i in subroutines) {
                let subroutine = subroutines[i]
                
                routines[subroutine.name.value] = {
                    execute (args) {
                        scope.unshift(this.data.name.value)
                        let c = 0;

                        if (this.data.return_type) {
                            if (!symbol_table[this.data.name.value]) {
                                symbol_table[this.data.name.value] = { }
                            }

                            let param_symbol = {
                                "value": default_values[this.data.return_type],
                                "data_type": this.data.return_type,
                                "scope": scope[0]
                            }

                            symbol_table[this.data.name.value][scope[0]] = param_symbol
                        }

                        for (i in this.data.params) {
                            let param_data = this.data.params[i]
                            for (j in param_data.name) {
                                let param = param_data.name[j]
                                let param_symbol = {
                                    "value": args[c].value,
                                    "data_type": args[c].data_type,
                                    "scope": scope[0]
                                }

                                if (!symbol_table[param.value]) {
                                    symbol_table[param.value] = { }
                                }
                                symbol_table[param.value][scope[0]] = param_symbol
                                c++;
                            }
                        }
                        
                        evaluate(this.data, debug)
                        
                        if (this.data.return_type) {
                            let returned_data = (symbol_table[this.data.name.value][scope[0]])
                            sc = scope.shift();
                            return returned_data
                        }

                        sc = scope.shift();
                        for (vars in symbol_table) {
                            delete symbol_table[vars][sc]
                            if (symbol_table[vars] == {})
                                delete symbol_table[vars]
                        }
                                
                    },
                    data: subroutine
                }
            } 

        }


        let constant_values = AST.const
        for (i in constant_values) {
            
            let const_value = {
                "name": constant_values[i].name,
                "value": constant_values[i].value.replace(/[\']/g, ""),
                "data_type": constant_values[i].type,
                "constant": true, 
                "scope": scope[0]
            }

            let constant_name = constant_values[i].name.value
            if (!symbol_table[constant_name])
                symbol_table[constant_name] = { }

            symbol_table[constant_name][scope[0]] = const_value
            
        }

        let declaration_list = AST.variables
        
        for (i in declaration_list) {
            let declaration = declaration_list[i]
            for (j in declaration.name) {
                    
                let declaration_symbol = {
                    "value": default_values[declaration.data_type.name ? declaration.data_type.name : declaration.data_type],
                    "data_type": declaration.data_type,
                    "scope": scope[0]
                }

                if (!symbol_table[declaration.name[j].value])
                    symbol_table[declaration.name[j].value] = { }
                
                if (declaration.data_type && declaration.data_type.name == "array") {
                    lower = evaluate(declaration_symbol.data_type.range[0], debug).value
                    upper = evaluate(declaration_symbol.data_type.range[1], debug).value
                    
                    for (let k = lower; k <= upper; k++) {
                        declaration_symbol.value[k] = {
                            type: declaration_symbol.data_type.data_type,
                            value: default_values[declaration_symbol.data_type.data_type]
                        }
                    }
                }

                symbol_table[declaration.name[j].value][scope[0]] = declaration_symbol
            }
        }

        let statements = AST.body;

        for (i in statements) {
            let statement = AST.body[i]
            evaluate(statement, debug)
        }
    }

    if (AST.type == "integer") {
        AST.value = parseInt(AST.value)
        return AST;
    }

    if (AST.type == "real") {
        AST.value = parseFloat(AST.value)
        return AST;
    }

    if (AST.type == "string") {
        AST.value = AST.value.replace(/'/g, "");
        return AST;
    }

    if (AST.type == "char") {
        AST.value = AST.value.replace(/'/g, "");
        return AST;
    }

    if (AST.type == "boolean") {
        AST.value = (AST.value == "true")
        return AST;
    }



    if (AST.type == "unary operator") {
        switch(AST.operator) {
            case "-":
                return {
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value * -1
                }
            case "+":
                return {
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value
                }
            case "not":
                return {
                    type: "boolean",
                    value: !evaluate(AST.args[0], debug).value
                }
        }
    
    }

    if (AST.type == "array access") {
        return symbol_table[AST.name][scope[0]].value[evaluate(AST.args, debug).value]
    }


    if (AST.type == "binary operator") {
        switch(AST.operator) {
            case "+":
                return evaluate({
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value + evaluate(AST.args[1], debug).value
                })
            case "-":
                return evaluate({
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value - evaluate(AST.args[1], debug).value
                })
            case "div":
            case "/":
                if (evaluate(AST.args[1], debug).value == 0)
                    throw new Error("[RUNTIME] Error division by 0")
                return evaluate({
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value / evaluate(AST.args[1], debug).value
                })
            case "*":
                return {
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value * evaluate(AST.args[1], debug).value
                }
            case "mod":
            case "%":
                if (evaluate(AST.args[1], debug).value == 0)
                    throw new Error("[RUNTIME] Error division by 0")
                return evaluate({
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value % evaluate(AST.args[1], debug).value
                })
            case ":=":
                return {
                    type: AST.data_type,
                    value: evaluate(AST.args[0], debug).value = evaluate(AST.args[1], debug).value
                }
            case ":":
                return {
                    type: "string",
                    value: evaluate(AST.args[0], debug).value.toString().padStart(evaluate(AST.args[1], debug).value)
                }
            case ">":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value > evaluate(AST.args[1], debug).value
                }
            case "<":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value < evaluate(AST.args[1], debug).value
                }
            case "=":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value == evaluate(AST.args[1], debug).value
                }
            case "<>":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value != evaluate(AST.args[1], debug).value
                }
            case ">=":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value >= evaluate(AST.args[1], debug).value
                }
            case "<=":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value >= evaluate(AST.args[1], debug).value
                }
            case "and":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value && evaluate(AST.args[1], debug).value
                }
            case "or":
                return {
                    type: "boolean",
                    value: evaluate(AST.args[0], debug).value || evaluate(AST.args[1], debug).value
                }
        }
    }

    if (AST.type == "call") {
        let arguments = []
        
        for (i in AST.args) {
            arguments.push(evaluate(AST.args[i], debug))
        }

        return routines[AST.name.value].execute(arguments)
    }


    if (AST.type == "identifier") {
        for (i in scope) {
            if (symbol_table[AST.value] && symbol_table[AST.value][scope[i]])
                break;
        }
            
        return symbol_table[AST.value] && symbol_table[AST.value][scope[i]];
    }  

    if (AST.type == "ternary operator") {
        switch(AST.operator) {
            case ':':
                return evaluate({
                    type: "string",
                    value: evaluate(AST.args[0], debug).value
                        .toFixed(evaluate(AST.args[2], debug).value)
                        .toString().padStart(evaluate(AST.args[1].value, debug))
                })
        }
    }

    if (AST.type == "conditional operator") {
        switch(AST.operator) {
            case "if":
                if (evaluate(AST.condition, debug).value) {
                    for (i in AST.if) {
                        let statement = AST.if[i]
                        evaluate(statement, debug);
                    }
                }
                break;
            case "if-else":
                if (evaluate(AST.condition, debug).value) {
                    for (i in AST.if) {
                        let statement = AST.if[i]
                        evaluate(statement, debug);
                    }
                } else {
                    for (i in AST.else) {
                        let statement = AST.else[i]
                        evaluate(statement, debug);
                    }
                }
                break;
        }
    }

    if (AST.type == "iterative operator") {
        switch(AST.operator) {
            case "for":
                let limit = evaluate(AST.range[1], debug).value
                let start = evaluate(AST.range[0], debug).value
                
                for (symbol_table[AST.variable.value][scope[0]].value = start; 
                    symbol_table[AST.variable.value][scope[0]].value <= limit; 
                    symbol_table[AST.variable.value][scope[0]].value++) {
                    for (j in AST.statements) {
                        let statement = AST.statements[j]
                        evaluate(statement, debug);
                    }
                }
                symbol_table[AST.variable.value][scope[0]].value = limit
                break;
            case "while":
                while (evaluate(AST.condition, debug).value) {
                    for (j in AST.statements) {
                        let statement = AST.statements[j]
                        evaluate(statement, debug)
                    }
                }
                break;
            case "repeat-until":
                do {
                    for (j in AST.statements) {
                        let statement = AST.statements[j]
                        evaluate(statement, debug)
                    }
                } while (evaluate(AST.condition, debug).value)
                break;
        }
    }
}

function debug () {
    console.log(JSON.stringify(symbol_table, null, 2))
    console.log(JSON.stringify(scope, null, 0))
}

module.exports.evaluate = evaluate