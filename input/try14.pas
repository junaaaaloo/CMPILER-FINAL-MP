program try14;

var
	a, b, c: integer;
    
begin
	writeln('14 Boolean Operators');
	
	a := 10;
	b := 15;
	c := 20;
	
	writeln('Values:');
	writeln('a is ',a);
	writeln('b is ',b);
	writeln('c is ',c);
	
	writeln();
	
	writeln('Conditions:');
	if((a = 10) and (b = 15)) then
		writeln('a is 10 and b is 15');
	
	if((a = 10) or (b = 14)) then
		writeln('a is 10 or b is 14');
	
	if(not (c=10)) then
		writeln('c is not 10');
	
end.