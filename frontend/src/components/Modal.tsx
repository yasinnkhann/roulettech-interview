import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Modal.css';

interface ModalProps {
	children: ReactNode;
	open: boolean;
	className?: string;
	onClose: () => void;
}

const Modal = ({ children, open, onClose, className = '' }: ModalProps) => {
	const dialog = useRef<HTMLDialogElement | null>(null);
	const modalContentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const modal = dialog.current;

		if (modal) {
			if (open) {
				modal.showModal();
			} else {
				modal.close();
			}
		}

		return () => {
			if (modal && modal.open) {
				modal.close();
			}
		};
	}, [open]);

	const handleClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (modalContentRef.current?.contains(e.target as Node)) {
			return;
		}
		dialog.current?.close();
	};

	return createPortal(
		<dialog
			ref={dialog}
			className={`modal ${className}`}
			onClose={onClose}
			onClick={handleClickOutside}
		>
			<button
				className='close-button'
				onClick={onClose}
				aria-label='Close modal'
			>
				&times;
			</button>
			<div className='modal-content' ref={modalContentRef}>
				{children}
			</div>
		</dialog>,
		document.getElementById('modal') as HTMLElement
	);
};

export default Modal;
