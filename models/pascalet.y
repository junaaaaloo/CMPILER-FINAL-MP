%{
    let scope = {
        data: [        ],
        add (item) {
            scope.data.unshift(item)
        },
        pop () {
            return scope.data.shift()
        },
        peek () {
            return scope.data[0]
        },
    }

    let symbol = {
        data: {},
        lookup (symbol_item) {
            for (i in scope.data) {
                block = scope.data[i]
                let symbols = symbol.data[block]
                
                for (j in symbols) {
                    sym = symbols[j]
                    if (sym.value == symbol_item.value) {
                        sym.scope = block
                        return sym
                    }
                }
            }
            return null;
        },
        add (symbol_item, type, args, return_type, constant) {
            if (!symbol.data[scope.peek()])
                symbol.data[scope.peek()] = []

            symbol.data[scope.peek() ? scope.peek() : "main"].push({
                value: symbol_item,
                return_type: return_type,
                data_type: type,
                args: args,
                constant: constant ? constant : false
            })
        },
        debug () {
            console.log("-- SYMBOL TABLE --")
            console.log(JSON.stringify(symbol.data, null, 2))
            console.log("------------------");
        }
    }

    let error = {
        throw (message) {
            throw new Error (message)
        }
    }

    let semantics = require('./semantics');
%}

/* -- Tokens accepted -- */
%lex
%%

";"                                 return ';';
\s+                                 /* skip whitespace */
"program"                           return 'PROGRAM';
"var"                               return 'VAR';
"begin"                             return 'BEGIN';
"end"                               return 'END';
"if"                                return 'IF';
"of"                                return 'OF';
"then"                              return 'THEN';
"else"                              return 'ELSE';
"while"                             return 'WHILE';
"do"                                return 'DO';
"to"                                return 'TO';
"for"                               return 'FOR';
"while"                             return 'WHILE';
"repeat"                            return 'REPEAT';
"until"                             return 'UNTIL';
"function"                          return 'FUNCTION';
"procedure"                         return 'PROCEDURE';
"const"                             return 'CONST';
"array"                             return 'ARRAY';
"{"                                 return '{';
"}"                                 return '}';
"#"                                 return '#';
"?"                                 return '?';
":="                                return ':=';
"("                                 return '(';
")"                                 return ')';
"["                                 return '[';
"]"                                 return ']';
"*"                                 return '*';
"/"                                 return '/';
"%"                                 return '%';
"+"                                 return '+';
"-"                                 return '-';
"<="                                return '<=';
"<>"                                return '<>';
"<"                                 return '<';
">="                                return '>=';
">"                                 return '>';
"="                                 return '=';
","                                 return ',';
":"                                 return ':';
"."                                 return '.';
"mod"                               return 'MOD';
"div"                               return 'DIV';
"and"                               return 'AND';
"or"                                return 'OR';
"not"                               return 'NOT';
<<EOF>>                             return 'EOF';
[\+\-]?\d+\.\d+                     return 'REAL';
[\+\-]?\d+                          return 'INTEGER';
true|false                          return 'BOOLEAN';
\'.\'                               return 'CHARACTER';
\'(\\.|[^'\\])*\'                   return 'STRING';
char|integer|boolean|string|real    return 'TYPE';
[$a-zA-Z_]+[A-Za-z0-9_]*            return 'IDENTIFIER';
<<EOF>>                             return 'EOF';

/lex
%right routine_list main body
%left routine 
%left constant_list 
%left routine_variables 
%left statement_list statement 
%left ';'
%left VAR
%left EOF
%left NOT
%left IF 
%left ELSE
%left ':' 
%left TYPE
%left BEGIN END
%left CONST
%left PROCEDURE FUNCTION
%left '<', '<=', '>', '>='
%left '=', '<>'
%left '-' '+' OR
%left '*' '/' '%' AND, MOD, DIV
%left NOT UMINUS UPLUS
%left '(' ')'
%left PROGRAM IDENTIFIER
/* production rules */

%start pascal

%% 

pascal:   
    program EOF 
        { 
            return $1 
        };
identifier: 
    IDENTIFIER
        { 
            $$ = { 
                type: 'identifier', 
                value: $1
            }; 
        };
integer:
    INTEGER
        { 
            $$ = $1 
        };

real:
    REAL
        { 
            $$ = $1 
        };

string:
    STRING
        { 
            $$ = $1 
        };

character:
    CHARACTER
        { 
            $$ = $1 
        };

boolean:
    BOOLEAN
        { 
            $$ = $1 
        };


