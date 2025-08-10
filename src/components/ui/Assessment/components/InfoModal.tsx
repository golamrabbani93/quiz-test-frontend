interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	message: string;
}

const InfoModal: React.FC<ModalProps> = ({isOpen, onClose, title, message}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
				{title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
				<p className="text-gray-700 mb-6">{message}</p>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
