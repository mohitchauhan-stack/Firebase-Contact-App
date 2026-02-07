import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import ContactCard from './components/ContactCard';
import Navbar from './components/Navbar';
import { db } from './config/firebase';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, 'contacts');
        const contactSnapShot = await getDocs(contactsRef);
        const contactLists = contactSnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="mx-auto max-w-92.5">
      <Navbar />
      <div className="flex gap-1">
        <div className="relative flex grow items-center">
          <IoSearch className="absolute ml-1 text-3xl text-white" />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Search contact"
            className="h-10 grow rounded-md border border-white bg-transparent pl-9 text-white"
          />
        </div>
        <AiFillPlusCircle className="cursor-pointer text-5xl text-white" />
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {contacts.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