literal:
    integer
        { 
            $$ = { 
                value: $1, 
                type: "integer"
            }; 
        }
    | real
        { 
            $$ = { 
                value: $1, 
                type: "real"
            };
        }
    | character
        { 
            $$ = { 
                value: $1, 
                type: "char"
            };
        }
    | string
        { 
            $$ = { 
                value: $1, 
                type: "string"
            }; 
        }
    | boolean
        { 
            $$ = { 
                value: $1, 
                type: "boolean"
            };
        };
type:
    TYPE
        { 
            $$ = $1; 
        } 
    | ARRAY '[' expression '.' '.' expression ']' OF TYPE
        { 
            semantics.types($3, ["integer"])
            semantics.types($6, ["integer"])
            semantics.types($6, ["integer", "real", "string", "boolean"])
            $$ = { 
                name: $1, 
                range: [$3, $6], 
                data_type: $9 
            }; 
        };

program:   
    PROGRAM program_name ';' routine_list main
        { 
            $5.routines = $4
            $$ = { 
                type: 'program', 
                name: $2, 
                routines: [$5]
            }; 
        
        } 
    | PROGRAM program_name ';' main 
        { 
            $$ = { 
                type: 'program', 
                name: $2, 
                routines: [ $4 ] 
            }; 
        };

program_name: 
    identifier
        { 
            $$ = $1; 
            scope.add($1.value);
        };

constant_list:
    CONST constant_items
        { 
            $$ = $2;
        };

constant_items:
    constant 
        { 
            $$ = [$1]
        } 
    | constant constant_items
        { 
            $2.unshift($1)
            $$ = $2
        };
constant:
    identifier '=' literal ';'
        { 
            $$ = {name: $1, value: $3.value, type: $3.type}
            symbol.add($1.value, $3.type, null, null, true)
        };
    
routine_list:
    routine 
        { 
            $$ = [ $1 ]; 
        } 
    | routine routine_list
        { 
            $2.unshift($1); 
            $$ = $2; 
        };
end_block:
    ';'
        {
            scope.pop();
        };
routine:
	header declarations_list routine_list body end_block
        { 
            $$ = { routines: $3, body: $4};
            $$ = Object.assign($$, $1, $2); 
        } 
    | header routine_list body end_block
        { 
            $$ = { routines: $2, body: $3};
            $$ = Object.assign($$, $1); 
        } 
    | header declarations_list body end_block
        { 
            $$ = { routines: [], body: $3 };
            $$ = Object.assign($$, $1, $2); 
        } 
    | header body end_block
        { 
            $$ = { routines: [], body: $2 };
            $$ = Object.assign($$, $1); 
        };

main:
    declarations_list routine_list body '.'
        { 
            $$ = { 
                type: 'procedure', 
                name: { 
                    value: 'main', 
                    type: 'identifier' 
                }, 
                body: $3, 
                routines: $2 
            }; 
            $$ = Object.assign($$, $1);
        }
    | declarations_list body '.'
        { 
            $$ = { 
                type: 'procedure', 
                name: { 
                    value: 'main', 
                    type: 'identifier' 
                }, 
                body: $2 
            }; 
            $$ = Object.assign($$, $1);
        }
    | body '.' 
        {
            $$ = { 
                type: 'procedure', 
                name: { 
                    value: 'main', 
                    type: 'identifier' 
                }, 
                body: $1
            }; 
        };

declarations_list:
    declarations_item 
        {
            $$ = $1
        } 
    | declarations_item declarations_list
        { 
            $$ = Object.assign($1, $2)
        };

declarations_item:
    constant_list 
        { 
            $$ = { const: $1 }; 
        } 
    | routine_variables
        { 
            $$ = { variables: $1 }; 
        };

header:
	procedure_header
		{ 
            $$ = $1 
        } 
    | function_header
		{ 
            $$ = $1 
        };

function_header:
    FUNCTION routine_name '(' parameters_list ')' ':' type ';'
        { 
            $$ = { 
                type: $1, 
                return_type: $7, 
                params: $4, 
                name: $2 
            };

            semantics.not_yet_declared(symbol, $2, scope.peek())
            symbol.add($2.value, 'routine', $4, $7)
            scope.add($2.value)

            for (x in $4) {
                let variable = $4[x]
                for (y in variable.name) {
                    let var_name = variable.name[y]
                    symbol.add(var_name.value, variable.data_type)
                }
            }
        } 
    | FUNCTION routine_name ':' type ';'
        { 
            $$ = { 
                type: $1, 
                return_type: $4, 
                params: [], 
                name: $2 
            };

            semantics.not_yet_declared(symbol, $2, scope.peek())
            symbol.add($2.value, 'routine', null, $4)
            scope.add($2.value)
        };

