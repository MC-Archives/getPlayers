const fs = require('fs');

const jsonDir = "./json/";
let bigPlayerList = {};

let writeToFile = (data) => {
    fs.writeFile(`${jsonDir}/bigList.json`, data, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

fs.readdir(jsonDir, (err, files) => {
    files.forEach(file => {
        if (file == 'bigList.json') {
            return;
        }
        let serverName = file.replace(/\.[^/.]+$/, "");
        // console.log(serverName);
        /* read file */
        const filePath = `${jsonDir}${file}`;
        if (fs.existsSync(filePath)) {
            let rawData = fs.readFileSync(filePath);
            const data = JSON.parse(rawData);
            bigPlayerList[serverName] = data;
        }
    });
    console.log(bigPlayerList);
    writeToFile(JSON.stringify(bigPlayerList));
});