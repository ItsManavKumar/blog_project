/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
function useDebouncedValue<T>(value: T, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const timeout = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(timeout);
    }, [value, delay]);
  
    return debouncedValue;
  }
  