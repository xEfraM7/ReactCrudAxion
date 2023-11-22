import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ValuesProps } from "./Create";

export const Update = () => {
  const [values, setValues] = useState<ValuesProps>({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${params.id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axios
      .put(`http://localhost:3000/users/${params.id}`, values)
      .then((res) => {
        console.log(values);
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Update</h1>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Update a User</h1>
          <form noValidate onSubmit={(ev) => handleSubmit(ev)}>
            <div className="mb-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                value={values.name}
                onChange={(ev) =>
                  setValues({ ...values, name: ev.target.value })
                }
              />
              <br />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={values.email}
                onChange={(ev) =>
                  setValues({ ...values, email: ev.target.value })
                }
              />
              <br />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Phone:</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter Phone"
                value={values.phone}
                onChange={(ev) =>
                  setValues({ ...values, phone: ev.target.value })
                }
              />
              <br />
            </div>
            <br />
            <button className="btn btn-success">Submit</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
