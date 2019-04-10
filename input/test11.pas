program test11;

var a, b: integer;

function printSquare(x, y: integer):integer;
var a, b: integer;
begin
    for a := 1 to x do
    begin
        for b := 1 to y do 
        begin
            write('* ')
        end;
        writeln();
    end;
end;
begin
    write('Enter length: ');
    readln(a);
    write('Enter width: ');
    readln(b);
    printSquare(a, b);
end.
