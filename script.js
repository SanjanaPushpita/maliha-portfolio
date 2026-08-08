/* ==========================================================================
   THE COMPUTATIONAL ATELIER — SCRIPT ENGINE
   Maliha Sanjana Portfolio | AI/ML Engineer & Researcher
   Clean Hero Portrait Presentation & Enhanced Liquid Glassbar Frame
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // 1. INTRO SPLASH SEQUENCE
    initSplashSequence(prefersReducedMotion);

    // 2. THEME CONTROLLER
    initThemeManager();

    // 3. MOBILE DRAWER
    initMobileDrawer();

    // 4. LIQUID GLASS NAVBAR INTERACTION
    initLiquidGlassNav();

    // 5. AMBIENT GLASS-GRADIENT BACKDROP
    if (!prefersReducedMotion) {
        initAmbientGlassBackground();
    }

    // 6. SPATIAL CAPABILITY CONSTELLATION CANVAS
    initConstellationCanvas();

    // 7. RESEARCH ORBIT INTERACTION
    initResearchOrbit();

    // 8. SIGNATURE AI CASE STUDY VISUALIZERS
    initCaseStudyVisualizers(prefersReducedMotion, isMobile);

    // 9. GSAP SCROLL REVEALS
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
        initGSAPScroll();
    }

    // 10. BACK TO TOP & UTILITIES
    initBackToTop();
    document.getElementById('year').textContent = new Date().getFullYear();
    initSmoothHeaderScroll();
    if (!isMobile && !prefersReducedMotion) {
        init3DHoverTilt();
    }
});

/* ==========================================================================
   1. INTRO SPLASH SEQUENCE
   ========================================================================== */
function initSplashSequence(reducedMotion) {
    const splash = document.getElementById('splashOverlay');
    if (!splash) return;

    const INTRO_KEY = 'atelier_intro_played_v7';
    const alreadyPlayed = sessionStorage.getItem(INTRO_KEY);

    if (reducedMotion || alreadyPlayed) {
        splash.classList.add('hidden');
        return;
    }

    sessionStorage.setItem(INTRO_KEY, 'true');

    setTimeout(() => {
        splash.classList.add('hidden');
    }, 2100);
}

/* ==========================================================================
   2. THEME CONTROLLER
   ========================================================================== */
function initThemeManager() {
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const KEY = 'atelier_theme';

    let current = localStorage.getItem(KEY) || 'dark';

    const apply = (theme) => {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
            if (toggle) toggle.textContent = '🌙';
        } else {
            root.removeAttribute('data-theme');
            if (toggle) toggle.textContent = '☀️';
        }
        localStorage.setItem(KEY, theme);
    };

    apply(current);

    if (toggle) {
        toggle.addEventListener('click', () => {
            current = current === 'dark' ? 'light' : 'dark';
            apply(current);
        });
    }
}

/* ==========================================================================
   3. MOBILE DRAWER
   ========================================================================== */
function initMobileDrawer() {
    const toggle = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileDrawer');
    const links = document.querySelectorAll('.mobile-link');

    if (!toggle || !drawer) return;

    const setMenu = (open) => {
        drawer.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('open');
        setMenu(!isOpen);
    });

    links.forEach(l => l.addEventListener('click', () => setMenu(false)));
}

/* ==========================================================================
   4. LIQUID GLASS NAVBAR INTERACTION
   ========================================================================== */
