import { useState, useEffect } from 'react'

// This hook delays updating a value until the user stops typing.
// It's perfect for search boxes – no need to filter on every keystroke.
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timer to update after 'delay' ms
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);

    // Cleanup: cancel the timer if value changes again before delay finishes
    return () => clearTimeout(handler)
  }, [value, delay]);

  return debouncedValue;
}
