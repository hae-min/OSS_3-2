import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = "https://68e1151593207c4b47963236.mockapi.io/employee";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, setEmpdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/${empid}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((resp) => {
        setEmpdata(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErr(error.message);
        setLoading(false);
      });
  }, [empid]);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">Loading...</div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body text-danger">Error: {err}</div>
          <div className="card-footer">
            <Link className="btn btn-danger" to="/">Back to List</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!empdata) return null;

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Employee Details</h2>
        </div>

        <div className="card-body">
          <h3 className="mb-3">
            <b>{empdata.name}</b> <small className="text-muted">({empdata.id})</small>{" "}
            {typeof empdata.active === "boolean" && (
              <span
                className={`badge ms-2 ${empdata.active ? "bg-success" : "bg-secondary"}`}
                title="Active status"
              >
                {empdata.active ? "Active" : "Inactive"}
              </span>
            )}
          </h3>

          <p className="mb-1">
            <b>Email:</b> {empdata.email}
          </p>
          <p className="mb-1">
            <b>Phone:</b> {empdata.phone}
          </p>

 
          <p className="mb-1">
            <b>Experience (years):</b> {empdata.experienceYears}
          </p>
          <p className="mb-3">
            <b>Career Level:</b> {empdata.careerLevel}
          </p>

          <Link className="btn btn-danger" to="/">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmpDetail;

