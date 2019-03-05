const {URL} = require('url');
const a = global.console.log;
const URL2 = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
a('searchParams:', myURL.searchParams);
a('searchParams:getAll():', myURL.searchParams.getAll('category'));
a('searchParams.get():', myURL.searchParams.get('limit'));
a('searchParams.has():', myURL.searchParams.has('page'));

a('searchParams.keys():',myURL.searchParams.keys());
a('searchParams.values():', myURL.searchParams.values());

myURL.searchParams.append('filter','es3');
myURL.searchParams.append('filter','es5');
a(myURL.searchParams.getAll('filter'));
a(URL2.format(myURL));
myURL.searchParams.set('filter','es6');
a(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
a(myURL.searchParams.getAll('filter'));

a('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
