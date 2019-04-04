/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var pascalet = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,17],$V2=[1,22],$V3=[1,21],$V4=[1,16],$V5=[1,18],$V6=[1,61],$V7=[1,63],$V8=[1,62],$V9=[1,64],$Va=[1,52],$Vb=[1,54],$Vc=[1,60],$Vd=[40,45,46,48],$Ve=[30,40,45,46,48],$Vf=[30,40,45,48],$Vg=[21,26,65],$Vh=[26,65],$Vi=[1,92],$Vj=[1,101],$Vk=[1,87],$Vl=[1,88],$Vm=[1,89],$Vn=[1,90],$Vo=[1,91],$Vp=[1,93],$Vq=[1,94],$Vr=[1,95],$Vs=[1,96],$Vt=[1,97],$Vu=[1,98],$Vv=[1,99],$Vw=[1,100],$Vx=[2,81],$Vy=[1,103],$Vz=[26,33,43,44,55,63,65,66,67,68,69,70,71,72,73,74,75,76,77,78],$VA=[2,30],$VB=[1,121],$VC=[1,122],$VD=[2,43],$VE=[26,43],$VF=[26,33,43,44,55,63,65,66,67,71,72,73,74,75,77],$VG=[26,33,43,44,55,63,65,66,67,68,69,70,71,72,73,74,75,76,77],$VH=[26,33,43,44,55,63,65,71,72,73,74,75];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"pascal":3,"program":4,"EOF":5,"identifier":6,"IDENTIFIER":7,"number":8,"NUMBER":9,"string":10,"STRING":11,"character":12,"CHARACTER":13,"boolean":14,"BOOLEAN":15,"literal":16,"type":17,"TYPE":18,"ARRAY":19,"[":20,".":21,"]":22,"OF":23,"PROGRAM":24,"program_name":25,";":26,"routine_list":27,"main":28,"constant_list":29,"CONST":30,"constant_items":31,"constant":32,"=":33,"routine":34,"header":35,"routine_variables":36,"body":37,"procedure_header":38,"function_header":39,"FUNCTION":40,"(":41,"parameters_list":42,")":43,":":44,"PROCEDURE":45,"VAR":46,"declaration_list":47,"BEGIN":48,"statement_list":49,"END":50,"empty":51,"parameter":52,"variable_name_list":53,"declaration":54,",":55,"statement":56,"assignment":57,"expression":58,"conditional":59,"iterative_loop":60,":=":61,"IF":62,"THEN":63,"statement_blocks":64,"ELSE":65,"+":66,"-":67,"/":68,"*":69,"%":70,"<>":71,"<":72,">":73,"<=":74,">=":75,"AND":76,"OR":77,"NOT":78,"function_parameter_list":79,"function_parameter":80,"for_loop":81,"FOR":82,"TO":83,"DO":84,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"IDENTIFIER",9:"NUMBER",11:"STRING",13:"CHARACTER",15:"BOOLEAN",18:"TYPE",19:"ARRAY",20:"[",21:".",22:"]",23:"OF",24:"PROGRAM",26:";",30:"CONST",33:"=",40:"FUNCTION",41:"(",43:")",44:":",45:"PROCEDURE",46:"VAR",48:"BEGIN",50:"END",55:",",61:":=",62:"IF",63:"THEN",65:"ELSE",66:"+",67:"-",68:"/",69:"*",70:"%",71:"<>",72:"<",73:">",74:"<=",75:">=",76:"AND",77:"OR",78:"NOT",82:"FOR",83:"TO",84:"DO"},
productions_: [0,[3,2],[6,1],[8,1],[10,1],[12,1],[14,1],[16,1],[16,1],[16,1],[16,1],[17,1],[17,9],[4,3],[4,5],[4,4],[25,1],[29,2],[31,1],[31,2],[32,4],[27,1],[27,2],[34,5],[34,4],[34,4],[34,3],[28,5],[28,5],[28,4],[28,3],[28,3],[28,4],[28,4],[28,3],[28,2],[35,1],[35,1],[39,8],[38,6],[36,2],[37,3],[37,2],[51,0],[42,1],[42,1],[42,3],[52,3],[47,2],[47,3],[54,3],[53,1],[53,3],[49,2],[49,3],[56,1],[56,1],[56,1],[56,1],[57,3],[59,4],[59,6],[64,1],[64,1],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,3],[58,1],[58,1],[58,4],[79,1],[79,1],[79,3],[80,1],[60,1],[81,8]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1] 
break;
case 2:
 this.$ = { type: 'identifier', value: $$[$0]} 
