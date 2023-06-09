import { RefObject, useEffect } from 'react';

const useOutClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent) => void,
): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (!ref || !ref.current || ref.current.contains(event.target as T)) {
        return;
      }

      callback(event);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, ref]);
}

export default useOutClick;
