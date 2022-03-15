import { useEffect, useState } from 'react';

type Result<T> = [number, React.Dispatch<React.SetStateAction<T | null>>];

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideClick = <T extends HTMLElement>(): Result<T> => {
  const [elem, setElem] = useState<T | null>(null);
  const [clickedOutside, setClickedOutside] = useState(0);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (elem && !elem.contains(event.target as HTMLElement)) {
        setClickedOutside(prevCount => prevCount + 1);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elem]);

  return [clickedOutside, setElem];
};

export default useOutsideClick;
