cd models
call cls
call jison pascalet.y
cd ..
call node cli.js %1 %2