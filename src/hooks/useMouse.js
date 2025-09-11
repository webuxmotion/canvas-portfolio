import { useEffect, useRef } from "react";

export function useMouse(ref) {
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      posRef.current.x = e.clientX - rect.left;
      posRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMove);
    return () => canvas.removeEventListener("mousemove", handleMove);
  }, [ref]);

  return new Proxy(
    {},
    {
      get: (_, key) => posRef.current[key],
    }
  );
}