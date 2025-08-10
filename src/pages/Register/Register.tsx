import type {FieldValues} from 'react-hook-form';
import QuizForm from '../../components/form/QuizFrom';
import QuizInput from '../../components/form/QuizInput';
import QuizSelect from '../../components/form/QuizSelect';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerSchema} from '../../schemas/registerShcemas';
import {toast} from 'sonner';
import {useRegisterMutation} from '../../redux/features/auth/authApi';
import type {TResponse} from '../../types/global';

const Register = () => {
	const [register] = useRegisterMutation();
	const handleRegister = async (data: FieldValues) => {
		const toastId = toast.loading('Registering...');
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res = (await register({...data, role: 'student'})) as TResponse<any>;

			if (res.error) {
				toast.error(res?.error?.data?.message, {id: toastId, duration: 2000});
			} else {
				toast.success('Registered Successfully', {id: toastId, duration: 2000});
			}
		} catch {
			toast.error('Registration failed', {id: toastId, duration: 2000});
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 ">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<QuizForm
					onSubmit={handleRegister}
					defaultValues={{role: 'student'}}
					resolver={zodResolver(registerSchema)}
				>
					<h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Register</h2>
					<QuizInput type="name" name="name" label="Name" placeholder="Enter your name" />
					<QuizInput type="email" name="email" label="Email" placeholder="Enter your email" />
					<QuizSelect
						name="role"
						label="Select User Role"
						options={[{value: 'student', label: 'Student'}]}
						disabled
					/>
					<QuizInput
						type="password"
						name="password"
						label="Password"
						placeholder="Enter your password"
					/>

					<button
						type="submit"
						className="cursor-pointer -mt-1 bg-blue-500 text-white py-2 px-4 rounded"
					>
						Register
					</button>
					<p className="mt-4 text-center text-gray-600">
						Already have an account?{' '}
						<a href="/login" className="text-indigo-700 font-semibold hover:underline">
							Login
						</a>
					</p>
				</QuizForm>
			</div>
		</div>
	);
};

export default Register;
