program test3;

(* BASICS TEST *)
var 
    a: string;
begin
    a := 'a' + 'b';
    a := 'a' + a;
    write(a);
end.