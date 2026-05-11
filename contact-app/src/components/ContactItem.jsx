function ContactItem({ contact, deleteContact, editContact }) {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <h3>
          {contact.firstName} {contact.lastName}
        </h3>
        <p>Email : {contact.email}</p>
        <p>Téléphone : {contact.phone}</p>
      </div>

      <div className="contact-actions">
        <button className="btn-edit" onClick={() => editContact(contact)}>
          Modifier
        </button>

        <button className="btn-delete" onClick={() => deleteContact(contact.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default ContactItem;