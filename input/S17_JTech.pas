{ *** CMPILER MP *** }
program MAIN;
const PI = 3;
var A, B, C, J, sum, i: integer;
    D: boolean;
    numbers : array[1..5] of integer;
    r, f,e: integer;
	
procedure operationsTwo(X: integer);
var A, Z: integer;
Begin {operationsTwo}
	Z := X + 2;
	writeln(Z);
	Z := X - 2;
	writeln(Z);
	Z := (X + 2) - (1 + 1);
	writeln(Z);
	Z := X * 2;
	writeln(Z);
	Z := X mod 2;
	writeln(Z);
	A := X div 2;
	writeln(A);
end; {operationsTwo}

function getTimesThree(Z: integer): integer;
Begin {getTimesThree}
	writeln(Z);
	getTimesThree := Z * 3;
end; {getTimesThree}

procedure printRange();
var i: integer;
Begin {printRange}
	for i:=1 to B do
	begin
		writeln(i);
	end;
end; {printRange}

procedure enterName();
var E: char;
var F, G: string;
    begin {enterName}
        write('First Name: ');
        readln(F);
        write('Middle Initial: ');
        readln(E);
        write('Last Name: ');
        readln(G);
        writeln(F,' ', E,'. ',G);
    end;

Begin {MAIN}
writeln('Enter the radius of the circle');
readln(r);

f := 2 * r;
e :=  PI * f;
writeln('The circumference of the circle is ',e);

sum := 0;
numbers[1] := 3;
numbers[2] := 7;
numbers[3] := 2;
numbers[4] := 4;
numbers[5] := 5;

for i := 1 to 5 do
   sum := sum + numbers[1];
writeln('sum = ', sum);

D := true;
A := 2;

if(A<>2) then
    writeln('A is not 2')
else
    writeln('A is 2');

if(A>2) then
    writeln('A is greater than 2')
else
    writeln('A is 2 or less than 2');

if(A<2) then
    writeln('A is less than 2')
else
    writeln('A is 2 or greater than 2');

if(A>=2) then
    writeln('A is 2 or greater than 2')
else
    writeln('A less than 2');
    
if(A<=2) then
    writeln('A is 2 or less than 2')
else
    writeln('A greater than 2');

if (D=true) then
	operationsTwo(A);

if(D=false) then
	writeln('D is false')
else
    writeln('D is true');

D := false;
if(D=false) then
	writeln('D is false')
else
    writeln('D is true');

J := 5;

if((J=5) and (A=2)) then
    writeln('J is 5 and A is 2');

if((J=4) and (A=2)) then
    writeln('J is 5 or A is 2');

if(not D) then
    writeln('D is false');

C := 10;
if(D=false) then
	C := getTimesThree(C);
	writeln(C);

B := 5;
printRange();
enterName();
End. {MAIN}