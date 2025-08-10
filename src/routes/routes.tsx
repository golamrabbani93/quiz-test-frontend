import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import routesGenerator from '../utils/routesGenerator';
import {adminPath} from './adminRoutes';
import {studentPath} from './studentRoutes';
import Register from '../pages/Register/Register';

import VerifyOtp from '../pages/OTP/VerifyOtp';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/otp-verification',
		element: <VerifyOtp />,
	},
	{
		path: '/admin',
		element: (
			<ProtectedRoute role="admin">
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: routesGenerator(adminPath),
	},
	{
		path: '/student',
		element: (
			<ProtectedRoute role="student">
				<DashboardLayout />
			</ProtectedRoute>
		),
		children: routesGenerator(studentPath),
	},
]);

export default router;
