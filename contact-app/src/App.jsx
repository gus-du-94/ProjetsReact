import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Login from "./components/Login";
import "./App.css";

const API_URL = "http://localhost:3000/contacts";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [search, setSearch] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      getContacts();
    }
  }, [token]);

  const getContacts = async () => {
    const response = await axios.get(API_URL, config);
    setContacts(response.data);
  };

  const addContact = async (contact) => {
    const response = await axios.post(API_URL, contact, config);
    setContacts([...contacts, response.data]);
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/${id}`, config);
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (contact) => {
    setContactToEdit(contact);
  };

  const updateContact = async (updatedContact) => {
    const response = await axios.put(
      `${API_URL}/${updatedContact.id}`,
      updatedContact,
      config
    );

    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? response.data : contact
      )
    );

    setContactToEdit(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setContacts([]);
  };

  const filteredContacts = contacts
    .filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Gestionnaire de Contacts</h1>
        <button className="btn-logout" onClick={logout}>
          Déconnexion
        </button>
      </div>

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