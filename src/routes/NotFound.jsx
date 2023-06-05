import { Link } from "react-router-dom";
import "./notFound.css";

export const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center not-found">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="btn btn-outline-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};