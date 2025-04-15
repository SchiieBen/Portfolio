document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bgMusic');
    const toggleButton = document.getElementById('toggleMusic');
    const volumeSlider = document.getElementById('volumeSlider');

    let isPlaying = false;

    toggleButton.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            toggleButton.textContent = '🔇 Ligar Música';
        } else {
            music.play();
            toggleButton.textContent = '🔊 Desligar Música';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        music.volume = volumeSlider.value;
    });

    music.volume = volumeSlider.value;
const userId = "423203807099355156";

    async function getStatus() {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        const statusDiv = document.getElementById("discord-status");

        if (data.success) {
            const { discord_user, discord_status, activities } = data.data;
            let info = `<p><strong>${discord_user.username}#${discord_user.discriminator}</strong> está <strong>${discord_status}</strong></p>`;
            const playing = activities.find(act => act.type === 0);
            if (playing) {
                info += `<p>🎮 Jogando: <strong>${playing.name}</strong></p>`;
            }
            statusDiv.innerHTML = info;
        } else {
            statusDiv.innerHTML = "<p>Não foi possível carregar o status do Discord.</p>";
        }
    }

    getStatus();
    setInterval(getStatus, 15000);
});


