import TaskBoard from "./taskBoard";
import { render, screen } from "test-utils";
import { TaskWithColorMock } from "entities/mocks/taskMocks";

describe("TaskBoard", () => {
  const finishTask = jest.fn();
  const showCompletedTask = false;
  const setShowCompletedTask = jest.fn();
  test("renders without crashing", () => {
    render(
      <TaskBoard
        tasksWithColor={[TaskWithColorMock]}
        finishTask={finishTask}
        showCompletedTask={showCompletedTask}
        setShowCompletedTask={setShowCompletedTask}
      />
    );
    expect(screen.getByTestId("task-board")).toBeInTheDocument();
  });
});
