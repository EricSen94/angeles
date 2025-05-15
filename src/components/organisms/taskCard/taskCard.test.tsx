import TaskCard from "./taskCard";
import { render, screen } from "test-utils";

describe("TaskCard", () => {
  test("renders without crashing", () => {
    const task = {
      id: "t1",
      title: "Task 1",
      description: "Description 1",
      color: "blue",
    };
    const onclick = jest.fn();
    render(<TaskCard task={task} onclick={onclick} />);
    expect(screen.getByTestId("task-card")).toBeInTheDocument();
  });
});
