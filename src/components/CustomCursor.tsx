import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches
            );
        };

        setIsTouchDevice(checkTouch());

        // Don't initialize cursor on touch devices
        if (checkTouch()) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        // Hide the default cursor globally
        document.body.style.cursor = 'none';

        // Add CSS to hide cursor on all elements
        const style = document.createElement('style');
        style.id = 'custom-cursor-style';
        style.textContent = `
            *, *::before, *::after {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        // Center the cursor on the pointer
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
        });

        // Simple smooth following - no fancy animations
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "none" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "none" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            // Restore default cursor on cleanup
            document.body.style.cursor = '';
            const styleEl = document.getElementById('custom-cursor-style');
            if (styleEl) styleEl.remove();
        };
    }, []);

    // Don't render cursor on touch devices
    if (isTouchDevice) return null;

    return (
        <div
            ref={cursorRef}
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999]"
            style={{
                width: '48px',
                height: '48px',
                backgroundImage: 'url(/ant.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        />
    );
}
