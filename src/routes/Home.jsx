import { useContext } from "react";
import { TaskListContext } from "../contexts/TaskListContext";
import { Link } from "react-router-dom";

import "./home.css";
export const Home = () => {
  const { listTasks, clearLists } = useContext(TaskListContext);
  return (
    <>
      <header className="container-sm text-center">
        <div className="row">
          <div className="d-flex align-items-center gap-3 col-md-6">
            <h1>
              <i className="bi bi-github">
                <code> by leoneldc</code>
              </i>
            </h1>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteAllListsModal"
            >
              <i className="bi bi-backspace"></i>
            </button>
          </div>
        </div>
      </header>

      <div
        className="modal fade"
        id="deleteAllListsModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                ⚠️Warning
              </h1>
            </div>
            <div className="modal-body">
              The action will be irreversible. Are you sure to delete all the
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
              <button
                type="button"
                onClick={clearLists}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ol className="list-group list-list-group-flush">
          {listTasks.length === 0 || listTasks === undefined ? (
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <h2>not have lists</h2>
            </li>
          ) : (
            listTasks.map((item, index) => {
              return (
                <Link to={`list/${item.id}`} key={index}>
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-inline-block text-truncate">
                      <h3>{item.title}</h3>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      {item.tasks.length}
                    </span>
                  </li>
                </Link>
              );
            })
          )}
        </ol>
      </div>
    </>
  );
};
