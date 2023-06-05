import { useContext, useEffect, useState } from "react";
import { TaskListContext } from "../contexts/TaskListContext";
import { addItemToList, deleteItem } from "../logic/ActionsList";

export const NewList = () => {
  const [task, setTask] = useState([]);
  const [isCreated, setCreateList] = useState(false);
  const [nameList, setNameList] = useState("");
  const [newItem, setNewItem] = useState("");
  const { getId, addNewList, updateListTasks } = useContext(TaskListContext);

  const handleNameList = (e) => {
    setNameList(e.target.value);
  };

  const handleNewItem = (e) => {
    setNewItem(e.target.value);
  };

  const createList = () => {
    if (isCreated) {
      return;
    }
    const newList = {
      id: getId(),
      title: nameList,
      tasks: [],
    };
    setTask([newList]);
    setCreateList(true);
    addNewList(newList);
  };

  const addItem = (listIndex) => {
    const updateList = addItemToList(listIndex, newItem, task);
    setTask(updateList);
    setNewItem("");
    updateListTasks(updateList[listIndex]);
  };

  const itemDelete = (itemIndex) => {
    const updatedList = deleteItem(itemIndex, task);
    setTask(updatedList);
    updateListTasks(updatedList);
  };

  return (
    <section className="new-task">
      <div className="container">
        <h1>New List</h1>
      </div>
      <div className="container-sm text-center">
        <div className="row justify-content-md-center ">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name to list..."
                aria-label="New List"
                onChange={handleNameList}
                value={nameList}
              />
              <button
                onClick={createList}
                type="button"
                className="btn btn-success"
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isCreated ? (
        <>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      task
                    </span>
                    <input
                      type="text"
                      className="btn-new-task form-control"
                      placeholder="name to task..."
                      aria-label="new task"
                      aria-describedby="basic-addon1"
                      onChange={handleNewItem}
                      value={newItem}
                    />
                    <button
                      onClick={() => addItem(0)}
                      type="button"
                      className="btn btn-primary"
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive-sm">
              <table className="table table-sm align-middle table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col ">
                      <h2>task</h2>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {task &&
                    task.map((list, index) => {
                      const taskList = list.tasks;
                      const listTasks = taskList.map((values) => {
                        return (
                          <tr
                            key={values.id}
                            className={`${values.done ? "table-success" : ""}`}
                          >
                            <td scope="row">{values.item}</td>
                            <td className=" col-1">
                              <button
                                className={`btn btn-${
                                  values.done ? "success" : "warning"
                                }`}
                              >
                                <i className="bi bi-check-square"></i>
                              </button>
                            </td>
                            <td className=" col-1">
                              <button
                                onClick={() => itemDelete(values.id)}
                                className="btn btn-danger"
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      });
                      return listTasks;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </section>
  );
};
