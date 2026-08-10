/* ==========================================================================
   MALIHA'S CHROMATIC ATELIER — ART GALLERY LOGIC (art.js)
   Real Paint Splash Intro, Gathered Deck of Cards, Card Deal Animation, & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // 1. ALL 30 ARTWORK DATA MATRIX
    const ARTWORKS = [
        { id: 0, file: 'a-glass-of-red-wine-and-a-rose.jpg', title: 'A Glass of Red Wine & A Rose', category: 'surreal', accent: 'rose-crimson' },
        { id: 1, file: 'a-rose.jpg', title: 'A Rose', category: 'nature', accent: 'crimson' },
        { id: 2, file: 'black-and-white.jpg', title: 'Black & White', category: 'monochrome', accent: 'monochrome' },
        { id: 3, file: 'boho-art.jpg', title: 'Boho Art', category: 'surreal', accent: 'amber' },
        { id: 4, file: 'butterfly.jpg', title: 'Butterfly', category: 'nature', accent: 'gold' },
        { id: 5, file: 'candle-light-date.jpg', title: 'Candle Light Date', category: 'surreal', accent: 'amber-warm' },
        { id: 6, file: 'cherry.jpg', title: 'Cherry', category: 'nature', accent: 'crimson' },
        { id: 7, file: 'croissant-and-a-cup-of-coffee.jpg', title: 'Croissant & A Cup of Coffee', category: 'surreal', accent: 'warm-brown' },
        { id: 8, file: 'dreamy.jpg', title: 'Dreamy', category: 'surreal', accent: 'violet-pink' },
        { id: 9, file: 'flower-pot.jpg', title: 'Flower Pot', category: 'nature', accent: 'emerald-teal' },
        { id: 10, file: 'galaxy-lady.jpg', title: 'Galaxy Lady', category: 'portraits', accent: 'sapphire-violet' },
        { id: 11, file: 'hold-onto.jpg', title: 'Hold Onto', category: 'surreal', accent: 'violet-cyan' },
        { id: 12, file: 'hourglass.jpg', title: 'Hourglass', category: 'surreal', accent: 'gold-amber' },
        { id: 13, file: 'icyland.jpg', title: 'Icyland', category: 'nature', accent: 'cyan-ice' },
        { id: 14, file: 'in-the-world-of-art.jpg', title: 'In the World of Art', category: 'surreal', accent: 'violet-crimson' },
        { id: 15, file: 'landscape.jpg', title: 'Landscape', category: 'nature', accent: 'emerald' },
        { id: 16, file: 'lips-and-an-eyeball.jpg', title: 'Lips & An Eyeball', category: 'surreal', accent: 'crimson-violet' },
        { id: 17, file: 'mirror-mirror.jpg', title: 'Mirror Mirror', category: 'portraits', accent: 'pink-blush' },
        { id: 18, file: 'mr-owl.jpg', title: 'Mr. Owl', category: 'nature', accent: 'amber-gold' },
        { id: 19, file: 'nub.jpg', title: 'Nub', category: 'surreal', accent: 'coral' },
        { id: 20, file: 'panda.jpg', title: 'Panda', category: 'monochrome', accent: 'monochrome-slate' },
        { id: 21, file: 'phoenix.jpg', title: 'Phoenix', category: 'surreal', accent: 'fire-orange' },
        { id: 22, file: 'realism.jpg', title: 'Realism', category: 'portraits', accent: 'warm-amber' },
        { id: 23, file: 'serenity.jpg', title: 'Serenity', category: 'nature', accent: 'teal-blue' },
        { id: 24, file: 'splash-splash.jpg', title: 'Splash Splash', category: 'surreal', accent: 'cyan-magenta' },
        { id: 25, file: 'timewatch.jpg', title: 'Timewatch', category: 'monochrome', accent: 'silver-graphite' },
        { id: 26, file: 'tinker.jpg', title: 'Tinker', category: 'surreal', accent: 'violet' },
        { id: 27, file: 'touch-of-nature.jpg', title: 'Touch of Nature', category: 'nature', accent: 'emerald-gold' },
        { id: 28, file: 'vampire-lips.jpg', title: 'Vampire Lips', category: 'portraits', accent: 'deep-crimson' },
        { id: 29, file: 'waterfall.jpg', title: 'Waterfall', category: 'nature', accent: 'sapphire-teal' }
    ];

    let currentLightboxIndex = 0;

    // 2. INITIALIZE MODULES
    initSplashSequence(prefersReducedMotion);
    initCursorFollower();
    initAtmosphereCanvas(prefersReducedMotion);
    initNavBehavior();
    initDeckInteraction();
    init3DSpatialWall(!prefersReducedMotion && !isMobile);
    initCategoryFilter();
    initViewSwitcher();
    initLightbox(ARTWORKS);

    // Update Footer Year
    const yearEl = document.getElementById('artYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. ORGANIC LIQUID PAINT SPLASH INTRO SEQUENCE
   ========================================================================== */
