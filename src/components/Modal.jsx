import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="relative z-40 mx-auto min-h-50 max-w-92.5 rounded-2xl bg-white p-2">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="cursor-pointer text-3xl text-black" />
            </div>
            {children}
          </div>
          <div
            onClick={onClose}
            className="absolute top-0 z-30 mx-auto h-screen w-screen backdrop-blur-2xl"
          />
        </>
      )}
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
