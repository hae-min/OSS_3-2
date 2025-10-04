import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_BASE = "https://68e1151593207c4b47963236.mockapi.io/employee";

const EmpEdit = () => {
  const { empid } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);
  const [experienceYears, setExperienceYears] = useState(0);     // ✅ 추가
  const [careerLevel, setCareerLevel] = useState("Junior");      // ✅ 추가
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    // ✅ 슬래시(/) 추가
    fetch(`${API_BASE}/${empid}`)
      .then((res) => res.json())
      .then((resp) => {
        setId(resp.id ?? "");
        setName(resp.name ?? "");
        setEmail(resp.email ?? "");
        setPhone(resp.phone ?? "");
        setActive(resp.active ?? true);
        setExperienceYears(resp.experienceYears ?? 0);   
        setCareerLevel(resp.careerLevel ?? "Junior");    
      })
      .catch((err) => console.log(err.message));
  }, [empid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const empdata = {
      name,
      email,
      phone,
      active,
      experienceYears,   
      careerLevel       
    };

   
    fetch(`${API_BASE}/${empid}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then(() => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>

              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled className="form-control" />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        onMouseDown={() => setValidation(true)}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                      />
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                  <div className="form-group">
                  <label>Phone</label>
                  <input
                  type="tel"
                  inputMode="numeric"        // 모바일에서 숫자 키패드
                  maxLength={11}             // 최대 11자리
                  pattern="[0-9]{11}"        // 정규식: 숫자 11자리
                  title="전화번호는 숫자 11자리여야 합니다 (예: 01012345678)" // 에러 메시지
                  required                   // 필수 입력
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  />
                </div>
              </div>


                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>

                  {/* ✅ 추가된 필드들 */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Experience (years)</label>
                      <input
                        type="number"
                        min="0"
                        value={experienceYears}
                        onChange={(e) =>
                          setExperienceYears(
                            e.target.value === "" ? 0 : Number(e.target.value)
                          )
                        }
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Career Level</label>
                      <select
                        value={careerLevel}
                        onChange={(e) => setCareerLevel(e.target.value)}
                        className="form-control"
                        required
                      >
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btnSUCCESS btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger ms-2">
                        Back
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;

