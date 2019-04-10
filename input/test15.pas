{ *** CMPILER MP *** }
program arraysTest;
var months : array[1..12] of string;
    conds: array[-5..5] of boolean;
    i: integer;
    
Begin 
    months[1] := 'January';
    months[2] := 'February';
    months[3] := 'March';
    months[4] := 'April';
    months[5] := 'May';
    months[6] := 'June';
    months[7] := 'July';
    months[8] := 'August';
    months[9] := 'September';
    months[10] := 'October';
    months[11] := 'November';
    months[12] := 'December';

    for i := -5 to 5 do
        conds[i] := true;
    
    writeln(i);
    conds[5] = false;
    writeln(conds[5])
End. 