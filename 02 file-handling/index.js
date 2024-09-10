const fs = require('fs')
console.log(fs)
// synchronous
fs.writeFileSync('./02 file-handling/text.txt',"This is the content of file")


// asynchronous
fs.writeFile('./02 file-handling/text.txt',"This is the content of file",(err)=>{console.log()})

// synchronous read
const syncData = fs.readFileSync('./02 file-handling/text.txt','utf-8')
console.log(syncData)

// asynchronous write
fs.readFile('./02 file-handling/text.txt','utf-8',(err,result)=>{
    if(err){
        console.log(err)
    }
    console.log(result)
})

// append data in file synchronously 
fs.appendFileSync('./02 file-handling/text.txt',`\n${new Date()}`)

// copy file data
fs.cpSync('./02 file-handling/text.txt','./02 file-handling/copy.txt')

// delete file
fs.unlinkSync('./02 file-handling/copy.txt')


// stat of file
console.log(fs.statSync('./02 file-handling/text.txt'))


// create folder
fs.mkdirSync('my-docs')