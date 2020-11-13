import React, { Fragment, useContext, useEffect } from "react";
import { Form } from "../components/Form";
import { Notes } from "../components/Notes";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Loader } from "../components/Loader";
import { AlertContext } from "../context/alert/alertContext";

export const Home = () => {
  const alert = useContext(AlertContext);
  const { loading, notes, fetchNotes, removeNote } = useContext(
    FirebaseContext
  );

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);
  const onRemoveNote = (id) => {
    removeNote(id)
      .then(() => {
        alert.show("Note deleted", "success");
      })
      .catch(() => {
        alert.show("Something goes wrong", "danger");
      });
  };

  return (
    <Fragment>
      <Form />

      <hr />
      {loading ? <Loader /> : <Notes notes={notes} onRemove={onRemoveNote} />}
    </Fragment>
  );
};
