const fs = require('fs');
const process = require('process');
const axios = require('axios');

if (process.argv.includes("--out")) {

    function catWrite(path, filename){
        try {
            // store the read file contents
            var contents = fs.readFileSync(path, 'utf8');
            fs.writeFile(`${filename}`, contents, 'utf8',  function(err){
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
            })
        } 
        catch (error) {
            // errors thrown by fs will be caught here
            console.error(error);
            // kill the process and tell the shell it errored
            process.exit(1);
        }

    }

    async function webCatWrite(url, filename){
        try {
            let resp = await axios.get(url)
            fs.writeFile(`${filename}`, resp.data, 'utf8' , function(err){
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
            })
        }
        catch (error) {
            console.error(`Error getting ${url}: ${error}`);
            process.exit(1);
        }

    }


    let path = process.argv[4]
    let filename = process.argv[3]

    if (path.includes("http")){
        webCatWrite(path, filename)
    }
    else {
        catWrite(path, filename);
    }

}





else {
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
}