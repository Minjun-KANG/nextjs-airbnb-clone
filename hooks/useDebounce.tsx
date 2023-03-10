import { useState, useEffect } from "react";

//debounce 된 값을 return
const useDebounce = (value: string, delay: number) => {
	const [debounceValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debounceValue;
};

export default useDebounce;
