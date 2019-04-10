PROGRAM MAIN;


var chr : char;
VAR
  a, b   : integer;
  a1	 : iNtEgEr;
  c	 : char;
  c1	 : Char;
  d	 : string;
  d2	 : String;
  e	 : boolean;
  e1	 : Boolean;
  n	 : array [1..10] of integer;
  b2     : string;

const
  MX = 40;
  H1 = 'hello';
  Ca2 = 'Q';
  b1f = FALSE;
  b2f = false;
  b1t = TRUE;
  b2t = true;
  f = 'This is a string';

procedure assignStuff();
const a = 'hello'; 		 

var Ca2 : integer;
begin
  
  a1	 := +1;
  b	 := 1;
  c	 := 'C';
  c1	 := '`';
  d	 := 'C';		(*//this is a string*)
  d2	 := 'This is d2' ;
  e	 := true;
  
  d2     := d;
  b 	 := a1;
  a1	 := -2;
  c1	 := 'c';
  d2     := 'Changed';
  d2	 := 'c' + 'c';
  e1	 := not(MX < 100);
  a1	 := b + a1;					
  b 	 := (3 + 4) div 8 - ((1*2) mod 2) -2 + 6 * 2; 	
 
  writeln('Assigning');
  writeln('a1 is ', a1);				(*//a1 is -1*)
  writeln('b is ', b);					(*// b is 10 *)
  writeln('c1 is ', c1);				(*// c1 is c  *)
  writeln('d2 is ', d2);				(*// d2 is cc *)
  writeln('e1 is ', e1);				(*// e1 is true*)
  
end;

BEGIN {MAIN}
  assignStuff();

END.  {MAIN}
