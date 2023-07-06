import * as React from "react";
import Header from "./header";
import { render, screen } from "@testing-library/react";

describe("Header Component", () => {
  it("Renders the expected header content", () => {
    const { baseElement } = render(<Header title="This is a header"></Header>);

    expect(screen.getByText("This is a header")).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });
});
