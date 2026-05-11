import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [search, setSearch] = useState("");

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (contact) => {
    setContactToEdit(contact);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setContactToEdit(null);
  };

  const filteredContacts = contacts
    .filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="app">
      <h1>Gestionnaire de Contacts</h1>

      <ContactForm
        addContact={addContact}
        updateContact={updateContact}
        contactToEdit={contactToEdit}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Rechercher un contact..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactList
        contacts={filteredContacts}
        deleteContact={deleteContact}
        editContact={editContact}
      />
    </div>
  );
}

export default App;