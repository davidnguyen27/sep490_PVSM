import { useEffect, useState, useRef } from "react";

interface DebounceOptions {
  leading?: boolean;
}

export function useDebounce<T>(
  value: T,
  delay: number,
  options: DebounceOptions = {},
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingCallRef = useRef<boolean>(false);

  useEffect(() => {
    // Validate delay
    const actualDelay = delay < 0 ? 0 : delay;

    // Handle leading debounce option
    if (options.leading && !leadingCallRef.current) {
      setDebouncedValue(value);
      leadingCallRef.current = true;
      return;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      leadingCallRef.current = false;
    }, actualDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, options.leading]);

  return debouncedValue;
}
