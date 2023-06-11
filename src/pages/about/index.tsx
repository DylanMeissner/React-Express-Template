import React from "react";
import { createRoot } from "react-dom/client";
import Header from "../../components/header";

const AboutPage = () => {
  return (
    <div>
      <div>
        <Header title="Welcome to the about page!"></Header>
      </div>
      <img src="/assets/images/avatar.jpg"></img>
    </div>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<AboutPage />);
} else {
  throw new Error("Failed to find applicatin root");
}
