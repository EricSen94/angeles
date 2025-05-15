import TaskTemplate from "components/templates/taskTemplate/taskTemplate";
import { TaskWithColor } from "entities/task/task.types";
import { addTask, updateTask } from "features/appSlice";
import { selectAllTasks, selectCategories } from "features/selectors";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";

const TaskScreen = () => {
  const savedTask = useAppSelector(selectAllTasks);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [tasks, setTasks] = useState<TaskWithColor[]>([]);
  const [showCompletedTask, setShowCompletedTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const tasksWithColor = savedTask.map((task) => {
      const category = categories.find((cat) => cat.id === task.categoryId);
      return {
        ...task,
        color: category ? category.color : "#000000",
      };
    });
    const filteredTasks = tasksWithColor.filter(
      (task) => task.completed === showCompletedTask
    );
    setTasks(filteredTasks);
  }, [savedTask, showCompletedTask, categories]);

  const hanldeFinishTask = (taskId: string) => {
    dispatch(
      updateTask({
        id: taskId,
        completed: true,
      })
    );
  };
  const handleAddTask = (
    name: string,
    category: string,
    description: string
  ) => {
    dispatch(addTask({ title: name, categoryId: category, description }));
  };
  const hanldeOpenModal = () => {
    setShowAddTask(true);
  };
  const hanldeCloseModal = () => {
    setShowAddTask(false);
  };
  return (
    <TaskTemplate
      tasksWithColor={tasks}
      finishTask={hanldeFinishTask}
      categories={categories}
      showCompletedTask={showCompletedTask}
      setShowCompletedTask={setShowCompletedTask}
      addTask={handleAddTask}
      openModal={hanldeOpenModal}
      showAddTask={showAddTask}
      hideModal={hanldeCloseModal}
    />
  );
};
export default TaskScreen;