break;
case 3: case 4: case 5: case 6: case 11: case 17: case 36: case 37: case 56: case 57: case 58: case 63: case 80: case 81: case 86: case 87:
 this.$ = $$[$0] 
break;
case 7:
 this.$ = { type: "literal", value: $$[$0], type: "integer"} 
break;
case 8:
 this.$ = { type: "literal", value: $$[$0], type: "character"} 
break;
case 9:
 this.$ = { type: "literal", value: $$[$0], type: "string"} 
break;
case 10:
 this.$ = { type: "literal", value: $$[$0], type: "boolean"} 
break;
case 12:
 this.$ = { name: $$[$0-8], range: [$$[$0-6], $$[$0-3]], type: $$[$0] }  
break;
case 13:
 this.$ = { type: 'program', name: $$[$0-1], body: [ ] } 
break;
case 14:
 $$[$0-1].unshift($$[$0]); this.$ = { type: 'program', name: $$[$0-3], body: $$[$0-1] }; 
break;
case 15:
 this.$ = { type: 'program', name: $$[$0-2], body: [ $$[$0] ] } 
break;
case 16:
 this.$ = $$[$0]; 
break;
case 18:
 this.$ = [$$[$0]] 
break;
case 19: case 22:
 $$[$0].unshift($$[$0-1]); this.$ = $$[$0]; 
break;
case 20:
 this.$ = {name: $$[$0-3], value: $$[$0-1].value, type: $$[$0-1].type}
break;
case 21: case 45: case 51: case 62: case 84:
 this.$ = [ $$[$0] ] 
break;
case 23:
 this.$ = { type: 'procedure', routines: $$[$0-2], body: $$[$0-1]}; this.$ = Object.assign(this.$, $$[$0-4], $$[$0-3]); 
break;
case 24:
 this.$ = { type: 'procedure', routines: $$[$0-2], body: $$[$0-1]}; this.$ = Object.assign(this.$, $$[$0-3]); 
break;
case 25:
 this.$ = { type: 'procedure', routines: [], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-3], $$[$0-2]); 
break;
case 26:
 this.$ = { type: 'procedure', routines: [], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-2]); 
break;
case 27: case 28:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: $$[$0-2], const: $$[$0-3], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-4]);
break;
case 29:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: $$[$0-3], const: $$[$0-2], body: $$[$0-1] }; 
break;
case 30:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: $$[$0-2], const: [], body: $$[$0-1] }; 
break;
case 31:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: [], const: $$[$0-2], body: $$[$0-1] }; 
break;
case 32:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: $$[$0-2], const: [], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-3]); 
break;
case 33:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: [], const: $$[$0-2], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-3]);
break;
case 34:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: [], const: [], body: $$[$0-1] }; this.$ = Object.assign(this.$, $$[$0-2]); 
break;
case 35:
 this.$ = { type: 'procedure', name: { value: 'main', type: 'identifier' }, routines: [], body: $$[$0-1] } 
break;
case 38:
 this.$ = { type: $$[$0-7], return: $$[$0-1], params: $$[$0-4], name: $$[$0-6] } 
break;
case 39:
 this.$ = { type: $$[$0-5], params: $$[$0-2], name: $$[$0-4] } 
break;
case 40:
 this.$ = { 'variables': $$[$0] } 
break;
case 41: case 79:
 this.$ = $$[$0-1] 
break;
case 42: case 43: case 44:
 this.$ = [] 
break;
case 46: case 49:
 $$[$0].unshift($$[$0-2]); this.$ = $$[$0]; 
break;
case 47:
 this.$ = { type: $$[$0], name: [ $$[$0-2], $$[$0] ] } 
break;
case 48: case 53:
 this.$ = [ $$[$0-1] ] 
break;
case 50:
 this.$ = { type: $$[$0], name: $$[$0-2] } 
