const accentToggle = document.getElementById("colorToggle");
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const yearEl = document.getElementById("year");
const THEME_KEY = "portfolio-theme";

const storeTheme = (theme) => {
    try {
        window.localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        /* ignore storage errors */
    }
};

const getStoredTheme = () => {
    try {
        return window.localStorage.getItem(THEME_KEY);
    } catch (error) {
        return null;
    }
};

const applyTheme = (theme) => {
    const mode = theme === "night" ? "night" : "light";
    if (mode === "night") {
        root.setAttribute("data-theme", "night");
    } else {
        root.removeAttribute("data-theme");
    }

    if (themeToggle) {
        const night = mode === "night";
        themeToggle.textContent = night ? "☀️" : "🌙";
        themeToggle.setAttribute("aria-label", night ? "Switch to day mode" : "Switch to night mode");
        themeToggle.setAttribute("aria-pressed", night ? "true" : "false");
    }
};

const initTheme = () => {
    const stored = getStoredTheme();
    if (stored) {
        applyTheme(stored);
        return;
    }

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "night" : "light");
};

initTheme();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isNight = root.getAttribute("data-theme") === "night";
        const nextTheme = isNight ? "light" : "night";
        applyTheme(nextTheme);
        storeTheme(nextTheme);
    });
}

if (accentToggle) {
    accentToggle.addEventListener("click", () => {
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
