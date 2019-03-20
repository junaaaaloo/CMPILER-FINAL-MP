%lex
%%
' '                /* skip space */
[\+\-]?[0-9]+           return 'NUMBER';
"+"                     return '+';
"-"                     return '-';
"/"                     return '/';
"*"                     return '*';
"%"                     return '%';
<<EOF>>                 return 'EOF';
"("                     return '(';
")"                     return ')';

/lex

%left 'NUMBER'
%left '-' '+'
%left '*' '/' '%'

%start expressions

%% /* language grammar */

expressions
        : e EOF { return true; };
    e   :   e '-' e
                { yy.debug && console.log("OPERATOR"); } | 
            e '/' e
                { yy.debug && console.log("OPERATOR"); } | 
            e '%' e
                { yy.debug && console.log("OPERATOR"); } | 
            e '*' e
                { yy.debug && console.log("OPERATOR"); } | 
            e '+' e
                { yy.debug && console.log("OPERATOR"); } | 
            'NUMBER'
                { yy.debug && console.log("INTEGER"); } |
            '(' e ')' 
                { yy.debug && console.log("PARENTHESIS"); };
