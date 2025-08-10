import Certificate from '../pages/Dashboard/Student/Certificate/Certificate';
import Student from '../pages/Dashboard/Student/Student';
import Test from '../pages/Dashboard/Student/Test/Test';
import VerifyOtp from '../pages/OTP/VerifyOtp';

export const studentPath = [
	{
		name: 'Dashboard',
		path: 'dashboard',
		element: <Student />,
	},
	{
		name: 'Verify Now',
		path: 'verify-otp',
		element: <VerifyOtp />,
	},
	{
		name: 'Start Test',
		path: 'start-test',
		element: <Test />,
	},
	{
		name: 'Certificate',
		path: 'certificate',
		element: <Certificate />,
	},
];
