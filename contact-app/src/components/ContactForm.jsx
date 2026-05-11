import { useEffect, useState } from "react";

function ContactForm({ addContact, updateContact, contactToEdit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (contactToEdit) {
      setFormData(contactToEdit);
    }
  }, [contactToEdit]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9+\s.-]{6,15}$/.test(phone);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.firstName.trim() === "" ||
      formData.lastName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phone.trim() === ""
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email invalide.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Téléphone invalide.");
      return;
    }

    if (contactToEdit) {
      updateContact(formData);
    } else {
      addContact(formData);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

    setError("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="Prénom"
        value={formData.firstName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Nom"
        value={formData.lastName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={handleChange}
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">
        {contactToEdit ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}

export default ContactForm;