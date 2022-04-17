// Puts discord.js package info into a variable
const Discord = require("discord.js");

// .env variables into a global variable with process.env
require("dotenv").config();

// Creates bot client to access Discord API
const client = new Discord.Client({
    intents: [
        "GUILDS", // Guilds are Discord Servers
        "GUILD_MESSAGES" // Things to look out for
    ]
});

const mongoose = require('mongoose');

// Ready Event Listener - triggers when bot login is successful
client.on("ready", () => {
    console.log(`${client.user.tag} login successful`)
});

client.on("messageCreate", (message) => {
    if(message.content == "Hi!") {
        message.reply("Hello World!")
    }
})

mongoose.connect(process.env.MONGODB_SRV)
.then(() => {
    console.log('Database connected'); //temporary for testing
})
.catch((err) => {
    console.log(err); //error catching for testing
});

// Bot login
client.login(process.env.TOKEN);
