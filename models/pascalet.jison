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
"<"                                 return '<';
">="                                return '>=';
">"                                 return '>';
"="                                 return '=';
","                                 return ',';
":"                                 return ':';
"."                                 return '.';
"and"                               return 'AND';
"or"                                return 'OR';
"not"                               return 'NOT';
<<EOF>>                             return 'EOF';
character|integer|boolean|string    return 'TYPE';
[$a-zA-Z_]+[A-Za-z0-9_]*            return 'IDENTIFIER';
[\+\-]?\d+                          return 'NUMBER';
true|false                          return 'BOOLEAN';
\'.\'                               return 'CHARACTER';
\'(\\.|[^'\\])*\'                   return 'STRING';
<<EOF>>                             return 'EOF';

/lex
%right routine_list main body
%left routine 
%left constant_list 
%left routine_variables 
%left ';'
%left VAR
%left EOF
%left NOT
%left IF 
%left ELSE
%left NUMBER
%left ':'
%left BEGIN END
%left IDENTIFIER
%left CONST
%left PROCEDURE FUNCTION
%left '=', '<>', '<', '<=', '>', '>='
%left '-' '+' OR
%left '*' '/' '%' AND
%left NOT  
%left '(' ')'
%left PROGRAM
/* production rules */

%start pascal

%% 

pascal:   
    program EOF 
        { return $1 };
identifier: 
    IDENTIFIER
        { $$ = { type: 'identifier', value: $1} };
number:
    NUMBER
        { $$ = $1 };
string:
    STRING
        { $$ = $1 };
character:
    CHARACTER
        { $$ = $1 };
boolean:
    BOOLEAN
        { $$ = $1 };

literal:
    number
        { $$ = { type: "literal", value: $1, type: "integer"} } |
    character
        { $$ = { type: "literal", value: $1, type: "character"} } |
    string
        { $$ = { type: "literal", value: $1, type: "string"} } |
    boolean
        { $$ = { type: "literal", value: $1, type: "boolean"} };
type:
    TYPE
        { $$ = $1 } |
    ARRAY '[' number '.' '.' number ']' OF TYPE
        { $$ = { name: $1, range: [$3, $6], type: $9 }  };

program:   
    PROGRAM program_name ';'
        { $$ = { type: 'program', name: $2, body: [ ] } } |
    PROGRAM program_name ';' routine_list main
        { $4.unshift($5); $$ = { type: 'program', name: $2, body: $4 }; } |
    PROGRAM program_name ';' main 
        { $$ = { type: 'program', name: $2, body: [ $4 ] } };
program_name: 
    identifier
        { $$ = $1; };

constant_list:
    CONST constant_items
        { $$ = $2 };

constant_items:
    constant 
        { $$ = [$1] } | 
    constant constant_items
        { $2.unshift($1); $$ = $2; };
constant:
    identifier '=' literal ';'
        { $$ = {name: $1, value: $3.value, type: $3.type}};
    
routine_list:
    routine 
        { $$ = [ $1 ] } |
    routine routine_list
        { $2.unshift($1); $$ = $2; };

routine:
	header routine_variables routine_list body ';'
        { $$ = { type: 'procedure', routines: $3, body: $4}; $$ = Object.assign($$, $1, $2); } |
    header routine_list body ';'
        { $$ = { type: 'procedure', routines: $2, body: $3}; $$ = Object.assign($$, $1); } |
    header routine_variables body ';'
        { $$ = { type: 'procedure', routines: [], body: $3 }; $$ = Object.assign($$, $1, $2); } |
    header body ';'
        { $$ = { type: 'procedure', routines: [], body: $2 }; $$ = Object.assign($$, $1); };

main:
    declarations_item routine_list body '.'
        { $$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, body: $3, routines: $2 }; $$ = Object.assign($$, $1);} |
    declarations_item body '.'
        { $$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, body: $2 }; $$ = Object.assign($$, $1);};

declarations_list:
    declarations_item 
        { $$ = $1; } |
    declarations_item declarations_list
        { $$ = Object.assign($1, $2) };

declarations_item:
    constant_list 
        { $$ = { const: $1 }; } |
    routine_variables
        { $$ = { variables: $1 }; } |
    empty
        { $$ = {} };

header:
	procedure_header
		{ $$ = $1 } |
	function_header
		{ $$ = $1 };


function_header:
    FUNCTION identifier '(' parameters_list ')' ':' type ';'
        { $$ = { type: $1, return: $7, params: $4, name: $2 } };

procedure_header:
    PROCEDURE identifier '(' parameters_list ')' ';'
        { $$ = { type: $1, params: $4, name: $2 } };

routine_variables:
    VAR declaration_list
        { $$ = { 'variables': $2 } };
body: 
    BEGIN statement_list END
        { $$ = $2 } |
    BEGIN END
        { $$ = [] };

empty:
    { $$ = [] }; 
parameters_list:
    empty
        { $$ = [] } |
    parameter
        { $$ = [ $1 ] } |
    parameter ';' parameters_list
        { $3.unshift($1); $$ = $3; }; 
parameter:
    variable_name_list ':' type
        { $$ = { type: $3, name: [ $1, $3 ] } };

declaration_list:
    declaration ';'
        { $$ = [ $1 ] } |
    declaration ';' declaration_list
        { $3.unshift($1); $$ = $3; };
declaration:
    variable_name_list ':' type
        { $$ = { type: $3, name: $1 } };
variable_name_list:
    identifier
        { $$ = [ $1 ] } } |
    identifier ',' variable_name_list
        { $3.unshift($1); $$ = $3 };

statement_list:
    statement ';'
        { $$ = [ $1 ] } |
    statement ';' statement_list
        { $3.unshift($1); $$ = $3 } };
statement: 
    assignment
        { $$ = { type: 'operator', operator: ':=', lhs: $1[0], rhs: $1[1] } } |
    expression
        { $$ = $1 } |
    conditional
        { $$ = $1 } |
    iterative_loop 
        { $$ = $1 };
assignment:
    identifier ':=' expression
        { $$ = [ $1, $3 ] };
conditional:
    IF expression THEN statement_blocks
        { $$ = { type: 'operator', operator: 'conditional', condition: $2, if: $4} } |
    IF expression THEN statement_blocks ELSE statement_blocks
        { $$ = { type: 'operator', operator: 'conditional', condition: $2, if: $4, else: $6} };
statement_blocks:
    statement
        { $$ = [ $1 ] } |
    body 
        { $$ = $1 };
expression:
    expression '+' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '-' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '/' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '*' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '%' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '=' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '<>' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '<' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '>' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '<=' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression '>=' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression 'AND' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression 'OR' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression 'NOT' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    expression ':' expression
        { $$ = { type: 'operator', operator: $2, lhs: $1, rhs: $3 } } |
    '(' expression ')'
        { $$ = $2 } |
    literal
        { $$ = $1 } |
    identifier
        { $$ = $1 } |
    identifier '(' function_parameter_list ')'
        { $$ = { type: 'call', name: $1, args: $3 } };
function_parameter_list:
    empty
        { $$ = [ ] } |
    function_parameter
        { $$ = [ $1 ] } |
    function_parameter ',' function_parameter_list
        { $3.push($1); $$ = $3; }; 
function_parameter:
    expression
        { $$ = $1 };

iterative_loop:
    for_loop
        { $$ = $1 };

for_loop:
    FOR identifier ':=' number TO number DO statement_blocks
        { $$ = { type: "operator", operator: $1, statements: $8, variable: $2, range: [$4, $6] } };