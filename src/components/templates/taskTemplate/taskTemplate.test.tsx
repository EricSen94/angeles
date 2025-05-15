import TaskTemplate from "./taskTemplate";
import { render, screen } from "test-utils";
import { TaskWithColorMock } from "entities/mocks/taskMocks";
import { categoriesMock } from "entities/mocks/categoriesMocks";

describe("TaskTemplate", () => {
  test("renders without crashing", () => {
    const task = {
      id: "t1",
      title: "Task 1",
      description: "Description 1",
      color: "blue",
    };
    const onclick = jest.fn();
    render(
      <TaskTemplate
        tasksWithColor={[TaskWithColorMock]}
        categories={categoriesMock}
        finishTask={onclick}
        showCompletedTask={false}
        setShowCompletedTask={onclick}
        addTask={onclick}
        openModal={onclick}
        showAddTask={false}
        hideModal={onclick}
      />
    );
    expect(screen.getByTestId("task-template")).toBeInTheDocument();
  });
});
