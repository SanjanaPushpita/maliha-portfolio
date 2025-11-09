const toggle = document.getElementById("colorToggle");
const root = document.documentElement;
const yearEl = document.getElementById("year");

if (toggle) {
    toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-accent");
        if (current === "alt") {
            root.removeAttribute("data-accent");
        } else {
            root.setAttribute("data-accent", "alt");
        }
    });
}

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
