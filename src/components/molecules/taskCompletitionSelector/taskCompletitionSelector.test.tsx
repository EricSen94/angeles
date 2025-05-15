import TaskCompletitionSelector from "./taskCompletitionSelector";
import { fireEvent, render, screen } from "test-utils";

describe("TaskCompletitionSelector", () => {
  const onClick = jest.fn();

  test("renders correctly", () => {
    render(
      <TaskCompletitionSelector
        showCompletedTask={false}
        setShowCompletedTask={onClick}
      />
    );
    const selector = screen.getByTestId("task-completition-selector");
    expect(selector).toBeInTheDocument();
    const pendingButton = screen.getByTestId("pending-task-button");
    expect(pendingButton).toBeDefined();
    expect(pendingButton).toHaveStyle({ backgroundColor: "#D9D9D9" });
    const completedButton = screen.getByTestId("completed-task-button");
    expect(completedButton).toHaveStyle({ backgroundColor: "#F2F0F0" });
  });
  test("onnclick pending task button", () => {
    render(
      <TaskCompletitionSelector
        showCompletedTask={false}
        setShowCompletedTask={onClick}
      />
    );
    const pendingButton = screen.getByTestId("pending-task-button");
    fireEvent.click(pendingButton);
    expect(onClick).toHaveBeenCalled();
  });

  test("shows completed task button as active", () => {
    render(
      <TaskCompletitionSelector
        showCompletedTask={true}
        setShowCompletedTask={onClick}
      />
    );
    const completedButton = screen.getByTestId("completed-task-button");
    fireEvent.click(completedButton);
    expect(onClick).toHaveBeenCalled();
  });
});
