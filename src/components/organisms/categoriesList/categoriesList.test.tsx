import { categoriesMock } from "entities/mocks/categoriesMocks";
import CategoriesList from "./categoriesList";
import { render, screen } from "test-utils";

describe("CategoriesList", () => {
  test("renders without crashing", () => {
    render(<CategoriesList categories={categoriesMock} />);
    expect(screen.getByTestId("categories-list")).toBeInTheDocument();
  });
});
