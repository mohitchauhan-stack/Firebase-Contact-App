import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 z-30 mx-auto grid h-screen w-screen place-items-center backdrop-blur-2xl">
          <div className="relative z-40 mx-auto min-h-50 min-w-92.5 rounded-2xl bg-white p-2">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="cursor-pointer text-3xl text-black" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
