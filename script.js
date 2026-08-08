/* ==========================================================================
   THE COMPUTATIONAL ATELIER — SCRIPT ENGINE (MICRO POLISH PASS)
   Maliha Sanjana Portfolio
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

    // 4. THREE.JS CIRCULAR BACKGROUND PARTICLES (Desktop Only)
    if (!prefersReducedMotion && !isMobile && typeof THREE !== 'undefined') {
        initThreeBackground();
    }

    // 5. SPATIAL CAPABILITY CONSTELLATION CANVAS
    initConstellationCanvas();

    // 6. RESEARCH ORBIT INTERACTION
    initResearchOrbit();

    // 7. SIGNATURE AI CASE STUDY VISUALIZERS
    initCaseStudyVisualizers(prefersReducedMotion);

    // 8. GSAP SCROLL REVEALS
    if (!prefersReducedMotion && typeof gsap !== 'undefined') {
        initGSAPScroll();
    }

    // 9. BACK TO TOP & UTILITIES
    initBackToTop();
    document.getElementById('year').textContent = new Date().getFullYear();
    initSmoothHeaderScroll();
});

/* ==========================================================================
   1. INTRO SPLASH SEQUENCE
   ========================================================================== */
function initSplashSequence(reducedMotion) {
    const splash = document.getElementById('splashOverlay');
    if (!splash) return;

    const INTRO_KEY = 'atelier_intro_played_v4';
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
   4. THREE.JS CIRCULAR BACKGROUND PARTICLES
   - Dark mode: Soft atmospheric pink glow (#eb8ca5)
   - Light mode: Subtle warm brownish tone (#875032)
   ========================================================================== */
function createCircleTexture(isLight) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    if (isLight) {
        // Subtle warm brownish tone for light mode
        grad.addColorStop(0, 'rgba(135, 80, 50, 0.9)');
        grad.addColorStop(0.5, 'rgba(135, 80, 50, 0.35)');
        grad.addColorStop(1, 'rgba(135, 80, 50, 0)');
    } else {
        // Soft atmospheric pink glow for dark mode
        grad.addColorStop(0, 'rgba(235, 140, 165, 0.95)');
        grad.addColorStop(0.5, 'rgba(235, 140, 165, 0.45)');
        grad.addColorStop(1, 'rgba(235, 140, 165, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Soft Floating Atmospheric Circle Particles
    const count = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const circleTexture = createCircleTexture(isLight);

    const pMaterial = new THREE.PointsMaterial({
        color: isLight ? 0x875032 : 0xeb8ca5,
        size: 2.5,
        map: circleTexture,
        transparent: true,
        opacity: isLight ? 0.45 : 0.65,
        depthWrite: false,
        blending: THREE.NormalBlending
    });

    const points = new THREE.Points(geometry, pMaterial);
    scene.add(points);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('pointermove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        points.rotation.y += 0.0006;
        points.rotation.x = mouseY * 0.04;
        points.rotation.y += mouseX * 0.001;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });
}

/* ==========================================================================
   5. SPATIAL CAPABILITY CONSTELLATION CANVAS
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

            ctx.fillStyle = isLight ? '#0d0d11' : '#f2efe9';
            ctx.font = '11px monospace';
            ctx.fillText(n.label, nx + 10, ny + 4);
        });

        requestAnimationFrame(render);
    }
    render();
}

/* ==========================================================================
   6. RESEARCH ORBIT INTERACTION
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
   7. CASE STUDY VISUALIZERS
   ========================================================================== */
function initCaseStudyVisualizers(reducedMotion) {
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

// Render Functions
function renderMedSAM(ctx, w, h, time) {
    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#ebf2f7' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const r = Math.min(cx, cy) * 0.6;

    ctx.strokeStyle = 'rgba(0, 180, 216, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(81, 24, 39, 0.4)';
    ctx.strokeStyle = '#00b4d8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(cx + 8, cy - 4, r * 0.35, r * 0.25, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const scanY = (time * 0.08) % h;
    ctx.strokeStyle = 'rgba(0, 180, 216, 0.8)';
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(w, scanY);
    ctx.stroke();
}

function renderPlant(ctx, w, h, time) {
    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#f5f0eb' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cols = 5, rows = 3;
    const cw = w / cols, ch = h / rows;

    ctx.strokeStyle = 'rgba(142, 146, 156, 0.15)';
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
    ctx.fillText('CONFIDENCE: 99.25%', cw * 1.6, ch * 0.8);
}

function renderHeart(ctx, w, h, time) {
    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#f2eff5' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cy = h / 2;
    const speed = time * 0.15;

    ctx.strokeStyle = '#a896d8';
    ctx.lineWidth = 1.8;
    ctx.beginPath();

    for (let x = 0; x < w; x++) {
        const rx = (x + speed) % 200;
        let y = cy;

        if (rx > 80 && rx < 90) y = cy - 20;
        else if (rx >= 90 && rx < 100) y = cy + 8;
        else if (rx >= 100 && rx < 115) y = cy - 50;
        else if (rx >= 115 && rx < 130) y = cy + 15;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function renderDR(ctx, w, h, time) {
    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#f7eeee' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const angle = time * 0.0005;

    ctx.strokeStyle = 'rgba(81, 24, 39, 0.6)';
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

function renderCivicFlow(ctx, w, h, time) {
    ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' ? '#f5f2ec' : '#08080a';
    ctx.fillRect(0, 0, w, h);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    const nVoice = { x: w * 0.2, y: h * 0.5, label: 'VOICE INPUT' };
    const nIntent = { x: w * 0.5, y: h * 0.5, label: 'GEMINI AI INTENT' };
    const nReport = { x: w * 0.8, y: h * 0.25, label: 'CIVIC REPORT' };
    const nHelp = { x: w * 0.8, y: h * 0.5, label: 'HELPLINE MATCH' };
    const nEmerg = { x: w * 0.8, y: h * 0.75, label: 'EMERGENCY GPS' };

    ctx.strokeStyle = 'rgba(184, 117, 78, 0.25)';
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
        ctx.fillStyle = isLight ? '#ffffff' : '#121216';
        ctx.strokeStyle = '#b8754e';
        ctx.lineWidth = 1;
        ctx.fillRect(node.x - 45, node.y - 14, 90, 28);
        ctx.strokeRect(node.x - 45, node.y - 14, 90, 28);

        ctx.fillStyle = isLight ? '#0d0d11' : '#f2efe9';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 3);
    });

    ctx.textAlign = 'left';
}

/* ==========================================================================
   8. GSAP SCROLL REVEALS
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
   9. BACK TO TOP & UTILITIES
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
