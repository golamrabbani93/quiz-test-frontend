import QuizForm from '../../components/form/QuizFrom';
import QuizInput from '../../components/form/QuizInput';
import type {FieldValues} from 'react-hook-form';

const Login = () => {
	const handleLogin = (data: FieldValues) => {
		console.log('Login data:', data);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 ">
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<QuizForm onSubmit={handleLogin} defaultValues={{email: '', password: ''}}>
					<h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Login</h2>
					<QuizInput type="email" name="email" label="Email" placeholder="Enter your email" />
					<QuizInput
						type="password"
						name="password"
						label="Password"
						placeholder="Enter your password"
					/>
					<div className="flex items-center justify-between -mt-6 mb-3">
						<a href="/forgot-password" className="text-indigo-700 font-semibold hover:underline">
							Forgot Password?
						</a>
					</div>
					<button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
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
