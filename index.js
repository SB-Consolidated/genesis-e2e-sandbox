const http=require('http');const todos=[];
module.exports.add=t=>{todos.push(t);return todos.length};
if(require.main===module)http.createServer((q,r)=>r.end(JSON.stringify(todos))).listen(3000);
