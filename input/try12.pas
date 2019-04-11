program try12;

(* BASICS TEST *)

var
	a: integer;

begin
	writeln('12 Arithmetic Operators');
	a := ( 2 + 2 ) * 5 mod 3 * ( 5 - 3 ) div 4;
    writeln('( 2 + 2 ) * 5 mod 3 * ( 5 - 3 ) div 4  is ', a);
end.