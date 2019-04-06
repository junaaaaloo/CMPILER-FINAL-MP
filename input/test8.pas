program MAIN;
var X, Y, Z: integer;
procedure P0(Y: integer);
begin {P0}
   X := Y+Z;
   writeln('***');
end; {P0}
procedure P2(X:integer);
var Y, Z: integer;
   procedure P3(N:integer);
   var X,Z: integer;
   Begin
      X := 0; Z:= 0;
      Y := N;
      X := X+Y;
      Z := Z+N;
    { *** 2 *** }
      P0(Z);
   end;
begin {P2}
   Y := 2; Z := 3;
   X := X+Y+Z;
   P3(X);
   Z := Z+1; 
end; {P2}
procedure P1(X, C: integer);
begin {P1}
   Z := X+C; 
   P2(X);
   { *** 3 *** }
end; {P1}
Begin {MAIN}
   X:=0; Y:=1; Z:=3;
   { *** 1 *** }
   P1(Y,Z);
   X:=0; Y:=0; Z:=0;
   if (X=Y) then
      Begin
         Y := X;
      end;
   { *** 4 *** }
End. {MAIN}