import {getCurrentResult} from '../../../../redux/features/assessment/assessmentSlice';
import {useAppSelector} from '../../../../redux/hooks';

const Result = () => {
	const {certification, level, score, step} = useAppSelector(getCurrentResult);
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			{step === 0 ? (
				<>Please complete the assessment.</>
			) : (
				<div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">Your Assessment Result</h1>

					<div className="mb-6">
						<p className="text-gray-500">Step {step}</p>
						<p className="text-4xl font-extrabold text-blue-600">{level || 'N/A'}</p>
						<p className="mt-2 text-lg font-medium text-gray-700">
							{certification || 'No certification'}
						</p>
					</div>

					<div className="bg-blue-50 rounded-lg p-4 mb-6">
						<p className="text-sm text-gray-600">Your Score</p>
						<p className="text-2xl font-bold text-blue-700">{score}%</p>
					</div>

					<button
						onClick={() => (window.location.href = '/')} // change to home or restart route
						className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
					>
						Go Back
					</button>
				</div>
			)}
		</div>
	);
};

export default Result;
