import React, { createContext, useMemo, useState } from "react";

export const TaskListContext = createContext();

const tokenListTasks = "listTasks";

function TaskListContextProvider({ children }) {
  const [listTasks, setListTasks] = useState(() => {
    const data = JSON.parse(localStorage.getItem(tokenListTasks));
    return data ? data : [];
  });

  const addNewList = (task) => {
    const insertList = [...listTasks, task];
    setListTasks(insertList);
    localStorage.setItem(tokenListTasks, JSON.stringify(insertList));
  };

  const updateListTasks = (updateList) => {
    listTasks.forEach((element) => {
      if (element.id === updateList.id) {
        element = updateList;
      }
    });
    localStorage.setItem(tokenListTasks, JSON.stringify(listTasks));
  };

  const deleteList = (id) => {
    const newList = listTasks.filter((item) => item.id != id);
    setListTasks(newList);
    localStorage.setItem(tokenListTasks, JSON.stringify(newList));
  };

  const getId = () => {
    var idMaxTasks = 0;
    listTasks.forEach((element) => {
      if (element.id > idMaxTasks) {
        idMaxTasks = element.id;
      }
    });
    return idMaxTasks + 1;
  };

  const clearLists = () => {
    setListTasks([]);
    localStorage.removeItem(tokenListTasks);
  };

  const TaskListContextValue = useMemo(
    () => ({
      listTasks,
      getId,
      addNewList,
      updateListTasks,
      deleteList,
      clearLists,
    }),
    [listTasks, getId, addNewList, updateListTasks, deleteList, clearLists]
  );

  return (
    <TaskListContext.Provider value={TaskListContextValue}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListContextProvider;
