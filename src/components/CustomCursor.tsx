import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Center the cursor on the pointer
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        // Simple smooth following - classic style
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power2.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power2.out" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px',
                height: '32px',
                backgroundImage: 'url(/ant.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pointerEvents: 'none',
                zIndex: 99999,
            }}
        />
    );
}
