/**
 * ACME-OS Nexus - Command Engine
 * Logic by: David Nisbet | NTCyber Ltd
 */

import { virtualFS, fileContent, missionData } from './filename.js';

// --- SYSTEM STATE ---
let currentDir = "/";
let userRole = "guest"; // Can change to 'admin'
let isAdmin = false;

export function handleCommand(input) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    switch (cmd) {
        // --- NAVIGATION ---
        case 'ls':
            const items = virtualFS[currentDir];
            return items ? items.join('   ') : "Directory empty.";

        case 'cd':
            if (!arg || arg === ".." || arg === "~") {
                currentDir = "/";
                return "Directory: /";
            }
            const targetPath = currentDir === "/" ? `/${arg}` : `${currentDir}/${arg}`;
            if (virtualFS[targetPath]) {
                currentDir = targetPath;
                return `Switched to: ${currentDir}`;
            }
            return `bash: cd: ${arg}: No such directory`;

        case 'pwd':
            return currentDir;

        // --- FILE OPERATIONS ---
        case 'cat':
            if (!arg) return "Usage: cat [filename]";
            // Security Check
            if (arg === "intrusion.log" && currentDir !== "/var/log") return "Error: File not found in current directory.";
            return fileContent[arg] || "Error: Access denied or file does not exist.";

        // --- SECURITY TOOLS ---
        case 'decode':
            if (!arg) return "Usage: decode [Base64Text]";
            try { 
                const decoded = atob(arg);
                if (decoded === "AdminPass2026") {
                    return `DECODED: ${decoded}\nSYSTEM: Password match found. Use 'login admin AdminPass2026' to elevate privileges.`;
                }
                return `DECODED: ${decoded}`;
            } catch { return "Error: Invalid Base64 string."; }

        case 'nmap':
            return "Starting Nmap 7.92 ( https://nmap.org )\n" +
                   "Nmap scan report for 192.168.1.106 (ntcyber-portfolio)\nHost is UP.\n" +
                   "Nmap scan report for 192.168.1.107 (soc-node-primary)\nHost is OFFLINE - MAINTENANCE REQUIRED.";

        case 'netstat':
            return "ACTIVE CONNECTIONS:\nLocal Address          Foreign Address        State\n" +
                   "192.168.1.106:443      0.0.0.0:* LISTEN\n" +
                   "192.168.1.107:22       0.0.0.0:* CLOSED";

        // --- IDENTITY & AUTH ---
        case 'whoami':
            return `User: ${userRole}\nStatus: ${isAdmin ? "System Administrator" : "Authorized Guest"}\nConsultant: David Nisbet (NTCyber Ltd)`;

        case 'login':
            if (parts[1] === "admin" && parts[2] === "AdminPass2026") {
                isAdmin = true;
                userRole = "admin";
                return "AUTHENTICATION SUCCESSFUL. Welcome, Administrator.";
            }
            return "AUTHENTICATION FAILED. Invalid credentials.";

        // --- MISSION SYSTEM ---
        case 'mission':
            if (arg === "start") return missionData.start;
            if (arg === "hint") return missionData.hint;
            return "Usage: mission [start|hint]";

        // --- VISUALS & THEMES ---
        case 'neofetch':
            return `      
      .---.        OS: ACME-OS Nexus v4.2
     /     \\       Kernel: NTC-Secure-LNX
    | () () |      Uptime: 142 days
     \\  ^  /       Packages: 1024 (dpkg)
      |||||        Shell: nt-bash 5.1
      '|||'        Architect: David Nisbet
            `;

        case 'theme':
            const themeMap = {
                'red': { color: '#ff4141', glow: '0 0 5px #ff4141' },
                'white': { color: '#ffffff', glow: '0 0 5px #ffffff' },
                'green': { color: '#00ff41', glow: '0 0 5px #00ff41' },
                'blue': { color: '#00e5ff', glow: '0 0 5px #00e5ff' }
            };
            if (themeMap[arg]) {
                document.body.style.color = themeMap[arg].color;
                document.body.style.textShadow = themeMap[arg].glow;
                return `Theme updated to ${arg}.`;
            }
            return "Usage: theme [green|red|white|blue]";

        case 'help':
            return "NAV: ls, cd, pwd | FILES: cat\nSYSTEM: info, whoami, neofetch, clear, theme\nSECURITY: nmap, netstat, decode, mission, login";

        default:
            return `acme-os: command not found: ${cmd}`;
    }
}