import ContactItem from "./ContactItem";

function ContactList({ contacts, deleteContact, editContact }) {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p className="empty-message">Aucun contact pour le moment.</p>
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
            editContact={editContact}
          />
        ))
      )}
    </div>
  );
}

export default ContactList;