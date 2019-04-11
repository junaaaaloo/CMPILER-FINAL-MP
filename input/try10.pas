program try10;
var
   n: array [1..10] of integer;
   i, j: integer;

begin
	writeln('10 Comments');
   for i := 1 to 10 do { 1 to 10 with variable i }
       n[ i ] := i + 100; 
   (*
		values are constantly initialized with plus 100
		then it prints out this value with the function below
   *)
   
   for j:= 1 to 10 do
      writeln('Element[', j, '] = ', n[j] );
end.