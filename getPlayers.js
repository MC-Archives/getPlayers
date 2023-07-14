/* https://playerdb.co/api/player/minecraft/230d277f-378f-4ea0-978f-22486996f0c5 */
const fs = require('fs');
const fetch = require('node-fetch');

/* Vars */
let serverName = "POD";
const serverFolder = "20-7-10_POD1.15.2/world/";
const serverRootDir = "../Backup/worlds/";
let worldDir = `${serverRootDir}${serverName}/${serverFolder}`;
const args = process.argv.slice(2);
if (args !== '') {
    worldDir = args[0];
    serverName = args[1];
}
console.log(worldDir);
const saveDir = './json';

let playerDataArray = [];

let writeToFile = (data) => {
    if (!fs.existsSync(saveDir)) {
        console.log(`Creating folder ${saveDir}`);
        fs.mkdirSync(saveDir);
    }
    fs.writeFile(`${saveDir}/${serverName}.json`, data, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

let getPlayerName = async (uuid) => {
    try {
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${uuid}`)
        const json = await response.json()
        if (json.code !== 'player.found') {
            console.log('Error: ');
            console.log(json);
        }
        console.log(json.data);
        let playerData = json.data.player;
        let player = {
            "username": playerData.username,
            "id": uuid
        };
        playerDataArray.push(player);
        writeToFile(JSON.stringify(playerDataArray));
    } catch (error) {
        console.log(error);
    }
}

/* Get player files, turn into list of UUIDs */
fs.readdir(`${worldDir}/playerdata`, (err, files) => {
    files.forEach(file => {
        let playerUUID = file.replace(/\.[^/.]+$/, "");
        // console.log(playerUUID);
        getPlayerName(playerUUID);
    });
});

