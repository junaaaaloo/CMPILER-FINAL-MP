program try9;
var
   n: array [1..10] of integer;
   i, j: integer;

begin
	writeln('9 Array');
   for i := 1 to 10 do
       n[ i ] := i + 100;
   
   for j:= 1 to 10 do
      writeln('Element[', j, '] = ', n[j] );
end.