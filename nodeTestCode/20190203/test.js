const string = 'name=hello;year=1994';

print(string.split(';')
    .map(v => v.split('=')
    .map(([k, ...vs])=>{
        console.log(k, vs);
        return [k, vs.join('=')];
    })));

function print(a){
    console.log(a);
}