import TaskTemplate from "components/templates/taskTemplate/taskTemplate";
import { TaskWithColor } from "entities/task/task.types";
import { updateTask } from "features/appSlice";
import { selectAllTasks, selectCategories } from "features/selectors";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";

const TaskScreen = () => {
  const savedTask = useAppSelector(selectAllTasks);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [tasks, setTasks] = useState<TaskWithColor[]>([]);
  const [showCompletedTask, setShowCompletedTask] = useState(false);

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

  return (
    <TaskTemplate
      tasksWithColor={tasks}
      onclick={hanldeFinishTask}
      categories={categories}
      showCompletedTask={showCompletedTask}
      setShowCompletedTask={setShowCompletedTask}
    />
  );
};
export default TaskScreen;
