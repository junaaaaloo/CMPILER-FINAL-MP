{ *** CMPILER MP *** }
program MAIN;
var A, B: integer;

function getTimesThree(A: integer): integer;
Begin {getTimesThree}
	writeln(A);
	getTimesThree := A * 3;
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
B := 3;
printRange();
enterName();

A := 10;
A := getTimesThree(A);
writeln(A);
End. {MAIN}