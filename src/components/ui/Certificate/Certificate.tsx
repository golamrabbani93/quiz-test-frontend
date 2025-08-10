import dayjs from 'dayjs';
import {useAppSelector} from '../../../redux/hooks';
import {getCurrentResult} from '../../../redux/features/assessment/assessmentSlice';

export default function CertificateGenerator() {
	const results = useAppSelector(getCurrentResult);
	// Check if certification is available
	if (!results.certification) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-500">
				No certificate available. Please complete the assessment.
			</div>
		);
	}
	// Check if certification is failed
	if (results.certification === 'Fail') {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-500">
				Your assessment did not meet the requirements for certification.
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6">
			<div className="relative bg-white border-[10px] border-yellow-500 rounded-3xl shadow-2xl w-full max-w-4xl p-12 overflow-hidden animate-fadeIn">
				{/* Inner Decorative Border */}
				<div className="absolute inset-4 border-[3px] border-yellow-300 rounded-2xl pointer-events-none"></div>

				{/* Ribbon */}
				<div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
					<span className="bg-yellow-500 text-white px-6 py-1 rounded-full shadow-md font-semibold tracking-wider text-sm uppercase">
						Official
					</span>
				</div>

				{/* Title */}
				<h1 className="text-4xl font-extrabold text-center text-yellow-600 mb-4 tracking-wide">
					Certificate of Achievement
				</h1>

				{/* Subtitle */}
				<p className="text-center text-gray-600 text-lg mb-8 italic">
					This is proudly presented to
				</p>

				{/* Name */}
				<p className="text-center text-3xl font-bold text-gray-900 mb-6">'John Doe'</p>

				{/* Achievement */}
				<p className="text-center text-gray-700 mb-4 text-lg">
					for successfully achieving the level of
				</p>
				<p className="text-center text-5xl font-extrabold text-blue-700 mb-2 drop-shadow-lg">
					{results.level}
				</p>
				<p className="text-center text-xl text-gray-800 font-medium mb-6">
					{results.certification}
				</p>

				{/* Seal */}
				<div className="absolute bottom-6 right-6 flex flex-col items-center">
					<div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-300">
						<span className="text-white font-bold text-lg">✓</span>
					</div>
					<p className="text-xs text-gray-600 mt-1">Verified</p>
				</div>

				{/* Date */}
				<p className="text-center text-gray-500 mt-12 text-sm">
					Awarded on <span className="font-semibold">{dayjs().format('MMMM D, YYYY')}</span>
				</p>
			</div>
		</div>
	);
}
