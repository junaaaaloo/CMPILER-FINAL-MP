program test6;

(* 
function max(num1, num2: integer): integer;
var

   result: integer;

begin
   if (num1 > num2) then
      result := num1
   
   else
      result := num2;
   max := result;
end;
*)

function add (a1, a2:integer):integer;
var result:integer;

begin
   result := a1 + a2;
   add := result;
end;

var 
   i:integer;

begin
   writeln(add(1, 3));
end.