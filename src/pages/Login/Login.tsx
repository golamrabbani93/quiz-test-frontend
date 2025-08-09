import {zodResolver} from '@hookform/resolvers/zod';
import QuizForm from '../../components/form/QuizFrom';
import QuizInput from '../../components/form/QuizInput';
import type {FieldValues} from 'react-hook-form';
import {loginSchema} from '../../schemas/loginschemas';
import {useLoginMutation} from '../../redux/features/auth/authApi';
import {toast} from 'sonner';
import verifyToken from '../../utils/verifyToken';
import {useAppDispatch} from '../../redux/hooks';
import {setUser} from '../../redux/features/auth/authSlice';
import type {TResponse} from '../../types/global';
import {useNavigate} from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [login] = useLoginMutation();
	const dispatch = useAppDispatch();
	const handleLogin = async (data: FieldValues) => {
		const toastId = toast.loading('Logging in...');
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res = (await login(data)) as TResponse<any>;
			const token = res?.data?.token;
			if (res.error) {
				toast.error(res?.error?.data?.message, {id: toastId, duration: 2000});
			} else {
				toast.success('Logged In', {id: toastId, duration: 2000});
				const decoded = verifyToken(token);
				const user = {
					userId: decoded.userId,
					email: decoded.userEmail,
					role: decoded.role,
				};
				dispatch(setUser({user, token}));
				//navigate role based route
				navigate(
					user?.role === 'admin' ? '/admin' : user?.role === 'supervisor' ? '/supervisor' : '/',
					{replace: true},
				);
			}
		} catch {
			toast.error('Login failed', {id: toastId, duration: 2000});
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 ">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<QuizForm
					onSubmit={handleLogin}
					defaultValues={{email: 'devrabbani9@gmail.com', password: 'password123'}}
					resolver={zodResolver(loginSchema)}
				>
					<h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Login</h2>
					<QuizInput type="email" name="email" label="Email" placeholder="Enter your email" />
					<QuizInput
						type="password"
						name="password"
						label="Password"
						placeholder="Enter your password"
					/>
					<div className=" -mt-6 mb-3">
						<a
							href="/forgot-password"
							className="text-indigo-700 font-semibold hover:underline flex justify-end"
						>
							Forgot Password?
						</a>
					</div>
					<button
						type="submit"
						className="cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded"
					>
						Login
					</button>
					<p className="mt-4 text-center text-gray-600">
						Create New Account{' '}
						<a href="/register" className="text-indigo-700 font-semibold hover:underline">
							Register
						</a>
					</p>
				</QuizForm>
			</div>
		</div>
	);
};

export default Login;
