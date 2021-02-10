const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    try {
        // store the read file contents
        var contents = fs.readFileSync(path, 'utf8');
        console.log(`${contents}`);
      } 
    catch (error) {
        // errors thrown by fs will be caught here
        console.error(error);
        // kill the process and tell the shell it errored
        process.exit(1);
      }
}

async function webCat(url){
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    }
    catch (error) {
        console.error(`Error getting ${url}: ${error}`);
        process.exit(1);
    }

}

let path = process.argv[2]

if (path.includes("http")){
    webCat(path)
}
else {
    cat(path);
}
