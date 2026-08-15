/* ==========================================================================
   MALIHA'S CHROMATIC ATELIER — REFINED ART GALLERY LOGIC (art.js)
   Soft Watercolor Splash, Lightweight Deck Preview, Staggered Reveal & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    // ALL 30 ARTWORK DATA MATRIX
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
        { id: 29, file: 'waterfall.jpg', title: 'Waterfall', category: 'nature', accent: 'sapphire-teal' },
        { id: 30, file: 'monkey-d-luffy.jpeg', title: 'Monkey D. Luffy', category: 'portraits', accent: 'luffy-red-gold' }
    ];

    let currentLightboxIndex = 0;

    // INITIALIZE MODULES
    initWatercolorSplash(prefersReducedMotion);
    initCursorFollower();
    initAtmosphereCanvas(prefersReducedMotion);
    initNavBehavior();
    initLightweightDeckInteraction();
    initCardHoverTilt(!prefersReducedMotion && !isMobile);
    initCategoryFilter();
    initLightbox(ARTWORKS);

    // NEW INTERACTIONS: Click Paint Splash & Floating Glass Bubbles
    initClickSplashInteraction();
    initBubbleMode();

    // Footer Year
    const yearEl = document.getElementById('artYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. SOFT WATERCOLOR / INK-BLOOM SPLASH ENGINE
   ========================================================================== */
function initWatercolorSplash(reducedMotion) {
    const splash = document.getElementById('artSplashOverlay');
    const canvas = document.getElementById('splashCanvas');
    const colorSwipe = document.getElementById('splashColorSwipe');
    if (!splash || !canvas) return;

    const SPLASH_KEY = 'art_atelier_splash_seen_v3';
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

    const inkColors = [
        { r: 247, g: 168, b: 196 }, // Rose pink
        { r: 155, g: 93,  b: 229 }, // Violet
        { r: 67,  g: 97,  b: 238 }, // Sapphire
        { r: 0,   g: 245, b: 212 }, // Soft cyan
        { r: 251, g: 86,  b: 7   }, // Soft orange
        { r: 230, g: 57,  b: 70  }  // Crimson
    ];

    class InkBloom {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.color = inkColors[Math.floor(Math.random() * inkColors.length)];
            this.radius = 10;
            this.maxRadius = Math.random() * 180 + 120;
            this.alpha = 0;
            this.growth = Math.random() * 1.5 + 0.8;
            this.delay = Math.random() * 40;
            this.frame = 0;
        }
        update() {
            this.frame++;
            if (this.frame < this.delay) return;

            if (this.radius < this.maxRadius) {
                this.radius += this.growth;
                this.alpha = Math.min(0.35, this.alpha + 0.015);
            } else {
                this.alpha -= 0.008;
            }
        }
        draw() {
            if (this.alpha <= 0 || this.frame < this.delay) return;
            ctx.save();
            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`);
            grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.4})`);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const blooms = Array.from({ length: 18 }, () => new InkBloom());
    let animId;
    let startTime = null;

    function renderSplash(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        ctx.fillStyle = 'rgba(6, 5, 9, 0.18)';
        ctx.fillRect(0, 0, width, height);

        blooms.forEach(b => {
            b.update();
            b.draw();
        });

        if (elapsed > 1900 && colorSwipe) {
            colorSwipe.classList.add('active');
        }

        if (elapsed < 2500) {
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
        { x: width * 0.2, y: height * 0.3, vx: 0.2, vy: 0.15, r: 380, color: 'rgba(247, 168, 196, 0.06)' },
        { x: width * 0.8, y: height * 0.6, vx: -0.15, vy: 0.2, r: 420, color: 'rgba(155, 93, 229, 0.06)' },
        { x: width * 0.5, y: height * 0.8, vx: 0.25, vy: -0.15, r: 360, color: 'rgba(0, 245, 212, 0.05)' }
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
   5. LIGHTWEIGHT DECK PREVIEW & STAGGERED REVEAL LOGIC
   ========================================================================== */
function initLightweightDeckInteraction() {
    const deckPreview = document.getElementById('deckPreviewStage');
    const deckStack = document.getElementById('deckPreviewStack');
    const galleryGrid = document.getElementById('galleryGrid');
    const btnReveal = document.getElementById('btnRevealCollection');
    const btnGather = document.getElementById('btnGatherDeck');
    const statusText = document.getElementById('deckStatusText');
    const cards = document.querySelectorAll('.art-card');

    if (!galleryGrid || !cards.length) return;

    function revealGallery() {
        if (deckPreview) deckPreview.classList.add('hidden');
        galleryGrid.classList.remove('hidden');

        if (btnReveal) btnReveal.classList.remove('active');
        if (btnGather) btnGather.classList.add('active');
        if (statusText) statusText.textContent = 'Gallery revealed. Click any artwork to open the high-definition viewer';

        // Fast, smooth staggered entrance for cards
        cards.forEach((card, idx) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px) scale(0.96)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, Math.min(idx * 30, 450));
        });
    }

    function showDeckPreview() {
        galleryGrid.classList.add('hidden');
        if (deckPreview) deckPreview.classList.remove('hidden');

        if (btnGather) btnGather.classList.remove('active');
        if (btnReveal) btnReveal.classList.add('active');
        if (statusText) statusText.textContent = 'Click the stacked card preview or press Reveal Collection to open the gallery';
    }

    if (btnReveal) btnReveal.addEventListener('click', revealGallery);
    if (btnGather) btnGather.addEventListener('click', showDeckPreview);
    if (deckStack) deckStack.addEventListener('click', revealGallery);
}

