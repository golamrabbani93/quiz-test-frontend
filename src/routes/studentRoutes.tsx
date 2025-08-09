import Student from '../pages/Dashboard/Student/Student';
import Test from '../pages/Dashboard/Student/Test/Test';

export const studentPath = [
	{
		name: 'Dashboard',
		path: 'dashboard',
		element: <Student />,
	},
	{
		name: 'Test Management',
		children: [
			{
				name: 'Start Test',
				path: 'start-test',
				element: <Test />,
			},
		],
	},
];
