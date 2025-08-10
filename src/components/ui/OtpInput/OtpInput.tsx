import React, {useRef} from 'react';

interface OtpInputProps {
	length?: number;
	onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({length = 6, onChange}) => {
	const inputsRef = useRef<HTMLInputElement[]>([]);

	const handleChange = (value: string, index: number) => {
		if (!/^[0-9]?$/.test(value)) return; // only numbers

		const otpArray = inputsRef.current.map((input) => input.value);
		otpArray[index] = value;
		onChange(otpArray.join(''));

		if (value && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !inputsRef.current[index].value && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<div className="flex gap-2">
			{Array.from({length}).map((_, i) => (
				<input
					key={i}
					type="text"
					maxLength={1}
					className="w-12 h-12 text-center text-lg border border-gray-400 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					ref={(el) => {
						if (el) inputsRef.current[i] = el;
					}}
					onChange={(e) => handleChange(e.target.value, i)}
					onKeyDown={(e) => handleKeyDown(e, i)}
				/>
			))}
		</div>
	);
};

export default OtpInput;
