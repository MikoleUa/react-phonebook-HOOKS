import "./App.css";
import React, { useEffect, useState } from "react";
import Section from "./components/Section/Section";
import Form from "./components/Form/Form";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./Filter/Filter";

const useLocalStorage = (value) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem("contacts")) ?? value;
  });
  useEffect(() => {
    return window.localStorage.setItem("contacts", JSON.stringify(state));
  }, [value, state]);
  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  function getNewContact(data) {
    if (contacts.find(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts((prevState) => [...prevState, data]);
    }
  }
  const filterContactList = (data) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(data.toLowerCase())
    );
  };
  const deleteContact = (idContact) => {
    setContacts(contacts.filter((e) => e.id !== idContact));
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={getNewContact}></Form>
      </Section>
      <Section title="Contacts">
        <Filter onChange={setFilter} />
        <ContactsList
          list={filterContactList(filter)}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}

export default App;
