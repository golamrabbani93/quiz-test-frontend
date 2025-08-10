import React, {useEffect, useState} from 'react';
import type {Question} from '../../../../types/assessment';
import {useTimer} from '../../../../hooks/useTimer';

interface StepTestProps {
	step: number;
	questions: Question[];
	onComplete: (scorePercent: number) => void;
}

const StepTest: React.FC<StepTestProps> = ({step, questions: data, onComplete}) => {
	const questions = data;
	const totalTime = questions.reduce((acc, q) => acc + q.time, 0);
	// const totalTime = 10;
	// console.log('🚀🚀 ~ StepTest ~ totalTime:', totalTime);

	const [answers, setAnswers] = useState<{[id: string]: number}>({});
	const [currentIndex, setCurrentIndex] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const {secondsLeft, setSecondsLeft} = useTimer(totalTime);

	useEffect(() => {
		if (secondsLeft <= 0) {
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondsLeft]);

	// Reset question index and timer to 0 when step changes
	useEffect(() => {
		setCurrentIndex(0);
		setSecondsLeft(totalTime);
		setSubmitted(false);
	}, [step, totalTime, setSecondsLeft]);

	const handleOptionSelect = (optionIndex: number) => {
		if (submitted) return;
		setAnswers({...answers, [questions[currentIndex]._id]: optionIndex});
	};

	const handleNext = () => {
		if (submitted) return;
		if (currentIndex < questions.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePrev = () => {
		if (submitted) return;
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleSubmit = () => {
		if (submitted) return;
		let correct = 0;
		questions.forEach((q) => {
			if (answers[q._id] === q.correctOptionIndex) {
				correct++;
			}
		});
		const scorePercent = (correct / questions.length) * 100;
		setSubmitted(true);
		onComplete(Number(scorePercent.toFixed(2))); // Pass score as a percentage
	};

	const progress = ((currentIndex + 1) / questions.length) * 100;
	const mins = Math.floor(secondsLeft / 60);
	const secs = (secondsLeft % 60).toString().padStart(2, '0');

	return (
		<div className="p-6 bg-gray-50 min-h-screen flex flex-col">
			{/* Timer & Progress */}
			<div className="flex justify-between mb-4">
				<span className="text-lg font-bold text-indigo-700">
					Time Left: {mins}:{secs}
				</span>
				<span className="text-gray-600">
					Question {currentIndex + 1}/{questions.length}
				</span>
			</div>
			<div className="w-full bg-gray-200 h-2 rounded">
				<div className="bg-indigo-600 h-2 rounded" style={{width: `${progress}%`}} />
			</div>

			{/* Question */}
			<div className="bg-white shadow rounded p-4 my-6">
				<div className="mb-2">
					<span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
						Level: {questions[currentIndex]?.level}
					</span>
				</div>
				<h2 className="font-bold text-xl mb-4">{questions[currentIndex]?.questionText}</h2>
				<div className="space-y-2">
					{questions[currentIndex]?.options.map((opt, idx) => (
						<label
							key={idx}
							className={`block p-3 border rounded cursor-pointer ${
								answers[questions[currentIndex]._id] === idx
									? 'bg-indigo-100 border-indigo-500'
									: 'bg-white border-gray-300 hover:bg-gray-50'
							}`}
						>
							<input
								type="radio"
								name={`q-${questions[currentIndex]._id}`}
								value={idx}
								checked={answers[questions[currentIndex]._id] === idx}
								onChange={() => handleOptionSelect(idx)}
								className="hidden"
							/>
							{opt}
						</label>
					))}
				</div>
			</div>

			{/* Navigation */}
			<div className="flex justify-between">
				<button
					onClick={handlePrev}
					disabled={currentIndex === 0 || submitted}
					className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
				>
					Prev
				</button>
				{currentIndex === questions.length - 1 ? (
					<button
						onClick={handleSubmit}
						disabled={submitted}
						className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
					>
						Submit
					</button>
				) : (
					<button
						onClick={handleNext}
						disabled={submitted}
						className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer"
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default StepTest;
