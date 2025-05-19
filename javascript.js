document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bgMusic');
    const toggleButton = document.getElementById('toggleMusic');
    const volumeSlider = document.getElementById('volumeSlider');

    let isPlaying = false;

    toggleButton.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            toggleButton.textContent = '🔇 Turn music ON';
        } else {
            music.play();
            toggleButton.textContent = '🔊 Turn music OFF';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        music.volume = volumeSlider.value;
    });

    music.volume = volumeSlider.value;

    // Discord via Lanyard
    const userId = '423203807099355156';
    const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

    async function updateDiscordCard() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!data.success) throw new Error("Erro ao buscar dados");

            const user = data.data.discord_user;
            const status = data.data.discord_status;
            const activities = data.data.activities;
            const customStatus = activities.find(a => a.name === "Custom Status");
            const playing = activities.find(a => a.type === 0);

            const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
            const displayName = user.global_name || user.username;

            // Preencher os dados no card
            document.getElementById('avatar').src = avatarUrl;
            document.getElementById('global-name').textContent = displayName;
            document.getElementById('username').textContent = `@${user.username}`;
            document.getElementById('custom-status').textContent = customStatus?.state || "-";
            document.getElementById('activity').textContent = playing
                ? `🎮 Jogando: ${playing.name}`
                : "Nenhum jogo ativo";

            // Círculo de status
            const statusCircle = document.getElementById('status-circle');
            statusCircle.className = `status ${status}`;
        } catch (error) {
            console.error("Erro ao carregar status do Discord:", error);
            document.getElementById('global-name').textContent = "Desconhecido";
            document.getElementById('username').textContent = "@Erro";
            document.getElementById('custom-status').textContent = "-";
            document.getElementById('activity').textContent = "-";
        }
    }

    updateDiscordCard();
    setInterval(updateDiscordCard, 15000); // Atualiza a cada 15s
});
