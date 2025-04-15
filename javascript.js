const userId = '423203807099355156';
const ws = new WebSocket(`wss://api.lanyard.rest/socket`);

let heartbeatInterval = null;

ws.onmessage = ({ data }) => {
    const payload = JSON.parse(data);

    if (payload.op === 1) {
        heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
        }, payload.d.heartbeat_interval);
        ws.send(JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: userId
            }
        }));
    }

    if (payload.t === "INIT_STATE" || payload.t === "PRESENCE_UPDATE") {
        const data = payload.d;

        const user = data.discord_user;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        const username = user.username;
        const displayName = user.global_name || user.username;
        const status = data.discord_status;
        const customStatus = data.activities.find(a => a.type === 4)?.state || "—";

        document.getElementById("avatar").src = avatarUrl;
        document.getElementById("username").textContent = `@${username}`;
        document.getElementById("display-name").textContent = displayName;
        document.getElementById("custom-status").textContent = customStatus;

        const statusDot = document.getElementById("status-dot");
        const statusColors = {
            online: "#43b581",
            idle: "#faa61a",
            dnd: "#f04747",
            offline: "#747f8d"
        };
        statusDot.style.backgroundColor = statusColors[status] || "#747f8d";
    }
};
