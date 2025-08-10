// hooks/useTimer.ts
import {useState, useEffect} from 'react';

export const useTimer = (initialSeconds: number) => {
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

	useEffect(() => {
		if (secondsLeft <= 0) {
			return;
		}
		const timer = setTimeout(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
		return () => clearTimeout(timer);
	}, [secondsLeft]);

	return {secondsLeft, setSecondsLeft};
};