procedure_header:
    PROCEDURE routine_name '(' parameters_list ')' ';'
        { 
            $$ = { 
                type: $1, 
                params: $4, 
                return_type: null, 
                name: $2 
            };
            
            semantics.not_yet_declared(symbol, $2, scope.peek())
            symbol.add($2.value, 'routine', $4)
            scope.add($2.value)

            for (x in $4) {
                let variable = $4[x]
                for (y in variable.name) {
                    let var_name = variable.name[y]
                    symbol.add(var_name.value, variable.data_type)
                }
            }

        } |
    PROCEDURE routine_name ';'
        {
            $$ = { 
                type: $1, 
                params: [], 
                return_type: null, 
                name: $2 
            };

            semantics.not_yet_declared(symbol, $2, scope.peek())
            symbol.add($2.value, 'routine')
            scope.add($2.value)
        };

routine_name:
    identifier
        {
            $$ = $1
        };


routine_variables:
    VAR declaration_list
        { 
            $$ = $2 
        };

body: 
    BEGIN statement_list END
        { 
            $$ = $2 
        } 
    | BEGIN statement END
        { 
            $$ = [$2] 
        } 
    | BEGIN END
        { 
            $$ = [] 
        }
    | BEGIN ';' statement_list END
        {
            $$ = $3
        }
    | BEGIN ';' statement END
        { 
            $$ = [$3] 
        } 
    | BEGIN ';' END
        { 
            $$ = [] 
        };

empty:
    { 
        $$ = null 
    };

parameters_list:
    empty
        { 
            $$ = [] 
        } 
    | parameter
        { 
            $$ = [ $1 ] 
        } 
    | parameter ';' parameters_list
        { 
            $3.unshift($1); 
            $$ = $3; 
        }; 

parameter:
    variable_name_list ':' type
        { 
            $$ = {  
                type: $3,
                data_type: $3, 
                name: $1 
            } 
        };

declaration_list:
    decl_item_list ';'
        { 
            $$ = [ $1 ]
        } 
    | decl_item_list ';' declaration_list
        { 
            $3.unshift($1); 
            $$ = $3; 
        };
        
decl_item_list:
    VAR declaration
        {
            $$ = $2
        }
    | declaration
        {
            $$ = $1
        };

declaration:
    variable_name_list ':' type
        { 
            $$ = { type: $3, data_type: $3, name: $1 } 

            for (x in $1) {
                semantics.not_yet_declared(symbol, $1[x], scope.peek())
                symbol.add($1[x].value, $3)
            }
        };

variable_name_list:
    identifier
        { 
            $$ = [ $1 ]
        } 
    | identifier ',' variable_name_list
        { 
            $3.unshift($1); 
            $$ = $3 
        };

statement_list:
    statement
        { 
            $$ = [ $1 ] 
        } 
    | statement ';'
        { 
            $$ = [ $1 ] 
        } 
    | statement ';' statement_list
        { 
            $3.unshift($1); $$ = $3 
        };

statement: 
    ';'
        {

        }
    | assignment 
        {
            $$ = $1;
        }
    | expression
        { 
            $$ = $1; 
        } 
    | conditional
        { 
            $$ = $1; 
        } 
    | iterative_loop 
        { 
            $$ = $1; 
        };
 
assignment:
    identifier ':=' expression
        { 
            semantics.declared(symbol, $1)
            var1 = symbol.lookup($1)
            semantics.same_types(var1, $3, {"string":"char", "real":"integer"})
            semantics.not_constant(var1)
            $$ = { 
                    type: 'binary operator', 
                    data_type: 'boolean',
                    operator: ':=', 
                    args: [$1, $3],
                }
        } |
    identifier '[' expression ']' ':=' expression
        {
            semantics.declared(symbol, $1)
            var1 = symbol.lookup($1)
            semantics.same_types(var1, $6)

            $$ = {
                type: 'binary operator',
                data_type: 'boolean',
                operator: ':=',
                args: [
                    {
                        type: 'array access',
                        name: $1.value, 
                        data_type: var1.data_type, 
                        args: $3
                    },
                    $6
                ]
            }
        };

conditional:
    IF expression THEN statement_blocks
        { 
            $$ = { 
                type: 'conditional operator', 
                operator: 'if', 
                condition: $2, 
                if: $4
            } 
        } 
    | IF expression THEN statement_blocks ELSE statement_blocks
        { 
            $$ = { 
                type: 'conditional operator', 
                operator: 'if-else', 
                condition: $2, 
                if: $4, 
                else: $6
            } 
        };
statement_blocks:
    statement
        { 
            $$ = [ $1 ] 
        } 
    | body 
        { 
            $$ = $1 
        };

