// pages/assessment.tsx
import React, {useState} from 'react';
import {getStepQuestions} from '../../../types/assessment';
import StepTest from './components/StepTest';
import {useGetAllQuestionQuery} from '../../../redux/features/assessment/assessmentApi';

const AssessmentFlow: React.FC = () => {
	const {data: questions, isLoading} = useGetAllQuestionQuery({});
	const [step, setStep] = useState(1);

	const handleStepComplete = (score: number) => {
		if (step === 1) {
			if (score < 25) return alert('Fail. No retake allowed.');
			if (score >= 75) {
				alert('Congratulations! You have advanced to the next level.');
				setStep(2);
			}
			return alert(score >= 50 ? 'A2 certified' : 'A1 certified');
		}
		if (step === 2) {
			if (score < 25) return alert('Remain at A2');
			if (score >= 75) return setStep(3);
			return alert(score >= 50 ? 'B2 certified' : 'B1 certified');
		}
		if (step === 3) {
			if (score < 25) return alert('Remain at B2');
			return alert(score >= 50 ? 'C2 certified' : 'C1 certified');
		}
	};

	if (isLoading) return <div className="p-6">Loading questions...</div>;

	return (
		<StepTest
			step={step}
			questions={getStepQuestions(questions ?? [], step)}
			onComplete={handleStepComplete}
		/>
	);
};

export default AssessmentFlow;
