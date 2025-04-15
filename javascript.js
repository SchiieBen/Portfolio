const userId = '423203807099355156';
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

async function fetchDiscordData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const user = data.data.discord_user;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        const status = data.data.discord_status;
        const activity = data.data.activities.find(act => act.type === 0);

        document.getElementById("avatar").src = avatarUrl;
        document.getElementById("username").textContent = `${user.username}`;
        document.getElementById("status").textContent = `Status: ${status}`;
        document.getElementById("activity").textContent = activity 
            ? `Jogando: ${activity.name}` 
            : `Nenhum jogo ativo`;
    } catch (error) {
        document.getElementById("username").textContent = "Erro ao carregar Discord";
    }
}

fetchDiscordData();
