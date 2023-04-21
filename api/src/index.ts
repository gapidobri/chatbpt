import { config } from 'dotenv';
import { setupDiscordBot } from './discord.js';
import { setupSocket } from './socket.js';
config();

setupDiscordBot();
setupSocket();
