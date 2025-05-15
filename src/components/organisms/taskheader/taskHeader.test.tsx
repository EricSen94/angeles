import TaskHeader from "./taskHeader";
import { fireEvent, render, screen } from "test-utils";

describe("TaskHeader", () => {
  const mockOnClick = jest.fn();
  test("renders without crashing", () => {
    render(<TaskHeader openModal={mockOnClick} />);
    expect(screen.getByTestId("task-header")).toBeInTheDocument();
  });

  test("renders the title", () => {
    render(<TaskHeader openModal={mockOnClick} />);
    expect(screen.getByTestId("task-header-title")).toBeInTheDocument();
  });

  test("renders the add task button", () => {
    render(<TaskHeader openModal={mockOnClick} />);
    const addTaskButton = screen.getByTestId("add-task-button");
    expect(addTaskButton).toBeInTheDocument();
    fireEvent.click(addTaskButton);
  });
});
