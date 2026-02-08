import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { db } from '../config/firebase';
import Modal from './Modal';

const AddUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
      toast.success('Contact added');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, contact);
      toast.success('Contact updated');
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={
            isUpdate
              ? {
                  Name: contact.Name,
                  Email: contact.Email,
                }
              : {
                  Name: '',
                  Email: '',
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="Name">Name</label>
              <Field name="Name" className="h-10 border" />
            </div>
            <div className="flex flex-col gap-1 text-black">
              <label htmlFor="Email">Email</label>
              <Field type="email" name="Email" className="h-10 border" />
            </div>
            <button
              type="submit"
              className="cursor-pointer self-end rounded-xl border bg-amber-300 px-3 py-1 text-black transition-all duration-300 hover:bg-amber-400"
            >
              {isUpdate ? 'Update' : 'Add'} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddUpdateContact;
