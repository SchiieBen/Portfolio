const userId = '423203807099355156';
const socket = new WebSocket(`wss://api.lanyard.rest/socket`);

socket.addEventListener("open", () => {
  socket.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: userId,
      },
    })
  );
});

socket.addEventListener("message", ({ data }) => {
  const payload = JSON.parse(data);
  if (payload.t !== "INIT_STATE" && payload.t !== "PRESENCE_UPDATE") return;

  const user = payload.d.discord_user;
  const status = payload.d.discord_status;
  const activity = payload.d.activities.find(a => a.type === 0);

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;

  document.getElementById("avatar").src = avatarUrl;
  document.getElementById("username").textContent = user.username;
  document.getElementById("status").textContent = `Status: ${status}`;
  document.getElementById("activity").textContent = activity
    ? `Jogando: ${activity.name}`
    : "Nenhum jogo ativo";
});

// Música (opcional)
const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("toggleMusic");
const volumeSlider = document.getElementById("volumeSlider");

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊 Desligar Música";
  } else {
    music.pause();
    toggleBtn.textContent = "🔇 Ligar Música";
  }
});

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});
