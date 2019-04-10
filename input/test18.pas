program main;

function getTimesThree(Z:integer):integer;
begin
        writeln(Z);
        getTimesThree := Z * 3;
end;

var i:integer;
begin
    i := 5;
    if (i > 4 and i > 3) then getTimesThree(i);
end.