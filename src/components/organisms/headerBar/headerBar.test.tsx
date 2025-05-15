import { render, screen } from "test-utils";
import HeaderBar from "./headerBar";

describe("HeaderBar", () => {
  test("renders without crashing", () => {
    render(<HeaderBar />);
    expect(screen.getByTestId("header-bar")).toBeInTheDocument();
  });
});
