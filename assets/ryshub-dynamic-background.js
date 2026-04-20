(function () {
    if (window.__ryshubDynamicBackgroundInit) return;
    window.__ryshubDynamicBackgroundInit = true;

    function initDynamicBackground() {
        if (!document.body) return;

        document.body.classList.add('ryshub-dynamic-bg');

        if (!document.getElementById('ryshub-dynamic-bg-style')) {
            const style = document.createElement('style');
            style.id = 'ryshub-dynamic-bg-style';
            style.textContent = `
                body.ryshub-dynamic-bg {
                    background: radial-gradient(circle at top, rgba(30, 64, 175, 0.24), transparent 38%), #0b0f19 !important;
                    overflow-x: hidden;
                    min-block-size: 100vh;
                }

                body.ryshub-dynamic-bg::before,
                body.ryshub-dynamic-bg::after {
                    display: none !important;
                }

                #neuron-canvas {
                    position: fixed;
                    inset: 0;
                    inline-size: 100%;
                    block-size: 100%;
                    z-index: 0;
                    pointer-events: none;
                }

                #static-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    will-change: opacity;
                }

                #static-overlay::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
                    background-size: 180px 180px;
                    opacity: 0.03;
                    animation: grain-shift 0.12s steps(1) infinite;
                }

                #static-overlay::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.16) 2px,
                        rgba(0, 0, 0, 0.16) 4px
                    );
                }

                @keyframes grain-shift {
                    0%   { background-position: 0 0; }
                    10%  { background-position: -15px 10px; }
                    20%  { background-position: 20px -5px; }
                    30%  { background-position: -10px 20px; }
                    40%  { background-position: 25px 5px; }
                    50%  { background-position: -5px -15px; }
                    60%  { background-position: 10px 25px; }
                    70%  { background-position: -20px -10px; }
                    80%  { background-position: 15px 15px; }
                    90%  { background-position: -25px 0; }
                    100% { background-position: 0 0; }
                }

                @media (prefers-reduced-motion: reduce) {
                    #static-overlay::before {
                        animation: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        let canvas = document.getElementById('neuron-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'neuron-canvas';
            document.body.prepend(canvas);
        }

        let overlay = document.getElementById('static-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'static-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.prepend(overlay);
        }

        const selectors = [
            '.main-header', '.main-nav', '.unit-container', '.section-view', '.glass-frame',
            '.login-card', '.security-info-card', '.security-warning-card',
            '.toc-container', '.container', '.header', '.note',
            '.units-grid', '.footer', '.footer-creator'
        ];

        document.querySelectorAll(selectors.join(',')).forEach(function (el) {
            const computed = window.getComputedStyle(el);
            if (computed.position === 'static') {
                el.style.position = 'relative';
            }
            if (computed.zIndex === 'auto' && !el.style.zIndex) {
                el.style.zIndex = '2';
            }
        });

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
        const mouse = { x: -9999, y: -9999 };
        const nodes = [];
        const nodeCount = 42;

        function resize() {
            canvas.width = Math.floor(window.innerWidth * dpr);
            canvas.height = Math.floor(window.innerHeight * dpr);
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!nodes.length) {
                for (let i = 0; i < nodeCount; i += 1) {
                    nodes.push({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: (Math.random() - 0.5) * 0.4,
                        r: 1.4 + Math.random() * 2.2
                    });
                }
            }
        }

        function step() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < nodes.length; i += 1) {
                const n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
                if (n.y < 0 || n.y > window.innerHeight) n.vy *= -1;

                ctx.beginPath();
                ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
                ctx.shadowColor = 'rgba(56, 189, 248, 0.35)';
                ctx.shadowBlur = 10;
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let j = i + 1; j < nodes.length; j += 1) {
                    const m = nodes[j];
                    const dx = n.x - m.x;
                    const dy = n.y - m.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const alpha = 1 - dist / 150;
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(96, 165, 250, ' + (alpha * 0.24) + ')';
                        ctx.lineWidth = 1;
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(m.x, m.y);
                        ctx.stroke();
                    }
                }

                const mdx = n.x - mouse.x;
                const mdy = n.y - mouse.y;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mouseDist < 180) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(125, 211, 252, ' + ((1 - mouseDist / 180) * 0.35) + ')';
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            window.requestAnimationFrame(step);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', function (event) {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });
        window.addEventListener('mouseleave', function () {
            mouse.x = -9999;
            mouse.y = -9999;
        });

        resize();
        step();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDynamicBackground, { once: true });
    } else {
        initDynamicBackground();
    }
})();