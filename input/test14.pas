{ *** CMPILER MP *** }
program arraysTest;
var numbers : array[1..5] of integer;
    i: integer;
    
Begin 
    for i := 1 to 5 do 
        numbers[i] := i+1;
    
    for i := 1 to 5 do
        writeln(numbers[i])
End. 