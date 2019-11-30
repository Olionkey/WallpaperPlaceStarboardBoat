const auth = require("./nothinginhereforyou/auth.json");
const config = require("./nothinginhereforyou/config.json");
const figlet = require("figlet");
const chalk = require("chalk");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const child_process = require("child_process");

client.login(auth.token);
client.on("ready", () => {
    console.log(
        chalk.rgb(235, 97, 35)(
            figlet.textSync("<<<< [Bot Overload ", {
                font: 'poison',
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    )
    console.log(
        chalk.rgb(235, 97, 35)(
            figlet.textSync("                   Launched] >>>> ", {
                font: 'poison',
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    )

});




function workerProcessSpawn() {
    let workerProcess = child_process.spawn('node', ['./index.js'], {
        stdio: "inherit"
    });
    workerProcess.on('close', function (code) {
        console.log('Bot process exited with code ' + code);
        console.log(chalk.grey("Bot offline, changing status"));
        client.user.setStatus('dnd');
        client.user.setActivity("Looks like I crashed...")
    });
    return workerProcess
};

var process = workerProcessSpawn();

/* Will run when it sees a message */
client.on("message", async message => {
    if (message.content === `${config.prefix}r`) {

        if (message.member.roles.some(r => ['Developers'].includes(r.name))) {
            await message.delete(); // no worky work
            if (message.guild !== null) {
                console.log(chalk.red(`<<<<<[Restart command issued from guild '${message.guild.name}' by ${message.author.tag}]>>>>>`));
            } else {
                console.log(chalk.red(`<<<<<[Restart command issued from DM by ${message.author.tag}]>>>>>`));
            }
            client.user.setStatus('idle')
            process.kill();
            process = workerProcessSpawn();
        }
    }

});