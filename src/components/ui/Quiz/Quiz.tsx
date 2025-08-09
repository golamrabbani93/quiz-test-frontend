import React, {useState} from 'react';

interface Question {
	id: number;
	question: string;
	options: string[];
}

const Quiz: React.FC = () => {
	// Sample question data
	const questions: Question[] = [
		{
			id: 1,
			question: 'What is the capital of France?',
			options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
		},
		{
			id: 2,
			question: 'Which planet is known as the Red Planet?',
			options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
		},
		{
			id: 3,
			question: "Who wrote 'Hamlet'?",
			options: ['Shakespeare', 'Hemingway', 'Dickens', 'Tolstoy'],
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<{[key: number]: string}>({});
	const [showModal, setShowModal] = useState(false);

	const handleOptionSelect = (option: string) => {
		setAnswers({...answers, [questions[currentIndex].id]: option});
	};

	const handleNext = () => {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 p-6">
			{/* Question */}
			<div className="bg-white rounded-lg shadow p-6 mb-6">
				<h2 className="text-xl font-bold text-gray-800 mb-4">{questions[currentIndex].question}</h2>
				<div className="space-y-3">
					{questions[currentIndex].options.map((option, index) => (
						<label
							key={index}
							className={`block p-3 border rounded-lg cursor-pointer transition ${
								answers[questions[currentIndex].id] === option
									? 'bg-indigo-100 border-indigo-500'
									: 'bg-white border-gray-300 hover:bg-gray-50'
							}`}
						>
							<input
								type="radio"
								name={`question-${questions[currentIndex].id}`}
								value={option}
								checked={answers[questions[currentIndex].id] === option}
								onChange={() => handleOptionSelect(option)}
								className="hidden"
							/>
							{option}
						</label>
					))}
				</div>
			</div>

			{/* Navigation */}
			<div className="flex justify-between">
				<button
					onClick={handlePrev}
					disabled={currentIndex === 0}
					className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
				>
					Previous
				</button>
				<button
					onClick={handleNext}
					disabled={currentIndex === questions.length - 1}
					className="px-6 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
				>
					Next
				</button>
			</div>

			{/* Auto-submit modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
						<h2 className="text-lg font-bold mb-4 text-red-600">Time’s Up!</h2>
						<p className="text-gray-600 mb-6">Your answers have been submitted automatically.</p>
						<button
							onClick={() => setShowModal(false)}
							className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Quiz;