expression:
    expression '+' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["char", "string", "real", "integer"]);

            $$ = { 
                type: 'binary operator', 
                data_type: semantics.assign($1.data_type, $3.data_type),
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '-' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["integer", "real"]);  
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '/' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["real"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '*' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["integer", "real"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '%' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["real"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '=' expression
        { 
            semantics.same_types($1, $3)
            
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<>' expression
        { 
            semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<' expression
        { 
            semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator',
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '>' expression
        { 
            semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<=' expression
        { 
            semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '>=' expression
        { 
            semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'AND' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["boolean"]);
            $$ = { 
                type: 'binary operator', 
                data_type: 'boolean',
                operator: $2, 
                args: [$1, $3] 
            } 
        }
    | expression 'OR' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["boolean"]);
            $$ = { 
                type: 'binary operator', 
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'MOD' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["integer"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'DIV' expression
        { 
            semantics.same_types($1, $3)
            semantics.types($1, ["integer"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | 'NOT' expression
        { 
            semantics.types($2, ["boolean"]);

            $$ = { 
                type: 'unary operator', 
                data_type: "boolean",
                operator: $1, 
                args: [$2] 
            } 
        } 
    | '-' expression %prec UMINUS
        { 
            semantics.types($2, ["integer", "real"]);
            $$ = { 
                type: 'unary operator', 
                data_type: $2.data_type,
                operator: $1, 
                args: [$2] } 
            } 
    | '+' expression %prec UPLUS
        { 
            semantics.types($2, ["integer", "real"]);
            $$ = { 
                type: 'unary operator', 
                data_type: $2.data_type,
                operator: $1, 
                args: [$2] } 
            } 
    | '(' expression ')'
        { 
            $$ = $2
        } 
    | literal
        { 
            $1.data_type = $1.type;
            $$ = $1
         } 
    | identifier
        { 
            $$ = semantics.declared(symbol, $1, scope);
            $$ = $$ ? $$ : symbol.lookup($1)
            $$.type = $$.type ? $$.type : "identifier"
        } 
    | identifier '(' function_parameter_list ')'
        { 
            semantics.declared(symbol, $1,  scope);
            $$ = { 
                type: 'call',
                return_type: symbol.lookup($1) ? symbol.lookup($1).return_type : null,
                name: $1, 
                args: $3 
            }
        } 
    | identifier '[' expression ']'
        {  
            semantics.types(symbol.lookup($1), ["array"])
            semantics.types($3, ["integer"])
            
            $$ = { 
                type: 'array access',
                name: $1.value, 
                data_type: symbol.lookup($1).data_type, 
                args: $3 
            } 
        };

statement_ternary:
    expression ':' expression ':' expression
        {
            semantics.types($1, ["real"])
            semantics.types($3, ["integer"])
            semantics.types($5, ["integer"])
            $$ = {
                type: 'ternary operator',
                data_type: 'string',
                operator: $2,
                args: [$1, $3, $5]
            }
        }
    |  expression ':' expression 
        {
            semantics.types($3, ["integer"])
            $$ = {
                type: 'binary operator',
                data_type: 'string',
                operator: $2,
                args: [$1, $3]
            }
        };


function_parameter_list:
    empty
        { 
            $$ = [ ]; 
        } 
    | function_parameter
        { 
            $$ = [ $1 ]; 
        } 
    | function_parameter ',' function_parameter_list
        { 
            $3.unshift($1); 
            $$ = $3; 
        }; 
function_parameter:
    expression
        { 
            $$ = $1
        } |
    statement_ternary
        {
            $$ = $1
        };

iterative_loop:
    for_loop
        { 
            $$ = $1 
        }
    | while_loop
        {
            $$ = $1
        }
    | repeat_until_loop
        {
            $$ = $1
        };

for_loop:
    FOR identifier ':=' expression TO expression DO statement_blocks
        { 
            semantics.declared(symbol, $2, scope.peek())
            semantics.types($4, ["integer"])
            semantics.types($6, ["integer"])
            $$ = { 
                type: "iterative operator", 
                operator: $1, 
                statements: $8, 
                variable: $2, 
                range: [$4, $6] 
            } 
        };

while_loop:
    WHILE expression DO statement_blocks
        { 
            semantics.types($2, ["boolean"])
            $$ = { 
                type: "iterative operator", 
                operator: $1, 
                statements: $4,
                condition: $2
            } 
        };

repeat_until_loop:
    REPEAT statement_list UNTIL expression
        {
            semantics.types($4, ["boolean"])
            $$ = { 
                type: "iterative operator", 
                operator: "repeat-until", 
                statements: $2,
                condition: $4
            } 
        };