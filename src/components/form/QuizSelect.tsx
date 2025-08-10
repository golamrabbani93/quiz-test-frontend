import {Form, Select} from 'antd';
import {Controller} from 'react-hook-form';

type TQuizSelectProps = {
	label: string;
	name: string;
	options: {value: string; label: string; disabled?: boolean}[] | undefined;
	disabled?: boolean;
};

const QuizSelect = ({label, name, options, disabled}: TQuizSelectProps) => {
	return (
		<Controller
			name={name}
			render={({field, fieldState: {error}}) => (
				<Form.Item label={label}>
					<Select
						style={{width: '100%'}}
						{...field}
						options={options}
						size="large"
						disabled={disabled}
					/>
					{error && <small style={{color: 'red'}}>{error.message}</small>}
				</Form.Item>
			)}
		/>
	);
};

export default QuizSelect;
