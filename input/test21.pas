program main;
var fa:string;
var i:integer;
begin
    fa := 'HELLO WORLD';
    i := 0;

    while (i < 10) do 
        begin
            writeln(i);
            i:= i + 1;
        end;
    fa := 'HELLO WORLD';

    i := 0;
    repeat
        i := i + 1;
        writeln(i);
    until (i < 10);
end.