function initLiquidGlassNav() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;

    nav.addEventListener('pointermove', (e) => {
        const rect = nav.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        nav.style.setProperty('--mouse-x', `${x}px`);
        nav.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
}

/* ==========================================================================
   5. AMBIENT GLASS-GRADIENT BACKDROP (SOFT AMBIENT FORMS)
   ========================================================================== */
function initAmbientGlassBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const orbs = [
        { x: 0.20, y: 0.25, rx: 280, ry: 240, vx: 0.0003, vy: 0.0002, phase: 0 },
        { x: 0.75, y: 0.35, rx: 340, ry: 290, vx: -0.0002, vy: 0.0003, phase: 1.5 },
        { x: 0.45, y: 0.70, rx: 380, ry: 310, vx: 0.00025, vy: -0.0002, phase: 3.0 },
        { x: 0.15, y: 0.80, rx: 260, ry: 220, vx: -0.0003, vy: -0.00025, phase: 4.2 },
        { x: 0.85, y: 0.85, rx: 300, ry: 260, vx: 0.0002, vy: 0.00015, phase: 5.5 }
    ];

    let time = 0;

    function render() {
        requestAnimationFrame(render);
        if (!isVisible) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        time += 0.01;

        orbs.forEach((orb, i) => {
            const ox = (orb.x + Math.sin(time * 0.4 + orb.phase) * 0.05) * w;
            const oy = (orb.y + Math.cos(time * 0.3 + orb.phase) * 0.05) * h;
            const radius = Math.max(orb.rx, orb.ry);

            const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);

            if (isLight) {
                if (i % 3 === 0) {
                    grad.addColorStop(0, 'rgba(251, 194, 207, 0.38)');
                    grad.addColorStop(0.5, 'rgba(253, 226, 232, 0.18)');
                    grad.addColorStop(1, 'rgba(255, 240, 243, 0)');
                } else if (i % 3 === 1) {
                    grad.addColorStop(0, 'rgba(248, 159, 179, 0.32)');
                    grad.addColorStop(0.55, 'rgba(203, 184, 232, 0.15)');
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                } else {
                    grad.addColorStop(0, 'rgba(216, 192, 152, 0.28)');
                    grad.addColorStop(0.5, 'rgba(253, 226, 232, 0.15)');
                    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }
            } else {
                if (i % 3 === 0) {
                    grad.addColorStop(0, 'rgba(34, 34, 44, 0.65)');
                    grad.addColorStop(0.5, 'rgba(26, 26, 34, 0.35)');
                    grad.addColorStop(1, 'rgba(8, 8, 10, 0)');
                } else if (i % 3 === 1) {
                    grad.addColorStop(0, 'rgba(50, 50, 64, 0.55)');
                    grad.addColorStop(0.5, 'rgba(122, 27, 50, 0.12)');
                    grad.addColorStop(1, 'rgba(8, 8, 10, 0)');
                } else {
                    grad.addColorStop(0, 'rgba(70, 70, 88, 0.45)');
                    grad.addColorStop(0.55, 'rgba(20, 20, 26, 0.25)');
                    grad.addColorStop(1, 'rgba(8, 8, 10, 0)');
                }
            }

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(ox, oy, radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    render();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, { passive: true });
}

/* ==========================================================================
   6. SPATIAL CAPABILITY CONSTELLATION CANVAS
   ========================================================================== */
function initConstellationCanvas() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const nodes = [
        { label: 'Computer Vision', x: 0.3, y: 0.35, r: 6 },
        { label: 'Medical Imaging', x: 0.7, y: 0.30, r: 6 },
        { label: 'Explainable AI', x: 0.5, y: 0.65, r: 6 },
        { label: 'PyTorch', x: 0.25, y: 0.75, r: 5 },
        { label: 'Python', x: 0.75, y: 0.75, r: 5 }
    ];

    const edges = [
        [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 4]
    ];

    let rot = 0;

    function render() {
        canvas.width = canvas.parentElement.clientWidth || 300;
        canvas.height = canvas.parentElement.clientHeight || 300;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rot += 0.008;

        const w = canvas.width;
        const h = canvas.height;

        ctx.strokeStyle = 'rgba(184, 117, 78, 0.25)';
        ctx.lineWidth = 1.2;
        edges.forEach(([a, b]) => {
            const pA = nodes[a];
            const pB = nodes[b];
            ctx.beginPath();
            ctx.moveTo(pA.x * w, pA.y * h);
            ctx.lineTo(pB.x * w, pB.y * h);
            ctx.stroke();
        });

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';

        nodes.forEach((n, idx) => {
            const nx = n.x * w;
            const ny = n.y * h + Math.sin(rot + idx) * 3;

            ctx.fillStyle = '#b8754e';
            ctx.beginPath();
            ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = isLight ? '#121216' : '#f7f5f0';
            ctx.font = '11px monospace';
            ctx.fillText(n.label, nx + 10, ny + 4);
        });

        requestAnimationFrame(render);
    }
    render();
}

/* ==========================================================================
   7. RESEARCH ORBIT INTERACTION
   ========================================================================== */
function initResearchOrbit() {
    const nodes = document.querySelectorAll('.research-orbit-node');
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
        });
    });
}

