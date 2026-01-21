chrome.tabs.query({}, function(tabs) {
  const container = document.getElementById("liste");
  const copyBtn = document.getElementById("copyBtn");

  const urls = [];

  tabs.forEach(tab => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.textContent = tab.title || tab.url;

    btn.addEventListener("click", () => {
      chrome.tabs.update(tab.id, { active: true });
      window.open(tab.url, "_blank");
    });

    container.appendChild(btn);
    urls.push(tab.url);
  });

  // Bouton copier
  copyBtn.addEventListener("click", () => {
    const text = urls.join("\n");
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "Copié !";
      setTimeout(() => copyBtn.textContent = "Copier toutes les URL", 1500);
    });
  });
});
// Ouvrir une liste d'URL collées
document.getElementById("openUrlsBtn").addEventListener("click", () => {
  const text = document.getElementById("urlInput").value.trim();
  if (!text) return;

  const lines = text.split("\n");

  lines.forEach(line => {
    const url = line.trim();
    if (!url) return;

    // Ajoute https:// si l'utilisateur ne l'a pas mis
    const finalUrl = url.startsWith("http") ? url : "https://" + url;

    chrome.tabs.create({ url: finalUrl });
  });
});
