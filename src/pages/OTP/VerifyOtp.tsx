import {useState} from 'react';
import OtpInput from '../../components/ui/OtpInput/OtpInput';
import {useSendOtpMutation, useVerifyOtpMutation} from '../../redux/features/otp/otpApi';
import type {TResponse} from '../../types/global';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../redux/hooks';
import {getCurrentUser} from '../../redux/features/auth/authSlice';

const VerifyOtp = () => {
	const [otp, setOtp] = useState('');
	const [showOtpInput, setShowOtpInput] = useState(false);
	const [timer, setTimer] = useState(0);
	const [first, setFirst] = useState(true);
	const [mutate] = useSendOtpMutation();
	const [verify] = useVerifyOtpMutation();
	//get email from query params
	const user = useAppSelector(getCurrentUser);
	const navigate = useNavigate();
	const sendOtp = async () => {
		startCountdown();
		setShowOtpInput(true);
		setFirst(false);
		const toastId = toast.loading('Sending OTP...');
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res = (await mutate({email: user?.email})) as TResponse<any>;

			if (res.error) {
				toast.error(res?.error?.data?.message, {id: toastId, duration: 2000});
			} else {
				toast.success('OTP sent successfully', {id: toastId, duration: 2000});
			}
		} catch {
			toast.error('Failed to send OTP', {id: toastId, duration: 2000});
		}
	};
	const verifyOTP = async () => {
		const toastId = toast.loading('Verifying OTP...');
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res = (await verify({email: user?.email, otp: otp})) as TResponse<any>;

			if (res.error) {
				toast.error(res?.error?.data?.message, {id: toastId, duration: 2000});
			} else {
				toast.success('OTP verified successfully', {id: toastId, duration: 3000});
				navigate(`/${user?.role}/dashboard`);
			}
		} catch {
			toast.error('Failed to verify OTP', {id: toastId, duration: 2000});
		}
	};

	const startCountdown = () => {
		let sec = 90;
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
						onClick={verifyOTP}
					>
						Verify OTP
					</button>

					{/* Resend OTP */}
					<p className="mt-2 text-gray-600">Resend in {timer} seconds</p>
				</>
			)}
			{/* Notify we sent the OTP */}
			{showOtpInput && (
				<p className="mt-2 text-gray-600">
					OTP sent to {''}
					<span className="font-semibold">{user?.email}</span>
				</p>
			)}
		</div>
	);
};

export default VerifyOtp;
