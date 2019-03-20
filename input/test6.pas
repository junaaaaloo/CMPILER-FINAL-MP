program test6;

(* FUNCTIONS TEST *)
function max (num1, num2: integer): integer;
var 
    result: integer;

begin
    if (num1 > num2) then
        max := num1
    else
        max := num2;
end;

begin
    writeln(max(10, 100));
end;