/* ==========================================================================
   8. SIGNATURE AI CASE STUDY VISUALIZERS
   ========================================================================== */
function initCaseStudyVisualizers(reducedMotion, isMobile) {
    if (reducedMotion) return;

    setupVisualizer('vis-medsam', renderMedSAM);
    setupVisualizer('vis-plant', renderPlant);
    setupVisualizer('vis-heart', renderHeart);
    setupVisualizer('vis-dr', renderDR);
    setupVisualizer('vis-civicflow', renderCivicFlow);
}

function setupVisualizer(canvasId, renderFn) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    let isVisible = true;
    let lastTime = 0;

    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    }, { threshold: 0.01, rootMargin: '100px 0px' });

    if (canvas.parentElement) {
        observer.observe(canvas.parentElement);
    }

    function loop(time) {
        requestAnimationFrame(loop);
        if (!isVisible) return;

        if (time - lastTime < 33) return;
        lastTime = time;

        const parent = canvas.parentElement;
        if (!parent) return;

        canvas.width = parent.clientWidth || 300;
        canvas.height = parent.clientHeight || 250;

        const ctx = canvas.getContext('2d');
        renderFn(ctx, canvas.width, canvas.height, time);
    }
    loop(0);
}

// 8.1 MedSAM FLARE22 Tumor Segmentation
function renderMedSAM(ctx, w, h, time) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? '#fdf8f9' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const r = Math.min(cx, cy) * 0.55;

    ctx.strokeStyle = isLight ? 'rgba(0, 180, 216, 0.15)' : 'rgba(0, 180, 216, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    const pulse = Math.sin(time * 0.003) * 0.05 + 1;
    ctx.fillStyle = 'rgba(122, 27, 50, 0.45)';
    ctx.strokeStyle = '#00b4d8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.ellipse(cx + 6, cy - 4, r * 0.38 * pulse, r * 0.28 * pulse, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const scanY = (time * 0.08) % h;
    ctx.strokeStyle = 'rgba(0, 180, 216, 0.85)';
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();
}

// 8.2 PlantVillage Leaf Disease Detection
function renderPlant(ctx, w, h, time) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? '#fdf8f9' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cols = 5, rows = 3;
    const cw = w / cols, ch = h / rows;

    ctx.strokeStyle = isLight ? 'rgba(60, 64, 75, 0.12)' : 'rgba(142, 146, 156, 0.15)';
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            ctx.strokeRect(i * cw, j * ch, cw, ch);
        }
    }

    const pulse = Math.sin(time * 0.003) * 0.3 + 0.5;
    ctx.strokeStyle = `rgba(184, 117, 78, ${pulse})`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cw * 1.5, ch * 0.5, cw * 2, ch * 2);

    ctx.fillStyle = '#b8754e';
    ctx.font = '10px monospace';
    ctx.fillText('EFFICIENTNET-B0 // 99.25%', cw * 1.55, ch * 0.85);
}

