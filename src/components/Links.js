import { useEffect, useState } from "react";
import LinkForm from "./LinkForm.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { toast } from "react-toastify";

export function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditLink = async (linkObject) => {
    if(currentId === ''){
      await addDoc(collection(db, "links"), linkObject);
      toast.success("New task added.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
      const linksRef = collection(db, 'links')
      const linksDocRef = await doc(linksRef, currentId)
      await updateDoc(linksDocRef, linkObject)
      toast.info("Link updated successfully..", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCurrentId('');
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await deleteDoc(doc(db, "links", id));
      toast.error("Task removed succefully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getLinks = async () => {
    onSnapshot(collection(db, "links"), (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{addOrEditLink, currentId, links}} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
