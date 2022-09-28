import React from "react";
import "animate.css";
import { Banner } from "../../components/ProfilePage/Banner";
import { Contact } from "../../components/ProfilePage/Contact";

export default function Profile() {
  return (
    <div style={{ height: "100vh" }}>
      <Banner />
      <Contact />
    </div>
  );
}
