import { useContext, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { TaskListContext } from "../contexts/TaskListContext";
import {
  addItemToList,
  changeStatusTask,
  deleteItem,
} from "../logic/ActionsList";

export const List = () => {
  let { listId } = useParams();
  const { listTasks, updateListTasks, deleteList } =
    useContext(TaskListContext);
  const [newItem, setNewItem] = useState("");

  const [list, setList] = useState([
    listTasks.find((item) => listId == item.id),
  ]);

  const handleNewItem = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = (listIndex) => {
    const updateList = addItemToList(listIndex, newItem, list);
    setList(updateList);
    setNewItem("");
    updateListTasks(updateList[listIndex]);
  };

  const statusTask = (indexTask) => {
    const updatedList = changeStatusTask(indexTask, list);
    setList(updatedList);
    updateListTasks(updatedList[0]);
  };

  const itemDelete = (itemIndex) => {
    const updatedList = deleteItem(itemIndex, list);
    setList(updatedList);
    updateListTasks(updatedList);
  };

  return (
    <>
      {list && list !== undefined ? (
        <div className="container-sm">
          <div className="row">
            <div className="d-flex align-items-center gap-3 col-md-6">
              <h1 className="list-title">📖{list[0].title}</h1>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#deleteListModal"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
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
                    placeholder="new task"
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
                  <th scope="col" className="task-header">
                    Task
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {list[0].tasks.map((values) => {
                  return (
                    <tr
                      key={values.id}
                      className={`${values.done ? "table-success" : ""}`}
                    >
                      <td scope="row" className="task-item">
                        {values.item}
                      </td>
                      <td className="col-1">
                        <button
                          onClick={() => statusTask(values.id)}
                          className={`btn btn-${
                            values.done ? "success" : "warning"
                          }`}
                        >
                          <i className="bi bi-check-square"></i>
                        </button>
                      </td>
                      <td className="col-1">
                        <button
                          onClick={() => itemDelete(values.id)}
                          className="btn btn-danger"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div
            className="modal fade"
            id="deleteListModal"
            tabIndex="-1"
            aria-labelledby="deleteListModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="deleteListModal">
                    ⚠️Warning
                  </h1>
                </div>
                <div className="modal-body">
                  The action will be irreversible. Are you sure to delete this
                  lists?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <Link to="/" className="text-decoration-none text-white">
                    <button
                      onClick={() => deleteList(listId)}
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="no-lists">No have lists</h1>
      )}
    </>
  );
};
