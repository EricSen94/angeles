import { TaskMock } from "entities/mocks/taskMocks";
import TaskFooter from "./taskFooter";
import { render, screen } from "test-utils";

describe("TaskFooter Component", () => {
  const onClick = jest.fn();

  test("renders without crashing", () => {
    render(<TaskFooter task={TaskMock} onClick={onClick} />);
    expect(screen.getByTestId("task-footer")).toBeInTheDocument();
  });
  test("Fire event onclick", () => {
    render(<TaskFooter task={TaskMock} onClick={onClick} />);
    const button = screen.getByTestId("finish-task-button");
    button.click();
    expect(onClick).toHaveBeenCalledWith(TaskMock.id);
  });
});
