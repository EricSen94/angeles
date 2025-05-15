import { render, screen } from "test-utils";
import CatgoriesDot from "./categoriesDot";

describe("Catgories dots", () => {
  const category = {
    color: "#ff0000",
    name: "test",
  };
  test("renders correclty", () => {
    render(<CatgoriesDot category={category} />);

    const dot = screen.getByTestId("categories-dot");
    expect(dot).toBeDefined();
  });
  test("Render dot and name", () => {
    render(<CatgoriesDot category={category} />);

    const dot = screen.getByTestId("dot");
    expect(dot).toBeDefined();
    expect(dot).toHaveStyle({ backgroundColor: "#ff0000" });
    const text = screen.getByTestId("category-name");
    expect(text).toBeDefined();
  });
});
