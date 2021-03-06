import React, { useEffect, useState } from "react";
import axios from "axios";
import { studentsUrl } from "../../utils/url";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function Student() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    const response = await axios.get(studentsUrl);
    // console.log(response.data);
    setStudent(response.data);
  };
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <Table striped bordered hover>
      <thead>
        <th>SlNo</th>
        <th>Admission No</th>
        <th>Name</th>
        <th>Department</th>
        <th>Year of Admission</th>
        <th>DOB</th>
        <th>SSLC RegNo</th>
        <th>Gender</th>
        <th>Father's Name</th>
        <th>Address</th>
        <th>Pincode</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
        <th style={{ width: "2rem" }}>
          <Link to="/students/new">
            <Button variant="success">add</Button>
          </Link>
        </th>
      </thead>
      <tbody>
        {student.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.admNo}</td>
            <td>{data.studentName}</td>
            <td>{data.department}</td>
            <td>{data.yearOfAdm}</td>
            <td>{data.dob}</td>
            <td>{data.sslcRegNo}</td>
            <td>{data.gender}</td>
            <td>{data.fatherName}</td>
            <td>{data.address}</td>
            <td>{data.pincode}</td>
            <td>{data.mobile}</td>
            <td>{data.email}</td>

            <td>
              <Link to={`/students/${data._id}`}>
                <Button variant="primary">Edit</Button>
              </Link>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5001/students/${data._id}`)
                    .then((res) => {
                      // console.log(res);
                      alert("deleted");
                      refreshPage();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Student;
