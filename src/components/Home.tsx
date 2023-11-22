import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";

export interface DataProps {
  id?: string;
  name: string;
  username?: string;
  email: string;
  phone: string;
  website?: string;
}

export const Home = () => {
  const [data, setData] = useState<DataProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (id:string) => {
    const confirmDelete = window.confirm("Would you like to Delete?");
    if (confirmDelete)
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      {/* List of users */}

      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <h1>List of Users</h1>
        <div className="w-75 rounded bg-white border shadow p-4">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Id:</th>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index: number) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>
                    <Link to={`/read/${data.id}`}>
                      <button className="btn btn-sm btn-secondary me-2">
                        Read
                      </button>
                    </Link>
                    <Link to={`/update/${data.id}`}>
                      <button className="btn btn-sm btn-primary me-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(data.id as string)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
