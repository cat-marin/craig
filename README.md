# craig
A shitty discord bot for our server, the nixfits


# Dependencies
- discord.js

# Installation
These steps are fairly simple to follow. While Craig is mainly for our server (The Nixfits), he is super simple to use for your own server, or for testing and adding features for The Nixfits.
`joinmessages.json` can be replaced with whatever you want, as long as the filename remains the same (you can add or remove join messages for your own usecase).
1. Create a file called `token.json` in the root of your craig directory. Within that file create an object called `token` and put your bot account's token in as a string within said object.
2. Copy the example config (`config_example.json`) to `config.json` and edit it to suit your server.
3. Navigate to `craig/modules/comConfig` and copy the example configs to their corresponding file names (e.g. help.json, role.json, etc.) and modify them to suit your needs (i.e. whitelist your roles in role.json, and add your commands to the help json file).
4. Start Craig! Everything should be working by now, if not feel free to join The Nixfits and ask cat or nyx about the Craig setup (https://nixfits.xyz/invite)
