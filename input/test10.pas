program test6;
var 
   i:integer;

begin
    readln(i);

    if (i < 10) then
        writeln('Lower than 10')
    else if (i > 10 AND i < 20) then 
        writeln('Between 10 and 20')
    else
        writeln('Above 20');
end.