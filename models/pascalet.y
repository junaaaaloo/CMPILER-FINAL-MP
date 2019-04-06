%{
    let scope = {
        data: [],
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
            if(!symbol.data[scope.peek()])
                return null;
            for (i in scope.data) {
                block = scope.data[i]
                let symbols = symbol.data[block]
                
                for (i in symbols) {
                    sym = symbols[i]
                    if (sym.name == symbol_item.value)
                        return sym
                }
            }
            return null;
        },
        add (symbol_item, type, args, return_type) {
            if (symbol.lookup(symbol_item))
                error.throw(symbol_item + " was already defined in " + scope.peek())
            if (!symbol.data[scope.peek()])
                symbol.data[scope.peek()] = []
            symbol.data[scope.peek()].push({
                name: symbol_item,
                data_type: type,
                args: args,
                return_type: return_type
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
char|integer|boolean|string         return 'TYPE';
[\+\-]?\d+\.\d+                     return 'REAL';
[\+\-]?\d+                          return 'INTEGER';
true|false                          return 'BOOLEAN';
\'.\'                               return 'CHARACTER';
\'(\\.|[^'\\])*\'                   return 'STRING';
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
%left BEGIN END
%left IDENTIFIER
%left CONST
%left PROCEDURE FUNCTION
%left '<', '<=', '>', '>='
%left '=', '<>'
%left '-' '+' OR
%left '*' '/' '%' AND, MOD, DIV
%left NOT  
%left '(' ')'
%left PROGRAM
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
                type: "character"
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
            $$ = { 
                name: $1, 
                range: [$3, $6], 
                type: $9 
            }; 
        };

program:   
    PROGRAM program_name ';'
        { 
            $$ = { 
                type: 'program', 
                name: $2, 
                body: [ ] 
            }; 
        
        } 
    | PROGRAM program_name ';' routine_list main
        { 
            $4.unshift($5); 
            $$ = { 
                type: 'program', 
                name: $2, 
                body: $4
            }; 
        
        } 
    | PROGRAM program_name ';' main 
        { 
            $$ = { 
                type: 'program', 
                name: $2, 
                body: [ $4 ] 
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
            symbol.add($1.value, $3.type)
            
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
            $$ = { type: 'procedure', routines: $3, body: $4};
            $$ = Object.assign($$, $1, $2); 
        } 
    | header routine_list body end_block
        { 
            $$ = { type: 'procedure', routines: $2, body: $3};
            $$ = Object.assign($$, $1); 
        } 
    | header declarations_list body end_block
        { 
            $$ = { type: 'procedure', routines: [], body: $3 };
            $$ = Object.assign($$, $1, $2); 
        } 
    | header body end_block
        { 
            $$ = { type: 'procedure', routines: [], body: $2 };
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
            $$ = $1; 
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
                return: $7, 
                params: $4, 
                name: $2 
            };
        };

procedure_header:
    PROCEDURE routine_name '(' parameters_list ')' ';'
        { 
            $$ = { 
                type: $1, 
                params: $4, 
                name: $2 
            };
        };

routine_name:
    identifier
        {
            $$ = $1;
            symbol.add($1.value, $1.type);
            scope.add($1.value);
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
            $3.unshift($1); $$ = $3; 
        }; 

parameter:
    variable_name_list ':' type
        { 
            $$ = { 
                type: $3, 
                name: $1 
            } 
            for (i in $1) 
                symbol.add($1[i].value, $3)
        };

declaration_list:
    declaration ';'
        { 
            $$ = [ $1 ]
        } 
    | declaration ';' declaration_list
        { 
            $3.unshift($1); 
            $$ = $3; 
        };

declaration:
    variable_name_list ':' type
        { 
            $$ = { type: $3, name: $1 } 
            for (i in $1) 
                symbol.add($1[i].value, $3)
            
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
    assignment
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
    expression ':=' expression
        { 
            $$ = { 
                    type: 'binary operator', 
                    operator: ':=', 
                    args: [$1, $3] 
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
            semantics.types($1, ["string", "real", "integer"]);
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '-' expression
        { 
            // semantics.types($1, ["integer", "real"]);
            // semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '/' expression
        { 
            // semantics.types($1, ["integer", "real"]);
            // semantics.same_types($1, $3)
            $$ = { 
                type: 'binary operator', 
                operator: $2, 
                data_type: $1.data_type,
                args: [$1, $3] 
            } 
        } 
    | expression '*' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '%' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '=' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<>' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<' expression
        { 
            $$ = { 
                type: 'binary operator',
                data_type: $1.data_type, 
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '>' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '<=' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression '>=' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'AND' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        }
    | expression 'OR' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'NOT' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression ':' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'MOD' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | expression 'DIV' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $2, 
                args: [$1, $3] 
            } 
        } 
    | 'NOT' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
                operator: $1, 
                args: [$2] 
            } 
        } 
    | '-' expression
        { 
            $$ = { 
                type: 'binary operator', 
                data_type: $1.data_type,
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
            semantics.declared(symbol, $1);
            $$ = symbol.lookup($1)
        } 
    | identifier '(' function_parameter_list ')'
        { 
            $$ = $1
            $$ = { 
                type: 'call', 
                name: $1, 
                args: $3 
            } 
        } 
    |
    identifier '[' expression ']'
        { 
            $$ = { 
                type: 'array access', 
                name: $1, 
                args: $3 
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
        };

iterative_loop:
    for_loop
        { 
            $$ = $1 
        };

for_loop:
    FOR identifier ':=' expression TO expression DO statement_blocks
        { 
            $$ = { 
                type: "iterative operator", 
                operator: $1, 
                statements: $8, 
                variable: $2, 
                range: [$4, $6] 
            } 
        };