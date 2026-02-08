import noContact from '../assets/Hands_Contact.png';

const NotFoundContact = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <img src={noContact} alt="no_contacts" />
      <h3 className="text-orange-600">Contacts not found</h3>
    </div>
  );
};

export default NotFoundContact;
