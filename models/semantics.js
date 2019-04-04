/* THE SYMBOL TABLE */
let symbol_table = { }

let semantic_errors = {
    "scope": function (scope) {
        return new ReferenceError(scope + " was already defined in the scope.")
    }
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

function check (AST) {
    console.log("")
    console.log("")
    console.log(JSON.stringify(AST, null, 2))
    if (AST.type == "program") {
        let routines = AST.body
        for (i in routines) {
            check(routines[i])
        } 
    }

    if (AST.type == "procedure" || AST.type == "function") {
        if (AST.routines) {
            let routines = AST.routines
            for (i in routines) {
                check(routines[i])
            } 
        }
        
        let constants = AST.const
        for (i in constants) {
            /* SCOPE CHECKING */
            if (!symbol_table[AST.name.value])
                symbol_table[AST.name.value] = {} 
            
            if (!symbol_table[AST.name.value][constants[i].name.value])
                symbol_table[AST.name.value][constants[i].name.value] = { value: constants[i].value, type: constants[i].type }
            else
                throw semantic_errors["scope"](variables[i].name.value)
        }

        let variables = AST.variables
        for (i in variables) {
            for (j in variables[i].name) {
                /* SCOPE CHECKING */
                if (!symbol_table[AST.name.value])
                    symbol_table[AST.name.value] = {}    

                if (!symbol_table[AST.name.value][variables[i].name[j].value])
                    symbol_table[AST.name.value][variables[i].name[j].value] = { type: variables[i].type }
                else
                    throw semantic_errors["scope"](variables[i].name[j].value)
            }
        }
    }
    console.log(symbol_table)
}
module.exports.check = check;