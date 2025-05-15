import { render, screen, fireEvent, within, cleanup } from "test-utils";
import { CategoryList } from "./testParaStore";

describe("CategoryList component", () => {
  afterEach(() => {
    cleanup();
  });
  beforeAll(() => {
    cleanup();
  });

  test("al inicio sólo muestra el formulario de categorías", () => {
    render(<CategoryList />);

    expect(screen.getByTestId("category-list-container")).toBeInTheDocument();

    expect(screen.getByTestId("category-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("category-color-input")).toBeInTheDocument();
    expect(screen.getByTestId("add-category-button")).toBeInTheDocument();

  });
  test("inicializa el input de color en #000000 y permite cambiarlo", () => {
    render(<CategoryList />);

    const colorInput = screen.getByTestId(
      "category-color-input"
    ) as HTMLInputElement;
    expect(colorInput.value).toBe("#000000");
    fireEvent.change(colorInput, { target: { value: "#ff0000" } });

    expect(colorInput.value).toBe("#ff0000");
  });
  test("añade una categoría y muestra sección de tareas con botón deshabilitado", () => {
    render(<CategoryList />);

    const catWrapper = screen.getByTestId("category-name-input");
    const catInput = within(catWrapper).getByRole("textbox");
    fireEvent.change(catInput, { target: { value: "Work" } });

    fireEvent.click(screen.getByTestId("add-category-button"));

    expect(screen.getAllByTestId("cat-row-Work")[0]).toBeInTheDocument();

    expect(screen.getByText("Tareas")).toBeInTheDocument();

    const addTaskBtn = screen.getByTestId("add-task-button");
    expect(addTaskBtn).toBeDisabled();
  });

  test("añade una categoría y la elimina", () => {
    render(<CategoryList />);

    const catWrapper = screen.getByTestId("category-name-input");
    const catInput = within(catWrapper).getByRole("textbox");
    fireEvent.change(catInput, { target: { value: "Work" } });

    fireEvent.click(screen.getByTestId("add-category-button"));

    expect(screen.getAllByTestId("cat-row-Work")[0]).toBeInTheDocument();
    expect(screen.getByText("Tareas")).toBeInTheDocument();
    const leng = screen.getAllByTestId("cat-row-Work").length;
    fireEvent.click(screen.getAllByTestId("cat-row-button-Work")[0]);

    expect(screen.getAllByTestId("cat-row-Work").length).toBe(leng - 1);
  });

  test("permite crear una tarea y la muestra en la lista", () => {
    render(<CategoryList />);

    const catInputWrapper = screen.getByTestId("category-name-input");
    const catInput = within(catInputWrapper).getByRole("textbox");
    fireEvent.change(catInput, { target: { value: "Work" } });
    fireEvent.click(screen.getByTestId("add-category-button"));

    const titleWrapper = screen.getByTestId("task-title-input");
    const titleInput = within(titleWrapper).getByRole("textbox");
    fireEvent.change(titleInput, { target: { value: "Task Title" } });

    const descWrapper = screen.getByTestId("task-description-input");
    const descInput = within(descWrapper).getByRole("textbox");
    fireEvent.change(descInput, { target: { value: "Task Desc" } });

    const addTaskBtn = screen.getByTestId("add-task-button");
    expect(addTaskBtn).toBeEnabled();

    fireEvent.click(addTaskBtn);
    expect(screen.getByText("Task Title")).toBeInTheDocument();
    expect(screen.getByText("Task Desc")).toBeInTheDocument();
  });

  test("permite crear una tarea y eliminarla", () => {
    render(<CategoryList />);

    const catInputWrapper = screen.getByTestId("category-name-input");
    const catInput = within(catInputWrapper).getByRole("textbox");
    fireEvent.change(catInput, { target: { value: "Work" } });
    fireEvent.click(screen.getByTestId("add-category-button"));

    const titleWrapper = screen.getByTestId("task-title-input");
    const titleInput = within(titleWrapper).getByRole("textbox");
    fireEvent.change(titleInput, { target: { value: "Task Title" } });

    const descWrapper = screen.getByTestId("task-description-input");
    const descInput = within(descWrapper).getByRole("textbox");
    fireEvent.change(descInput, { target: { value: "Task Desc" } });

    const addTaskBtn = screen.getByTestId("add-task-button");
    expect(addTaskBtn).toBeEnabled();

    fireEvent.click(addTaskBtn);
    expect(screen.getByText("Task Title")).toBeInTheDocument();
    expect(screen.getByText("Task Desc")).toBeInTheDocument();

    const deleteTaskBtn = screen.getByTestId("task-delete-button-Task Title");
    fireEvent.click(deleteTaskBtn);

    expect(screen.queryByTestId("Task Title")).toBeNull();
  });

  test("permite seleccionar una categoría en el Select de tareas", async () => {
    render(<CategoryList />);

    const nameInput = within(
      screen.getByTestId("category-name-input")
    ).getByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Work" } });
    fireEvent.click(screen.getByTestId("add-category-button"));
    fireEvent.change(nameInput, { target: { value: "Home" } });
    fireEvent.click(screen.getByTestId("add-category-button"));

    const combobox = screen.getByRole("combobox");
    fireEvent.mouseDown(combobox);

    const options = await screen.findAllByTestId(/^task-select-option-/);

    const homeOption = options.find((opt) => opt.textContent === "Home")!;
    expect(homeOption).toBeInTheDocument();

    fireEvent.click(homeOption);

    expect(combobox).toHaveTextContent("Home");
  });
});
