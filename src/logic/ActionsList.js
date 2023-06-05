export function deleteItem(itemIndex, task) {
  const nuevaLista = task.map((element) => {
    if (element.tasks) {
      element.tasks = element.tasks.filter((tarea) => tarea.id !== itemIndex);
    }
    return element;
  });
  return nuevaLista;
}

export function addItemToList(listIndex, name, task) {
  const id = newIdToTask(listIndex, task);
  const newTask = {
    id: id + 1,
    item: name,
    done: false,
  };
  task[listIndex].tasks.push(newTask);
  const updatedList = [...task];
  return updatedList;
}

export const changeStatusTask = (itemIndex, list) => {
  const newList = list.map((element) => {
    if (element.tasks) {
      element.tasks = element.tasks.map((task) => {
        if (task.id === itemIndex) {
          task.done = !task.done;
        }
        return task;
      });
    }
    return element;
  });
  return newList;
};

const newIdToTask = (listIndex, task) => {
  var idMaxTasks = 0;
  task[listIndex].tasks.forEach((element) => {
    if (element.id > idMaxTasks) {
      idMaxTasks = element.id;
    }
  });
  return idMaxTasks;
};
