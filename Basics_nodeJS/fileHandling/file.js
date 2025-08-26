const fs = require("fs");
const os = require("os");
console.log(os.cpus().length);


//Creating and writing to the file
//this is syncronous Blocking operation
// fs.writeFileSync('./text.txt','this is throught the file system')

//this is Asynchronous.... Non-Blocking Operation
// fs.writeFile('./text.txt','this is through asyncronous',(err) => {});

//append this avoid overwriting
// fs.appendFileSync('./text.txt',`${Date.now()}this is append now`);
// fs.appendFileSync('./text.txt',new Date().getHours().toLocaleString());






//Reading the files...
//this is how sync is used
//blocking
// const read  = fs.readFileSync('./contacts.txt',"utf-8");
// console.log(read);

//for Async to use there used to be the third argument..it does not return anything
//it does not return anything its a void...
//this is non-blocking we should used this
// fs.readFile('./contacts.txt','utf-8',(err,variable)=>{
//     if(err){
//         console.log("an error occured");
//     }else{
//         console.log(variable);
//     }
// })


// Blocking are called syncronous and non-blocking are called Asyncronous
// console.log(1);
// const result = fs.readFileSync('./text.txt','utf-8');
// console.log(result);
// console.log(2);
// output: 1 and the result and then 2 ..2 has to wait until result is being printed that y is blocking

// Non-blocking
console.log(1);
fs.readFile('./text.txt','utf-8',(err,ans) => {
    console.log(ans);
} )
console.log(2);
// output: 1 2 and then the ans

