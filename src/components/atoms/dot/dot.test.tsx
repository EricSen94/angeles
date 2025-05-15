import { render, screen } from "test-utils";
import Dot from "./dot";

describe("Dot", () => {
  test("renders correclty", () => {
    render(<Dot color="#ff0000" />);
    const dot = screen.getByTestId("dot");
    expect(dot).toBeDefined();
    expect(dot).toHaveStyle({ backgroundColor: "#ff0000" });
  });
});
