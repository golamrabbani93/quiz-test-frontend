import {useState} from 'react';
import OtpInput from '../../components/ui/OtpInput/OtpInput';

const VerifyOtp = () => {
	const [otp, setOtp] = useState('');
	const [showOtpInput, setShowOtpInput] = useState(false);
	const [timer, setTimer] = useState(0);
	const [first, setFirst] = useState(true);
	const sendOtp = async () => {
		console.log('object');
		startCountdown();
		setShowOtpInput(true);
		setFirst(false);
	};

	const startCountdown = () => {
		let sec = 10;
		const interval = setInterval(() => {
			sec--;
			setTimer(sec);
			if (sec <= 0) clearInterval(interval);
		}, 1000);
	};

	return (
		<div className="flex flex-col items-center gap-6 p-8">
			<h1 className="text-2xl font-bold">OTP Verification</h1>

			{/* Send OTP Button */}
			{timer === 0 && (
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
					onClick={sendOtp}
				>
					{first ? 'Send OTP' : 'Resend OTP'}
				</button>
			)}

			{/* OTP Input */}
			{showOtpInput && (
				<>
					<OtpInput length={6} onChange={setOtp} />
					<button
						className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 disabled:opacity-50 cursor-pointer"
						disabled={otp.length !== 6}
					>
						Verify OTP
					</button>

					{/* Resend OTP */}
					<p className="mt-2 text-gray-600">Resend in {timer} seconds</p>
				</>
			)}
		</div>
	);
};

export default VerifyOtp;
