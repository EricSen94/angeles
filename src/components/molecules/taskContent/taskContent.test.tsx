import TaskContent from "./taskContent";
import { render, screen } from "test-utils";

describe("TaskContent", () => {
  test("renders correctly", () => {
    render(<TaskContent />);
    const taskContent = screen.getByTestId("task-content");
    expect(taskContent).toBeInTheDocument();
  });
  test("renders title and description", () => {
    const title = "Test Title";
    const description = "Test Description";
    render(<TaskContent title={title} description={description} />);
    const taskTitle = screen.getByTestId("task-content-title");
    expect(taskTitle).toBeInTheDocument();
    expect(taskTitle).toHaveTextContent(title);
    const taskDescription = screen.getByTestId("task-content-description");
    expect(taskDescription).toBeInTheDocument();
    expect(taskDescription).toHaveTextContent(description);
  });
});
