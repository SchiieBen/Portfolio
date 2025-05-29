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
            if (playing) {
                document.getElementById("activity-name").textContent = playing.name || "-";
                const iconEl = document.getElementById("activity-icon");

                if (playing.assets?.large_image) {
                    let image = playing.assets.large_image;
                    let appId = playing.application_id;

                    // Verifica se o link é externo (e não compatível com app-assets)
                    if (image.startsWith("mp:") || image.startsWith("spotify:")) {
                    console.warn("Imagem de app externa, fallback ativado:", image);
                    iconEl.src = "fallback.png";
                    } else {
                        iconEl.src = `https://cdn.discordapp.com/app-assets/${appId}/${image}.png`;
                    }
                } else {
                    
                    iconEl.src = "fallback.png";
                }

            } else {
                document.getElementById("activity-name").textContent = "Nenhum jogo ativo";
                document.getElementById("activity-icon").src = "fallback.png";
}

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
