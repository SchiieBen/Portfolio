const userId = '423203807099355156';
const socket = new WebSocket(`wss://api.lanyard.rest/socket`);

const avatar = document.getElementById("avatar");
const username = document.getElementById("username");
const globalName = document.getElementById("global-name");
const activity = document.getElementById("activity");
const customStatus = document.getElementById("custom-status");
const statusCircle = document.getElementById("status-circle");

socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
        op: 2,
        d: {
            subscribe_to_id: userId
        }
    }));
});

socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.t !== "INIT_STATE" && payload.t !== "PRESENCE_UPDATE") return;

    const data = payload.d;
    const user = data.discord_user;

    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    avatar.src = avatarUrl;

    globalName.textContent = user.global_name || user.username;
    username.textContent = `@${user.username}`;

    const custom = data.activities.find(a => a.type === 4);
    customStatus.textContent = custom ? custom.state : 'Nenhum status personalizado';

    const game = data.activities.find(a => a.type === 0);
    activity.textContent = game ? `Jogando: ${game.name}` : 'Nenhum jogo ativo';

    const status = data.discord_status;
    statusCircle.className = 'status ' + status;
});

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