/* ==========================================================================
   6. SYMMETRICAL CARD HOVER TILT & SIBLING RECESSION
   ========================================================================== */
function initCardHoverTilt(enabled) {
    if (!enabled) return;

    const cards = document.querySelectorAll('.art-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) c.classList.add('receder');
            });
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
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
   8. FULLSCREEN ARTWORK LIGHTBOX MODAL
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
        card.addEventListener('click', () => {
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

/* ==========================================================================
   9. CLICK & MOBILE TOUCH SCROLL PIGMENT BLOOM SPLASH INTERACTION
   ========================================================================== */
function initClickSplashInteraction() {
    const splashGradients = [
        'radial-gradient(circle, rgba(247, 168, 196, 0.7) 0%, rgba(155, 93, 229, 0.4) 40%, rgba(0, 245, 212, 0.2) 70%, transparent 100%)',
        'radial-gradient(circle, rgba(0, 245, 212, 0.7) 0%, rgba(67, 97, 238, 0.4) 40%, rgba(247, 168, 196, 0.2) 70%, transparent 100%)',
        'radial-gradient(circle, rgba(251, 86, 7, 0.7) 0%, rgba(230, 57, 70, 0.4) 40%, rgba(155, 93, 229, 0.2) 70%, transparent 100%)',
        'radial-gradient(circle, rgba(155, 93, 229, 0.7) 0%, rgba(247, 168, 196, 0.4) 40%, rgba(0, 245, 212, 0.2) 70%, transparent 100%)'
    ];

    function spawnSplash(x, y) {
        const splash = document.createElement('div');
        splash.className = 'click-paint-splash';
        splash.style.left = `${x}px`;
        splash.style.top = `${y}px`;
        splash.style.background = splashGradients[Math.floor(Math.random() * splashGradients.length)];

        document.body.appendChild(splash);

        setTimeout(() => {
            if (splash.parentNode) splash.remove();
        }, 1400);
    }

    // Desktop & Mobile Single Click / Tap
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, select, .art-card, .featured-card, .art-lightbox-panel')) {
            return;
        }
        spawnSplash(e.clientX, e.clientY);
    });

    // Mobile Touch Drag / Scroll Gestures (Throttled for Performance)
    let lastTouchTime = 0;
    let lastTouchX = 0;
    let lastTouchY = 0;

    document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('button, a, input, select, .art-card, .featured-card, .art-lightbox-panel')) {
            return;
        }

        const now = Date.now();
        if (now - lastTouchTime < 180) return; // Rate limit: max 1 splash per 180ms

        const touch = e.touches[0];
        if (!touch) return;

        const dist = Math.hypot(touch.clientX - lastTouchX, touch.clientY - lastTouchY);
        if (dist < 40) return; // Minimum move distance threshold

        lastTouchTime = now;
        lastTouchX = touch.clientX;
        lastTouchY = touch.clientY;

        spawnSplash(touch.clientX, touch.clientY);
    }, { passive: true });
}

/* ==========================================================================
   10. FLOATING GLASS SOAP BUBBLES MODE
   ========================================================================== */
function initBubbleMode() {
    const bubbleBtn = document.getElementById('artBubbleBtn');
    if (!bubbleBtn) return;

    let isSpawning = false;

    bubbleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isSpawning) return;
        isSpawning = true;

        const numBubbles = 16;
        for (let i = 0; i < numBubbles; i++) {
            setTimeout(() => {
                createGlassBubble();
                if (i === numBubbles - 1) {
                    setTimeout(() => { isSpawning = false; }, 1000);
                }
            }, i * 180);
        }
    });

    function createGlassBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'glass-soap-bubble';

        const size = Math.floor(Math.random() * 45) + 30; // 30px to 75px
        const startX = Math.random() * 85 + 5; // 5vw to 90vw
        const driftX = (Math.random() - 0.5) * 160; // -80px to 80px drift
        const duration = Math.random() * 3 + 6; // 6s to 9s float
        const rot = Math.random() * 360;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${startX}vw`;
        bubble.style.bottom = `-80px`;
        bubble.style.setProperty('--drift-x', `${driftX}px`);
        bubble.style.setProperty('--rot', `${rot}deg`);
        bubble.style.setProperty('--duration', `${duration}s`);

        document.body.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, duration * 1000);
    }
}

