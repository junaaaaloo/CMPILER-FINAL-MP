program test5;

(* BASICS TEST *)
var 
    a, b, c: integer;
begin
    a := readln('Input number 1: ');
    b := readln('Input number 2: ');
    c := a * (a + b) * b;
    writeln('----');
    writeln('a * (a + b) * b = ', c);
end.