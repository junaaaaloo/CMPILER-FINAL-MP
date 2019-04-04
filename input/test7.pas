program HelloWorld;

var arrInt : array [1..20] of integer;
begin
    if (false) then 
        for i:= 1 to 10 do 
        begin
            writeln(i);
        end
    else
        writeln('WORLD');
end.
