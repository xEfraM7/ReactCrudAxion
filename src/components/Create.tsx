import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface ValuesProps {
  name: string;
  email: string;
  phone: string;
}



export const Create = () => {
  const [values, setValues] = useState<ValuesProps>({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axios
      .post("http://localhost:3000/users", values)
      .then((res) => {
        console.log(values);
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(ev) => setValues({ ...values, name: ev.target.value })}
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
  );
};
