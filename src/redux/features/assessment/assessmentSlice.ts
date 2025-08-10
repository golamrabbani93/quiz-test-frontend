import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface StepResult {
	step: number;
	score: number;
	level: string;
	certification: string;
}

interface AssessmentState {
	result: StepResult;
}

const initialState: AssessmentState = {
	result: {
		step: 0,
		score: 0,
		level: '',
		certification: '',
	},
};

const assessmentSlice = createSlice({
	name: 'assessment',
	initialState,
	reducers: {
		saveStepResult: (state, action: PayloadAction<StepResult>) => {
			state.result = action.payload; // overwrite with latest
		},
		resetAssessment: (state) => {
			state.result = {step: 0, score: 0, level: '', certification: ''};
		},
	},
});

export const {saveStepResult, resetAssessment} = assessmentSlice.actions;
export const getCurrentResult = (state: {assessment: AssessmentState}) => state.assessment.result;

export default assessmentSlice.reducer;
