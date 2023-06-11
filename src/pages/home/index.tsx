import React from "react";
import { createRoot } from "react-dom/client";
import Header from "../../components/header";

const HomePage = () => {
  return (
    <div>
      <Header title="Welcome to the home page!"></Header>
    </div>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<HomePage />);
} else {
  throw new Error("Failed to find applicatin root");
}
