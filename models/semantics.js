let values = require('./values')

module.exports = {
    same_types (item1, item2) {
        if (item1.data_type != item2.data_type)
            throw new Error("[SEMANTIC] Datatype mismatch error: " + item1.data_type + " != " + item2.data_type)
    },
    types (item, types) {
        if (types.indexOf(item) != -1)
            throw new Error("[SEMANTIC] Datatype of " + item.value + " should be " + types.join(","))
    },
    NotAkeyword (item) {
        if (values.keywords.indexOf(item) != -1)
            throw new Error("[SEMANTIC] " + item.value + " is a reserved keyword.");
    },
    declared (symbol, item) {
        if (!symbol.lookup(item))
            throw new Error("[SEMANTIC] " + item.value + " is not declared within the scope.");
    }
}