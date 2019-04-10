program main;

function getTimesThree(Z:integer):integer;
begin
        writeln(Z);
        getTimesThree := Z * 3;
end;

var Z:integer;
begin
    Z := getTimesThree(200);
    write(Z);
end.