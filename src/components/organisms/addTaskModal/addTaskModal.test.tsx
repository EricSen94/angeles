import { fireEvent, render, screen } from "test-utils";
import AddTaskModal from "./addTaskModal";
import { categoriesMock } from "entities/mocks/categoriesMocks";
describe("AddTaskModal", () => {
  const mockCloseModal = jest.fn();
  const mockAddTask = jest.fn();
  const renderModal = () => {
    render(
      <AddTaskModal
        open={true}
        categories={categoriesMock}
        onClose={mockCloseModal}
        onSubmit={mockAddTask}
      />
    );
  };
  test("renders without crashing", () => {
    renderModal();
    expect(screen.getByTestId("add-task-modal")).toBeInTheDocument();
  });
  test("Add task when submit button is clicked", () => {
    renderModal();
    const addTaskName = screen
      .getByTestId("add-task-name")
      .querySelector("input");
    expect(addTaskName).toBeInTheDocument();
    if (addTaskName)
      fireEvent.change(addTaskName, {
        target: { value: "Test Task" },
      });

    const addTaskDescription = screen
      .getByTestId("add-task-description")
      .querySelector("input");
    if (addTaskDescription)
      fireEvent.change(addTaskDescription, {
        target: { value: "Test Description" },
      });
    const addTaskCategory = screen
      .getByTestId("add-task-category")
      .querySelector("input");
    if (addTaskCategory)
      fireEvent.change(addTaskCategory, {
        target: { value: "Test Category" },
      });
    const addTaskButton = screen.getByTestId("add-task-button");
    fireEvent.click(addTaskButton);
    expect(addTaskButton).toBeDisabled();
  });
});