break;
case 52: case 54:
 $$[$0].unshift($$[$0-2]); this.$ = $$[$0] 
break;
case 55:
 this.$ = { type: 'operator', operator: ':=', lhs: $$[$0][0], rhs: $$[$0][1] } 
break;
case 59:
 this.$ = [ $$[$0-2], $$[$0] ] 
break;
case 60:
 this.$ = { type: 'operator', operator: 'conditional', condition: $$[$0-2], if: $$[$0]} 
break;
case 61:
 this.$ = { type: 'operator', operator: 'conditional', condition: $$[$0-4], if: $$[$0-2], else: $$[$0]} 
break;
case 64: case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75: case 76: case 77: case 78:
 this.$ = { type: 'operator', operator: $$[$0-1], lhs: $$[$0-2], rhs: $$[$0] } 
break;
case 82:
 this.$ = { type: 'call', name: $$[$0-3], args: $$[$0-1] } 
break;
case 83:
 this.$ = [ ] 
break;
case 85:
 $$[$0].push($$[$0-2]); this.$ = $$[$0]; 
break;
case 88:
 this.$ = { type: "operator", operator: $$[$0-7], statements: $$[$0], variable: $$[$0-6], range: [$$[$0-4], $$[$0-2]] } 
break;
}
},
table: [{3:1,4:2,24:[1,3]},{1:[3]},{5:[1,4]},{6:6,7:$V0,25:5},{1:[2,1]},{26:[1,8]},{26:[2,16]},o([26,33,41,43,44,55,61,63,65,66,67,68,69,70,71,72,73,74,75,76,77,78],[2,2]),{5:[2,13],27:9,28:10,29:13,30:$V1,34:11,35:15,36:12,37:14,38:19,39:20,40:$V2,45:$V3,46:$V4,48:$V5},{27:25,28:23,29:13,30:$V1,34:11,35:15,36:12,37:24,38:19,39:20,40:$V2,45:$V3,46:$V4,48:$V5},{5:[2,15]},o([30,46,48],[2,21],{34:11,35:15,38:19,39:20,27:26,40:$V2,45:$V3}),{27:28,29:27,30:$V1,34:11,35:15,37:29,38:19,39:20,40:$V2,45:$V3,48:$V5},{27:31,34:11,35:15,36:30,37:32,38:19,39:20,40:$V2,45:$V3,46:$V4,48:$V5},{21:[1,33]},{27:35,34:11,35:15,36:34,37:36,38:19,39:20,40:$V2,45:$V3,46:$V4,48:$V5},{6:40,7:$V0,47:37,53:39,54:38},{6:43,7:$V0,31:41,32:42},{6:51,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,49:44,50:[1,45],56:46,57:47,58:48,59:49,60:50,62:$Vb,81:55,82:$Vc},o($Vd,[2,36]),o($Vd,[2,37]),{6:65,7:$V0},{6:66,7:$V0},{5:[2,14]},{21:[1,67]},{37:68,48:$V5},o($Ve,[2,22]),{27:69,34:11,35:15,37:70,38:19,39:20,40:$V2,45:$V3,48:$V5},{37:71,48:$V5},{21:[1,72]},{27:73,34:11,35:15,38:19,39:20,40:$V2,45:$V3},{37:74,48:$V5},{21:[1,75]},{5:[2,35]},{27:76,34:11,35:15,37:77,38:19,39:20,40:$V2,45:$V3,48:$V5},{37:78,48:$V5},{26:[1,79]},o($Vf,[2,40]),{26:[1,80]},{44:[1,81]},{44:[2,51],55:[1,82]},o($Vd,[2,17]),o($Vd,[2,18],{32:42,6:43,31:83,7:$V0}),{33:[1,84]},{50:[1,85]},o($Vg,[2,42]),{26:[1,86]},o($Vh,[2,55]),o($Vh,[2,56],{33:$Vi,44:$Vj,66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw}),o($Vh,[2,57]),o($Vh,[2,58]),o([26,33,44,65,66,67,68,69,70,71,72,73,74,75,76,77,78],$Vx,{41:$Vy,61:[1,102]}),{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:104},o($Vz,[2,80]),{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:106},o($Vh,[2,87]),o($Vz,[2,7]),o($Vz,[2,8]),o($Vz,[2,9]),o($Vz,[2,10]),{6:107,7:$V0},o([21,22,26,33,43,44,55,63,65,66,67,68,69,70,71,72,73,74,75,76,77,78,83,84],[2,3]),o($Vz,[2,5]),o($Vz,[2,4]),o($Vz,[2,6]),{41:[1,108]},{41:[1,109]},{5:$VA},{21:[1,110]},{37:111,48:$V5},{21:[1,112]},{21:[1,113]},{5:[2,34]},{37:114,48:$V5},{21:[1,115]},{5:[2,31]},{37:116,48:$V5},{26:[1,117]},{26:[1,118]},o($Ve,[2,26]),o($Vf,[2,48],{54:38,53:39,6:40,47:119,7:$V0}),{17:120,18:$VB,19:$VC},{6:40,7:$V0,53:123},o($Vd,[2,19]),{8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:124},o($Vg,[2,41]),{6:51,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,49:125,50:[2,53],56:46,57:47,58:48,59:49,60:50,62:$Vb,81:55,82:$Vc},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:126},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:127},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:128},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:129},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:130},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:131},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:132},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:133},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:134},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:135},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:136},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:137},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:138},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:139},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:140},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,58:141},{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,43:$VD,51:143,58:145,79:142,80:144},{33:$Vi,43:[1,146],44:$Vj,66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw},o($Vz,$Vx,{41:$Vy}),{33:$Vi,44:$Vj,63:[1,147],66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw},{61:[1,148]},{6:40,7:$V0,42:149,43:$VD,51:150,52:151,53:152},{6:40,7:$V0,42:153,43:$VD,51:150,52:151,53:152},{5:$VA},{21:[1,154]},{5:[2,33]},{5:[2,32]},{21:[1,155]},{5:[2,29]},{26:[1,156]},o($Ve,[2,25]),o($Ve,[2,24]),o($Vf,[2,49]),{26:[2,50]},o($VE,[2,11]),{20:[1,157]},{44:[2,52]},{26:[1,158]},{50:[2,54]},o($VF,[2,64],{68:$Vm,69:$Vn,70:$Vo,76:$Vu,78:$Vw}),o($VF,[2,65],{68:$Vm,69:$Vn,70:$Vo,76:$Vu,78:$Vw}),o($VG,[2,66],{78:$Vw}),o($VG,[2,67],{78:$Vw}),o($VG,[2,68],{78:$Vw}),o($VH,[2,69],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VH,[2,70],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VH,[2,71],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VH,[2,72],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VH,[2,73],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VH,[2,74],{66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,76:$Vu,77:$Vv,78:$Vw}),o($VG,[2,75],{78:$Vw}),o($VF,[2,76],{68:$Vm,69:$Vn,70:$Vo,76:$Vu,78:$Vw}),o($Vz,[2,77]),o([26,43,44,55,63,65],[2,78],{33:$Vi,66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw}),o($Vh,[2,59],{33:$Vi,44:$Vj,66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw}),{43:[1,159]},{43:[2,83]},{43:[2,84],55:[1,160]},o([43,55],[2,86],{33:$Vi,44:$Vj,66:$Vk,67:$Vl,68:$Vm,69:$Vn,70:$Vo,71:$Vp,72:$Vq,73:$Vr,74:$Vs,75:$Vt,76:$Vu,77:$Vv,78:$Vw}),o($Vz,[2,79]),{6:51,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,37:163,41:$Va,48:$V5,56:162,57:47,58:48,59:49,60:50,62:$Vb,64:161,81:55,82:$Vc},{8:164,9:$V6},{43:[1,165]},{43:[2,44]},{26:[1,166],43:[2,45]},{44:[1,167]},{43:[1,168]},{5:[2,27]},{5:[2,28]},o($Ve,[2,23]),{8:169,9:$V6},o([7,40,45,46,48],[2,20]),o($Vz,[2,82]),{6:105,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,41:$Va,43:$VD,51:143,58:145,79:170,80:144},{26:[2,60],65:[1,171]},o($Vh,[2,62]),o($Vh,[2,63]),{83:[1,172]},{26:[1,173]},{6:40,7:$V0,42:174,43:$VD,51:150,52:151,53:152},{17:175,18:$VB,19:$VC},{44:[1,176]},{21:[1,177]},{43:[2,85]},{6:51,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,37:163,41:$Va,48:$V5,56:162,57:47,58:48,59:49,60:50,62:$Vb,64:178,81:55,82:$Vc},{8:179,9:$V6},o($Vd,[2,39]),{43:[2,46]},o($VE,[2,47]),{17:180,18:$VB,19:$VC},{21:[1,181]},o($Vh,[2,61]),{84:[1,182]},{26:[1,183]},{8:184,9:$V6},{6:51,7:$V0,8:56,9:$V6,10:58,11:$V7,12:57,13:$V8,14:59,15:$V9,16:53,37:163,41:$Va,48:$V5,56:162,57:47,58:48,59:49,60:50,62:$Vb,64:185,81:55,82:$Vc},o($Vd,[2,38]),{22:[1,186]},o($Vh,[2,88]),{23:[1,187]},{18:[1,188]},o($VE,[2,12])],
defaultActions: {4:[2,1],6:[2,16],10:[2,15],23:[2,14],33:[2,35],67:[2,30],72:[2,34],75:[2,31],110:[2,30],112:[2,33],113:[2,32],115:[2,29],120:[2,50],123:[2,52],125:[2,54],143:[2,83],150:[2,44],154:[2,27],155:[2,28],170:[2,85],174:[2,46]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 26;
break;
case 1:/* skip whitespace */
break;
case 2:return 24;
break;
case 3:return 46;
break;
case 4:return 48;
break;
case 5:return 50;
break;
case 6:return 62;
break;
case 7:return 23;
break;
case 8:return 63;
break;
case 9:return 65;
break;
case 10:return 'WHILE';
break;
case 11:return 84;
break;
case 12:return 83;
break;
case 13:return 82;
break;
case 14:return 40;
break;
case 15:return 45;
break;
case 16:return 30;
break;
case 17:return 19;
break;
case 18:return '{';
break;
case 19:return '}';
break;
case 20:return '#';
break;
case 21:return '?';
break;
case 22:return 61;
break;
case 23:return 41;
break;
case 24:return 43;
break;
case 25:return 20;
break;
case 26:return 22;
break;
case 27:return 69;
break;
case 28:return 68;
break;
case 29:return 70;
break;
case 30:return 66;
break;
case 31:return 67;
break;
case 32:return 74;
break;
case 33:return 72;
break;
case 34:return 75;
break;
case 35:return 73;
break;
case 36:return 33;
break;
case 37:return 55;
break;
case 38:return 44;
break;
case 39:return 21;
break;
case 40:return 76;
break;
case 41:return 77;
break;
case 42:return 78;
break;
case 43:return 5;
break;
case 44:return 18;
break;
case 45:return 7;
break;
case 46:return 9;
break;
case 47:return 15;
break;
case 48:return 13;
break;
case 49:return 11;
break;
case 50:return 5;
break;
}
},
rules: [/^(?:;)/,/^(?:\s+)/,/^(?:program\b)/,/^(?:var\b)/,/^(?:begin\b)/,/^(?:end\b)/,/^(?:if\b)/,/^(?:of\b)/,/^(?:then\b)/,/^(?:else\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:to\b)/,/^(?:for\b)/,/^(?:function\b)/,/^(?:procedure\b)/,/^(?:const\b)/,/^(?:array\b)/,/^(?:\{)/,/^(?:\})/,/^(?:#)/,/^(?:\?)/,/^(?::=)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:\+)/,/^(?:-)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:=)/,/^(?:,)/,/^(?::)/,/^(?:\.)/,/^(?:and\b)/,/^(?:or\b)/,/^(?:not\b)/,/^(?:$)/,/^(?:character|integer|boolean|string\b)/,/^(?:[$a-zA-Z_]+[A-Za-z0-9_]*)/,/^(?:[\+\-]?\d+)/,/^(?:true|false\b)/,/^(?:'.')/,/^(?:'(\\.|[^'\\])*')/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = pascalet;
exports.Parser = pascalet.Parser;
exports.parse = function () { return pascalet.parse.apply(pascalet, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}