import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Initial setup
        gsap.set(cursor, {
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            opacity: 0 // Hidden initially until movement
        });

        // Mouse movement physics
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });

        // Rotation physics
        let currentRotation = 0;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
            xTo(e.clientX);
            yTo(e.clientY);

            // Calculate rotation based on movement direction
            const movementX = e.movementX;
            const targetRotation = movementX * 2; // Simple tilt based on X movement
            currentRotation = gsap.utils.interpolate(currentRotation, targetRotation, 0.1);
            gsap.to(cursor, { rotation: currentRotation, duration: 0.2 });
        };

        // Hover effects for interactive elements
        const onMouseEnter = () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 90, 42, 0.1)', // Subtle orange tint
                border: '1px solid rgba(255, 90, 42, 0.5)',
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        };

        const onMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                border: 'none',
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const onMouseDown = () => {
            gsap.to(cursor, { scale: 0.8, duration: 0.1 });
        };

        const onMouseUp = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        };

        // Attach listeners
        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        // Add hover listeners to all clickable elements
        const addHoverListeners = () => {
            const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        };

        addHoverListeners();

        // Re-add listeners when DOM changes (simple observer)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            observer.disconnect();

            const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
            style={{
                width: '64px',
                height: '64px',
                backgroundImage: 'url(/ant.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        />
    );
}