function initSplashSequence(reducedMotion) {
    const splash = document.getElementById('artSplashOverlay');
    const canvas = document.getElementById('splashCanvas');
    const colorSwipe = document.getElementById('splashColorSwipe');
    if (!splash || !canvas) return;

    const SPLASH_KEY = 'art_atelier_splash_seen_v2';
    const alreadySeen = sessionStorage.getItem(SPLASH_KEY);

    if (reducedMotion || alreadySeen) {
        splash.classList.add('hidden');
        return;
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const splashColors = [
        'rgba(255, 77, 109, 0.85)',
        'rgba(230, 57, 70, 0.85)',
        'rgba(251, 86, 7, 0.85)',
        'rgba(255, 209, 102, 0.85)',
        'rgba(155, 93, 229, 0.85)',
        'rgba(0, 245, 212, 0.85)',
        'rgba(67, 97, 238, 0.85)',
        'rgba(247, 168, 196, 0.85)'
    ];

    class OrganicPaintSplash {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.color = splashColors[Math.floor(Math.random() * splashColors.length)];
            this.points = [];
            const numPoints = Math.floor(Math.random() * 12) + 12;
            this.baseRadius = Math.random() * 20 + 5;
            this.maxRadius = Math.random() * 140 + 70;
            this.currentRadius = this.baseRadius;
            this.delay = Math.random() * 50;
            this.frame = 0;
            this.alpha = 0;
            this.growth = Math.random() * 3 + 1.5;

            for (let i = 0; i < numPoints; i++) {
                const angle = (Math.PI * 2 / numPoints) * i;
                const distOffset = Math.random() * 0.5 + 0.75;
                this.points.push({ angle, distOffset });
            }

            this.splatters = Array.from({ length: 8 }, () => ({
                angle: Math.random() * Math.PI * 2,
                distMult: Math.random() * 0.8 + 1.2,
                r: Math.random() * 8 + 3
            }));
        }
        update() {
            this.frame++;
            if (this.frame < this.delay) return;

            if (this.currentRadius < this.maxRadius) {
                this.currentRadius += this.growth;
                this.alpha = Math.min(0.9, this.alpha + 0.07);
            } else {
                this.alpha -= 0.015;
            }
        }
        draw() {
            if (this.alpha <= 0 || this.frame < this.delay) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;

            ctx.beginPath();
            for (let i = 0; i < this.points.length; i++) {
                const pt = this.points[i];
                const r = this.currentRadius * pt.distOffset;
                const px = this.x + Math.cos(pt.angle) * r;
                const py = this.y + Math.sin(pt.angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();

            // Render Splatter Drops
            this.splatters.forEach(sp => {
                const dist = this.currentRadius * sp.distMult;
                const sx = this.x + Math.cos(sp.angle) * dist;
                const sy = this.y + Math.sin(sp.angle) * dist;
                ctx.beginPath();
                ctx.arc(sx, sy, sp.r * (this.currentRadius / this.maxRadius), 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
        }
    }

    const splashes = Array.from({ length: 22 }, () => new OrganicPaintSplash());
    let animId;
    let startTime = null;

    function renderSplash(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        ctx.fillStyle = 'rgba(6, 5, 9, 0.22)';
        ctx.fillRect(0, 0, width, height);

        splashes.forEach(s => {
            s.update();
            s.draw();
        });

        if (elapsed > 2000 && colorSwipe) {
            colorSwipe.classList.add('active');
        }

        if (elapsed < 2700) {
            animId = requestAnimationFrame(renderSplash);
        } else {
            cancelAnimationFrame(animId);
            splash.classList.add('hidden');
            sessionStorage.setItem(SPLASH_KEY, 'true');
        }
    }

    animId = requestAnimationFrame(renderSplash);
}

/* ==========================================================================
   2. CURSOR FOLLOWER
   ========================================================================== */
function initCursorFollower() {
    const cursor = document.getElementById('artCursor');
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function loop() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(loop);
    }
    loop();
}

/* ==========================================================================
   3. BACKGROUND ATMOSPHERE CANVAS
   ========================================================================== */
function initAtmosphereCanvas(reducedMotion) {
    const canvas = document.getElementById('paintAtmosphereCanvas');
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const blobs = [
        { x: width * 0.2, y: height * 0.3, vx: 0.3, vy: 0.2, r: 350, color: 'rgba(255, 77, 109, 0.08)' },
        { x: width * 0.8, y: height * 0.6, vx: -0.2, vy: 0.3, r: 420, color: 'rgba(155, 93, 229, 0.08)' },
        { x: width * 0.5, y: height * 0.8, vx: 0.4, vy: -0.2, r: 380, color: 'rgba(0, 245, 212, 0.06)' },
        { x: width * 0.3, y: height * 0.7, vx: -0.3, vy: -0.3, r: 300, color: 'rgba(251, 86, 7, 0.07)' }
    ];

    function drawAtmosphere() {
        ctx.clearRect(0, 0, width, height);

        blobs.forEach(b => {
            b.x += b.vx;
            b.y += b.vy;

            if (b.x < -100 || b.x > width + 100) b.vx *= -1;
            if (b.y < -100 || b.y > height + 100) b.vy *= -1;

            const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
            grad.addColorStop(0, b.color);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawAtmosphere);
    }

    drawAtmosphere();
}

/* ==========================================================================
   4. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavBehavior() {
    const header = document.getElementById('artHeader');
    const mobileToggle = document.getElementById('artMobileToggle');
    const mobileDrawer = document.getElementById('artMobileDrawer');
    const mobileLinks = document.querySelectorAll('.art-mobile-link, .art-mobile-back');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const active = mobileDrawer.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', active);
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/* ==========================================================================
   5. GATHERED DECK OF CARDS & CARD-DEAL / THROW INTERACTION
   ========================================================================== */
function initDeckInteraction() {
    const grid = document.getElementById('galleryGrid');
    const btnReveal = document.getElementById('btnRevealCollection');
    const btnGather = document.getElementById('btnGatherDeck');
    const statusText = document.getElementById('deckStatusText');
    const cards = document.querySelectorAll('.art-card');

    if (!grid || !cards.length) return;

    // Assign deck indices for stacked 3D deck appearance
    cards.forEach((card, index) => {
        card.style.setProperty('--deck-i', index);
    });

    function dealCollection() {
        if (!grid.classList.contains('deck-mode')) return;

        grid.classList.add('dealt-animating');
        grid.classList.remove('deck-mode');
        grid.classList.add('spatial-mode');

        if (btnReveal) btnReveal.classList.remove('active');
        if (btnGather) btnGather.classList.add('active');
        if (statusText) statusText.textContent = 'Artworks revealed in 3D spatial wall. Click any card to open the immersive viewer.';

        setTimeout(() => {
            grid.classList.remove('dealt-animating');
        }, 850);
    }

    function gatherCollection() {
        if (grid.classList.contains('deck-mode')) return;

        grid.classList.add('dealt-animating');
        grid.classList.remove('spatial-mode', 'linear-mode');
        grid.classList.add('deck-mode');

        if (btnGather) btnGather.classList.remove('active');
        if (btnReveal) btnReveal.classList.add('active');
        if (statusText) statusText.textContent = 'Click the stacked card deck or press Reveal Collection to deal the artworks into an interactive 3D spatial wall';

        setTimeout(() => {
            grid.classList.remove('dealt-animating');
        }, 850);
    }

    if (btnReveal) btnReveal.addEventListener('click', dealCollection);
    if (btnGather) btnGather.addEventListener('click', gatherCollection);

    // Clicking deck container directly triggers deal
    grid.addEventListener('click', (e) => {
        if (grid.classList.contains('deck-mode')) {
            // Check if card clicked inside deck
            const card = e.target.closest('.art-card');
            if (card) {
                e.stopPropagation();
                dealCollection();
            }
        }
    });
}

/* ==========================================================================
   6. 3D SPATIAL WALL HOVER TILT & SIBLING RECESSION
   ========================================================================== */
function init3DSpatialWall(enabled) {
    if (!enabled) return;

    const cards = document.querySelectorAll('.art-card');
    const grid = document.getElementById('galleryGrid');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (grid.classList.contains('deck-mode') || grid.classList.contains('linear-mode')) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseenter', () => {
            if (grid.classList.contains('deck-mode')) return;
            cards.forEach(c => {
                if (c !== card) c.classList.add('receder');
            });
        });

        card.addEventListener('mouseleave', () => {
            if (grid.classList.contains('deck-mode')) return;
            const baseDepth = card.style.getPropertyValue('--depth') || '0px';
            const baseRotX = card.style.getPropertyValue('--rotate-x') || '0deg';
            const baseRotY = card.style.getPropertyValue('--rotate-y') || '0deg';
            card.style.transform = `translateZ(${baseDepth}) rotateX(${baseRotX}) rotateY(${baseRotY})`;

            cards.forEach(c => c.classList.remove('receder'));
        });
    });
}

/* ==========================================================================
   7. CATEGORY FILTER SYSTEM
   ========================================================================== */
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.art-filter-btn');
    const cards = document.querySelectorAll('.art-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
}

/* ==========================================================================
   8. VIEW MODE SWITCHER
   ========================================================================== */
function initViewSwitcher() {
    const btn3D = document.getElementById('viewMode3D');
    const btnGrid = document.getElementById('viewModeGrid');
    const grid = document.getElementById('galleryGrid');

    if (!btn3D || !btnGrid || !grid) return;

    btn3D.addEventListener('click', () => {
        btn3D.classList.add('active');
        btnGrid.classList.remove('active');
        grid.classList.remove('linear-mode', 'deck-mode');
        grid.classList.add('spatial-mode');
    });

    btnGrid.addEventListener('click', () => {
        btnGrid.classList.add('active');
        btn3D.classList.remove('active');
        grid.classList.remove('spatial-mode', 'deck-mode');
        grid.classList.add('linear-mode');
    });
}

/* ==========================================================================
   9. FULLSCREEN ARTWORK LIGHTBOX MODAL
   ========================================================================== */
function initLightbox(artworksData) {
    const lightbox = document.getElementById('artLightbox');
    const backdrop = document.getElementById('lightboxBackdrop');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const imgEl = document.getElementById('lightboxImg');
    const titleEl = document.getElementById('lightboxTitle');
    const indexEl = document.getElementById('lightboxIndex');
    const grid = document.getElementById('galleryGrid');

    if (!lightbox || !imgEl || !titleEl) return;

    function openLightbox(index) {
        currentLightboxIndex = parseInt(index, 10);
        if (isNaN(currentLightboxIndex) || currentLightboxIndex < 0 || currentLightboxIndex >= artworksData.length) {
            currentLightboxIndex = 0;
        }

        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const art = artworksData[currentLightboxIndex];
        if (!art) return;

        imgEl.style.opacity = '0';
        imgEl.style.transform = 'scale(0.95)';

        setTimeout(() => {
            imgEl.src = `assets/art/${art.file}`;
            imgEl.alt = art.title;
            titleEl.textContent = art.title;
            indexEl.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} / ${artworksData.length}`;

            imgEl.style.opacity = '1';
            imgEl.style.transform = 'scale(1)';
        }, 150);
    }

    function showPrev() {
        currentLightboxIndex = (currentLightboxIndex - 1 + artworksData.length) % artworksData.length;
        updateLightboxContent();
    }

    function showNext() {
        currentLightboxIndex = (currentLightboxIndex + 1) % artworksData.length;
        updateLightboxContent();
    }

    // Attach Click Events to Cards
    document.querySelectorAll('.art-card, .featured-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (grid && grid.classList.contains('deck-mode')) return; // Deck click handles deal
            const idx = card.dataset.index;
            openLightbox(idx);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // Keyboard Accessibility Controls
    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 40) {
            if (deltaX > 0) {
                showPrev();
            } else {
                showNext();
            }
        }
    }
}
