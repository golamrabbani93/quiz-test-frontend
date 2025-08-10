import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {getCurrentUser, logout} from '../../redux/features/auth/authSlice';

const Welcome = () => {
	const user = useAppSelector(getCurrentUser);
	const dispatch = useAppDispatch();
	const handleLogout = () => {
		// Dispatch logout action
		dispatch(logout());
	};
	return (
		<div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center px-6">
			<h1 className="text-white text-4xl md:text-6xl font-extrabold mb-6 text-center">
				Welcome to EForgeIT Quiz
			</h1>
			<p className="text-indigo-100 max-w-xl text-center text-lg md:text-xl mb-10">
				Discover amazing features, take quick tests, and get personalized results. Join us and start
				your journey today!
			</p>
			<div className="flex flex-col sm:flex-row gap-4">
				{user?.role ? (
					<>
						<Link
							to={`/${user?.role}/dashboard`}
							className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-indigo-700 transition"
						>
							Go to Dashboard
						</Link>
						<button
							onClick={handleLogout}
							className="bg-transparent border-2 border-red-500  font-semibold py-3 px-8 rounded-md hover:bg-red-500 transition text-white cursor-pointer"
						>
							Log Out Now
						</button>
					</>
				) : (
					<>
						<Link
							to="/login"
							className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-indigo-700 transition"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-indigo-800 transition"
						>
							Register
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Welcome;
