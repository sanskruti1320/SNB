const STORAGE_KEY = "college_connections";
let connections = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// loading when page reload
document.addEventListener("DOMContentLoaded", () => {
  renderConnections();
});

function renderConnections(filterText = "") {
  const grid = document.getElementById("connectionsGrid");
  grid.innerHTML = "";

  const filtered = connections.filter((conn) => {
    const search = filterText.toLowerCase();
    return (
      conn.name.toLowerCase().includes(search) ||
      conn.major.toLowerCase().includes(search) ||
      conn.email.toLowerCase().includes(search)
    );
  });

  filtered.forEach((conn) => {
    const card = document.createElement("div");
    card.className = "connection-card";
    card.innerHTML = `
            <div class="name">${conn.name}</div>
            <div class="major">${conn.major}</div>
            <div class="email">${conn.email}</div>
            <button class="remove-btn" onclick="removeConnection('${conn.id}')">Remove</button>
        `;
    grid.appendChild(card);
  });
}

function addConnection(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const major = document.getElementById("major");
  const email = document.getElementById("email");

  if (!name.value.trim() || !major.value.trim() || !email.value.trim()) {
    alert("Please fill in all fields");
    return;
  }

  const newConnection = {
    id: Date.now().toString(),
    name: name.value.trim(),
    major: major.value.trim(),
    email: email.value.trim(),
  };

  connections.push(newConnection);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));

  renderConnections();
  closeModal();
  e.target.reset();
}

function removeConnection(id) {
  if (confirm("Are you sure you want to remove this connection?")) {
    connections = connections.filter((conn) => conn.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
    renderConnections();
  }
}

// Search
document.querySelector(".search-bar").addEventListener("input", function (e) {
  renderConnections(e.target.value);
});

// controls
function openModal() {
  document.getElementById("addModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("addModal").style.display = "none";
}

// outside click
window.onclick = function (event) {
  const modal = document.getElementById("addModal");
  if (event.target === modal) {
    closeModal();
  }
};
