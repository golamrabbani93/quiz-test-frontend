// types/assessment.ts
export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Question {
	_id: string;
	competency: string;
	level: Level;
	questionText: string;
	options: string[];
	correctOptionIndex: number;
	time: number; // seconds per question
}

// Step → Levels mapping
const stepLevels: Record<number, Level[]> = {
	1: ['A1', 'A2'],
	2: ['B1', 'B2'],
	3: ['C1', 'C2'],
};

// Helper to filter questions for a step
export const getStepQuestions = (questions: Question[], step: number) => {
	if (step === 1) {
		const a1Questions = questions.filter((q) => q.level === 'A1').slice(0, 22);
		const a2Questions = questions.filter((q) => q.level === 'A2').slice(0, 22);
		return [...a1Questions, ...a2Questions];
	}
	if (step === 2) {
		const b1Questions = questions.filter((q) => q.level === 'B1').slice(0, 22);
		const b2Questions = questions.filter((q) => q.level === 'B2').slice(0, 22);
		return [...b1Questions, ...b2Questions];
	}
	if (step === 3) {
		const c1Questions = questions.filter((q) => q.level === 'C1').slice(0, 22);
		const c2Questions = questions.filter((q) => q.level === 'C2').slice(0, 22);
		return [...c1Questions, ...c2Questions];
	}
	// fallback to previous logic for other steps
	const data = questions.filter((q) => stepLevels[step].includes(q.level));

	return data;
};
