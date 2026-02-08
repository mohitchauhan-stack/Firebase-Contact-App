import { addDoc, collection } from 'firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { db } from '../config/firebase';
import Modal from './Modal';

const AddUpdateContact = ({ isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            Name: '',
            Email: '',
          }}
          onSubmit={(values) => {
            console.log(values);
            addContact(values);
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
