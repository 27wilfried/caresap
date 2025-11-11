import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "contact@caresap.org") {
    return children;
  }
  return (
    <section
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-danger"
    >
      <div className="container">
        <h2>Permission non autorisée.</h2>
        <p>Cette page est accessible uniquement par l'admin.</p>
        <br />
        <Link to="/">
          <button className="">&larr; Allez à l'accueil</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "contact@caresap.org") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