// 8.3 Heart Disease Prediction (Particle-Heart + ECG Signal)
function renderHeart(ctx, w, h, time) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? '#fdf8f9' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cx = w * 0.3;
    const cy = h * 0.5;

    const speed = time * 0.15;
    ctx.strokeStyle = isLight ? '#a82442' : '#cbb8e8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();

    for (let x = 0; x < w; x++) {
        const rx = (x + speed) % 220;
        let y = h * 0.5;

        if (rx > 90 && rx < 100) y = h * 0.5 - 22;
        else if (rx >= 100 && rx < 110) y = h * 0.5 + 10;
        else if (rx >= 110 && rx < 125) y = h * 0.5 - 55;
        else if (rx >= 125 && rx < 140) y = h * 0.5 + 18;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const pulse = Math.sin(time * 0.004) * 0.08 + 1;
    const particles = 28;
    ctx.fillStyle = isLight ? '#f47b96' : '#f47b96';

    for (let i = 0; i < particles; i++) {
        const t = (i / particles) * Math.PI * 2;
        const hx = 14 * Math.pow(Math.sin(t), 3) * pulse;
        const hy = -(12 * Math.cos(t) - 4 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * pulse;

        ctx.beginPath();
        ctx.arc(cx + hx * 3.5, cy + hy * 3.5, 2.2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 8.4 Diabetic Retinopathy Dual U-Nets
function renderDR(ctx, w, h, time) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? '#fdf8f9' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const angle = time * 0.0005;

    ctx.strokeStyle = isLight ? 'rgba(168, 36, 66, 0.4)' : 'rgba(122, 27, 50, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#b8754e';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI / 3);
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * 60, cy + Math.sin(a) * 60);
    }
    ctx.stroke();
}

// 8.5 CivicFlow AI System Flow Visualizer
function renderCivicFlow(ctx, w, h, time) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? '#fdf8f9' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const nVoice = { x: w * 0.2, y: h * 0.5, label: 'VOICE INPUT' };
    const nIntent = { x: w * 0.5, y: h * 0.5, label: 'GEMINI AI INTENT' };
    const nReport = { x: w * 0.8, y: h * 0.25, label: 'CIVIC REPORT' };
    const nHelp = { x: w * 0.8, y: h * 0.5, label: 'HELPLINE MATCH' };
    const nEmerg = { x: w * 0.8, y: h * 0.75, label: 'EMERGENCY GPS' };

    ctx.strokeStyle = 'rgba(184, 117, 78, 0.3)';
    ctx.lineWidth = 1.5;

    const routes = [
        [nVoice, nIntent],
        [nIntent, nReport],
        [nIntent, nHelp],
        [nIntent, nEmerg]
    ];

    routes.forEach(([src, dst]) => {
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(dst.x, dst.y);
        ctx.stroke();
    });

    const progress = (time * 0.001) % 1;
    ctx.fillStyle = '#b8754e';

    routes.forEach(([src, dst]) => {
        const px = src.x + (dst.x - src.x) * progress;
        const py = src.y + (dst.y - src.y) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    const allNodes = [nVoice, nIntent, nReport, nHelp, nEmerg];
    allNodes.forEach((node) => {
        ctx.fillStyle = isLight ? '#ffffff' : '#141418';
        ctx.strokeStyle = '#b8754e';
        ctx.lineWidth = 1;
        ctx.fillRect(node.x - 45, node.y - 14, 90, 28);
        ctx.strokeRect(node.x - 45, node.y - 14, 90, 28);

        ctx.fillStyle = isLight ? '#121216' : '#f7f5f0';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 3);
    });

    ctx.textAlign = 'left';
}

/* ==========================================================================
   9. GSAP SCROLL REVEALS
   ========================================================================== */
function initGSAPScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        gsap.from(sec, {
            scrollTrigger: {
                trigger: sec,
                start: 'top 85%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

/* ==========================================================================
   10. BACK TO TOP & UTILITIES & 3D HOVER TILT
   ========================================================================== */
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initSmoothHeaderScroll() {
    const header = document.querySelector('.header-wrapper');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

function init3DHoverTilt() {
    const tiltContainers = document.querySelectorAll('.portrait-spatial-frame, .case-vis-container, .artifact-card');
    tiltContainers.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            const rotX = ((y - cy) / cy) * -2.5;
            const rotY = ((x - cx) / cx) * 2.5;

            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}
