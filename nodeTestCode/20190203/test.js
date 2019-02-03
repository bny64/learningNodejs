const string = 'name=hello;year=1994';

print(string.split(';') //['name=hello', 'year=1994']
    .map(v => v.split('=') //[['name', 'hello'], ['year', '1994']]
    .map(([k, ...vs])=>{
        console.log(k, vs);
        return [k, vs.join('=')];
    })));

function print(a){
    console.log(a);
}