import React, {useState} from 'react';
import {getStepQuestions} from '../../../types/assessment';
import StepTest from './components/StepTest';
import {useGetAllQuestionQuery} from '../../../redux/features/assessment/assessmentApi';
import InfoModal from './components/InfoModal';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {getCurrentResult, saveStepResult} from '../../../redux/features/assessment/assessmentSlice';
import Result from './components/Result';

const AssessmentFlow: React.FC = () => {
	const {data: questions, isLoading} = useGetAllQuestionQuery({});
	const [step, setStep] = useState(1);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [modalTitle, setModalTitle] = useState('');
	const dispatch = useAppDispatch();
	const {certification} = useAppSelector(getCurrentResult);
	//save result in redux
	const saveResult = (certification: string, level: string, score: number) => {
		dispatch(saveStepResult({step, score, certification, level}));
	};

	const showModal = (message: string, title?: string) => {
		setModalMessage(message);
		if (title) setModalTitle(title);
		else setModalTitle('');
		setModalOpen(true);
	};
	const handleStepComplete = (score: number) => {
		if (step === 1) {
			if (score < 25) {
				showModal('Fail. No retake allowed.', 'Step 1 Result');
				saveResult('Fail', 'A1', score);
				return;
			}
			if (score >= 75) {
				showModal('Congratulations! You have advanced to the next level.', 'Step 1 Result');
				setStep(2);
				saveResult('A2 certified + Proceed to Step 2', 'A2', score);
				return;
			}
			const cert = score >= 50 ? 'A2 certified' : 'A1 certified';
			const level = score >= 50 ? 'A2' : 'A1';
			showModal(cert, 'Step 1 Result');
			saveResult(cert, level, score);
			return;
		}

		if (step === 2) {
			if (score < 25) {
				showModal('Remain at A2', 'Step 2 Result');
				saveResult('Remain at A2', 'A2', score);
				return;
			}
			if (score >= 75) {
				showModal('Congratulations! You have advanced to the next level.', 'Step 2 Result');
				setStep(3);
				saveResult('B2 certified + Proceed to Step 3', 'B2', score);
				return;
			}
			const cert = score >= 50 ? 'B2 certified' : 'B1 certified';
			const level = score >= 50 ? 'B2' : 'B1';
			showModal(cert, 'Step 2 Result');
			saveResult(cert, level, score);
			return;
		}

		if (step === 3) {
			if (score < 25) {
				showModal('Remain at B2', 'Step 3 Result');
				saveResult('Remain at B2', 'B2', score);
				return;
			}
			const cert = score >= 50 ? 'C2 certified' : 'C1 certified';
			const level = score >= 50 ? 'C2' : 'C1';
			showModal(cert, 'Step 3 Result');
			saveResult(cert, level, score);
			return;
		}
	};
	if (isLoading) return <div className="p-6">Loading questions...</div>;

	return (
		<>
			{certification === 'Fail' || certification === 'C2 certified' ? (
				<Result />
			) : (
				<>
					<StepTest
						step={step}
						questions={getStepQuestions(questions ?? [], step)}
						onComplete={handleStepComplete}
					/>
				</>
			)}
			<InfoModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				title={modalTitle}
				message={modalMessage}
			/>
		</>
	);
};

export default AssessmentFlow;
