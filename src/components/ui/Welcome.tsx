const Welcome = () => {
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
				<button
					type="button"
					className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-md shadow-md hover:bg-indigo-100 transition"
					onClick={() => alert('Start Test clicked')}
				>
					Start Test
				</button>
				<button
					type="button"
					className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-indigo-700 transition"
					onClick={() => alert('Login clicked')}
				>
					Login
				</button>
				<button
					type="button"
					className="bg-indigo-700 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-indigo-800 transition"
					onClick={() => alert('Register clicked')}
				>
					Register
				</button>
			</div>
		</div>
	);
};

export default Welcome;
