/**
 * ACME-OS Nexus - Virtual Filesystem (VFS)
 * Architecture by: David Nisbet | NTCyber Ltd
 * Structure: Standard Linux FHS
 */

export const virtualFS = {
    "/": ["bin", "etc", "home", "usr", "var", "dev"],
    "/bin": ["help", "ls", "cd", "pwd", "cat", "whoami", "status", "netstat", "nmap", "decode", "theme", "mission", "neofetch", "clear", "ssh"],
    "/etc": ["motd", "hosts", "os-release", "banner.txt"],
    "/home": ["guest", "david"],
    "/home/guest": ["welcome.txt", "tutorial.sh"],
    "/home/david": ["portfolio.url", "todo.txt", "ssh_config"],
    "/usr/share/docs": ["smb_checklist.pdf", "password_policy.pdf", "incident_response.pdf"],
    "/var/log": ["auth.log", "intrusion.log", "syslog"],
    "/dev": ["node_106", "node_107"]
};

export const fileContent = {
    // --- System / ETC ---
    "motd": "NOTICE: Authorized Access Only. All activities are logged by ACME-OS Kernel.",
    "os-release": "PRETTY_NAME=\"ACME-OS Nexus v4.2\"\nID=acme-os\nHOME_URL=\"https://ntcyber.com\"",
    "banner.txt": "************************************************\n* ACME CORP - SECURE ACCESS GATEWAY          *\n* Designed by David Nisbet | NTCyber Ltd     *\n************************************************",
    
    // --- User / Home ---
    "welcome.txt": "Welcome to the Nexus. Your current role is: GUEST.\nType 'mission start' to begin the security audit challenge.",
    "tutorial.sh": "STUCK? Use 'cd /bin' to see tools or 'cd /var/log' to investigate the system.",
    "portfolio.url": "https://ntcyber.com",
    "todo.txt": "1. Complete SOC Setup for nodes .106 and .107.\n2. Finalize File Browser container.\n3. Send security audit to ACME Board.",
    
    // --- Documentation / USR ---
    "smb_checklist.pdf": "[FILE LINKED TO EXTERNAL STORAGE: smb_security_v1.pdf]",
    "password_policy.pdf": "[FILE LINKED TO EXTERNAL STORAGE: policy_template.pdf]",
    "incident_response.pdf": "[FILE LINKED TO EXTERNAL STORAGE: ir_plan.pdf]",

    // --- Logs / VAR ---
    "auth.log": "Feb 03 18:42:01 node_106 login[542]: pam_unix(sshd:session): session opened for user david\nFeb 03 19:10:44 node_107 sshd[1022]: Connection closed by authenticating user root 192.168.1.107 [preauth]",
    "intrusion.log": "CRITICAL: Suspicious activity detected on port 443.\nTRACE: Target node_107.\nLOG_ENTRY: [ENCRYPTED_STRING: QWRtaW5QYXNzMjAyNg==]\nHINT: Use the 'decode' tool on the string above.",
    "syslog": "System health: OPTIMAL. All Docker containers running on ntcyber@office-server."
};

/**
 * MISSION DATA
 * Used for the 'mission' command logic.
 */
export const missionData = {
    start: "ALERT: ACME Corp servers have flagged a suspicious login on node_107. \nTASK: Locate the 'intrusion.log' in the system logs and find the hidden Admin credentials.",
    hint: "Logs are traditionally stored in the '/var/log' directory.",
    success: "ACCESS GRANTED. You have found the Admin password 'AdminPass2026'. Use it to 'login' and unlock full system permissions."
};