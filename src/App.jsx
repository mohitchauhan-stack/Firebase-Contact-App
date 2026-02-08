import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import AddUpdateContact from './components/AddUpdateContact';
import ContactCard from './components/ContactCard';
import Navbar from './components/Navbar';
import NotFoundContact from './components/NotFoundContact';
import { db } from './config/firebase';
import useDiscloser from './hooks/useDiscloser';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDiscloser();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContact = (event) => {
    const value = event.target.value;
    const contactsRef = collection(db, 'contacts');
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContact = contactLists.filter((contact) =>
        (contact.Name || '').toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContact);
      return filteredContact;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-92.5">
        <Navbar />
        <div className="flex gap-1">
          <div className="relative flex grow items-center">
            <IoSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContact}
              type="text"
              name="contact"
              id="contact"
              placeholder="Search contact"
              className="h-10 grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white" />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => <ContactCard contact={contact} key={contact.id} />)
          )}
        </div>
      </div>
      <AddUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
