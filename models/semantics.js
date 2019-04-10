
let values = require('./values')
function finalize_datatype (item) {
    if (item.data_type && item.data_type.name == "array")
        return item.data_type.data_type

    if (item.type == "array access") {
        lower = parseInt(item.data_type.range[0].value)
        
        upper = parseInt(item.data_type.range[1].value)

        acessing = parseInt(item.args.value)

        if (lower <= acessing <= upper) 
            throw new Error("[SEMANTIC] Index array out of bounds: " + item.name + "[" + acessing + "]")

        return item.data_type.data_type
    }

    if (item.type == "call")
        return item.return_type ? item.return_type : "void"
    
    if (item.data_type == "routine")
        return item.return_type ? item.return_type : "void"

    return item.data_type
}

module.exports = {
    not_constant (var1) {
        if(var1.constant)
            throw new Error("[SEMANTIC] Attempting to change constant value " + var1.value)
    },
    assign(data_type1, data_type2) {
        if (data_type1 == "char" && data_type2 == "char")
            return "string";
        else return data_type1;
    },
    same_types (item1, item2, exceptions) {

        let data_type1 = finalize_datatype(item1)
        let data_type2 = finalize_datatype(item2)

        data_types = [data_type1, data_type2]
        exceptions = exceptions ? exceptions : []
        for (key in exceptions) 
            if(data_types[0] == key && data_types[1] == exceptions[key])
                return;
                
        if (data_type1 != data_type2)
            throw new Error("[SEMANTIC] Datatype mismatch error: " + JSON.stringify(data_type1) + " != " + data_type2)
    },
    types (item, types) {
        if (types.indexOf(item.data_type.name) == -1 && types.indexOf(item.data_type) == -1)
            throw new Error("[SEMANTIC] Datatype of " + item.value + "(" + item.data_type ? item.data_type : item.data_type.name + ") should be " + types.join(", "))
    },
    not_keyword (item) {
        if (values.keywords.indexOf(item) != -1)
            throw new Error("[SEMANTIC] " + item.value + " is a reserved keyword.")
    },
    declared (symbol, item, scope) {
        for (i in values.routines) {
            let routine = values.routines[i];
            if (routine.name == item.value) 
                return;
        }

        if (!symbol.lookup(item))
            throw new Error("[SEMANTIC] " + item.value + " is not declared within the scope (" + scope.peek() + ")")
    },
    not_yet_declared (symbol, item, scope) {
        
        if (symbol.lookup(item) && symbol.lookup(item).scope == scope)
            throw new Error("[SEMANTIC] " + item.value + " was already defined in " + scope)
    }
}