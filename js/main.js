/**
 * ACME-OS Nexus - Multimedia & Input Engine
 * Developed by: David Nisbet | NTCyber Ltd
 */

import { handleCommand } from './command.js';

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const commandHistory = [];
let historyIndex = -1;

// --- AUDIO ASSETS (Updated Paths) ---
const typeSound = new Audio('assets/sounds/click.mp3');
const bootSound = new Audio('assets/sounds/startup.mp3');
typeSound.volume = 0.2;

// --- BOOT SEQUENCE ---
const bootLines = [
    "--- NTCYBER LTD SECURE BOOT v1.0.4 ---",
    "ARCHITECT: DAVID NISBET",
    "INITIALIZING KERNEL...",
    "CONNECTING TO OFFICE-SERVER [192.168.1.106]...",
    "MOUNTING VOLUMES: /bin, /etc, /home, /var...",
    "SECURITY AUDIT: SCANNING NODES .106 and .107...",
    "LOADING ACME-OS NEXUS EDITION...",
    "SYSTEM READY. WELCOME GUEST.",
    "---------------------------------------",
    " "
];

async function runBoot() {
    input.disabled = true;
    
    // Play startup sound
    bootSound.play().catch(e => console.log("Startup sound waiting for user click."));

    for (const line of bootLines) {
        const div = document.createElement('div');
        div.className = 'line';
        div.innerText = line;
        output.appendChild(div);
        await new Promise(r => setTimeout(r, 300));
        window.scrollTo(0, document.body.scrollHeight);
    }
    input.disabled = false;
    input.focus();
}

// --- INPUT HANDLING ---
input.addEventListener('keydown', (e) => {
    // Play clicking sound on keypress
    if (e.key.length === 1) {
        typeSound.currentTime = 0;
        typeSound.play().catch(() => {});
    }

    // Command History (Up/Down Arrows)
    if (e.key === 'ArrowUp') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[commandHistory.length - 1 - historyIndex];
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else {
            historyIndex = -1;
            input.value = "";
        }
        e.preventDefault();
    }

    // Execute Command
    if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
            commandHistory.push(val);
            historyIndex = -1;
        }

        // Display user input line
        const line = document.createElement('div');
        line.innerHTML = `<span class="prompt">guest@acme-os:~$</span> ${val}`;
        output.appendChild(line);

        // Process Command
        if (val.toLowerCase() === 'clear') {
            output.innerHTML = '';
        } else {
            const response = handleCommand(val);
            if (response) {
                const resLine = document.createElement('div');
                resLine.className = 'line';
                resLine.style.marginBottom = "10px";
                resLine.innerText = response;
                output.appendChild(resLine);
            }
        }

        input.value = '';
        window.scrollTo(0, document.body.scrollHeight);
    }
});

// Auto-focus on click
document.addEventListener('click', () => {
    if (!input.disabled) input.focus();
});

runBoot();