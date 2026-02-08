import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import useDiscloser from '../hooks/useDiscloser';
import AddUpdateContact from './AddUpdateContact';

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDiscloser();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      toast.success('Contact deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex w-full items-center justify-between rounded-md bg-neutral-800 p-3 shadow-md shadow-blue-200"
      >
        <div className="flex items-center gap-3">
          <HiOutlineUserCircle className="text-2xl text-yellow-400" />
          <div className="text-white">
            <h2 className="font-medium">{contact.Name}</h2>
            <p className="text-sm text-neutral-300">{contact.Email}</p>
          </div>
        </div>
        <div className="flex gap-2 text-xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer hover:text-white" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer text-red-400 hover:text-red-500"
          />
        </div>
      </div>
      <AddUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;
