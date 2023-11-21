import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Card, CardBody, Col, Table } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "flatpickr/dist/themes/material_blue.css";
import { AttendanceContext } from "../../../context/attendanceContext";
import LeftSidebar from "./LeftSidebar";
import HeaderPopup from "./HeaderPopup";
import { useDispatch } from "react-redux";
import {
  getClassSection,
  getStudentList,
  saveAttendance,
} from "../../../actions/school_user/Attenadance";
import Loader from "../../Loader/Loader";
import Swal from "sweetalert2";

const Attendance = () => {
  const token = localStorage.getItem("token");
  const {
    s_data,
    studentList,
    isLoading,
    data,
    setIsLoading,
    session_id,
    classSelect,
    school_id,
    emp_id,
    attendence_date,
  } = useContext(AttendanceContext);

  console.log(classSelect);
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const keys = ["student_name", "student_code"];
  const handlesearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setStudents(studentList?.payload);
  }, [studentList?.payload]);
  const handleCheckboxChange = (studentId) => {
    const updatedStudents = students.map((student) => {
      if (student.student_id === studentId) {
        student.is_present = !student.is_present;
      }
      return student;
    });

    setStudents(updatedStudents);
  };
  const makeAddendance = async () => {
    let student_data = students.map((s) => {
      return { student_id: s.student_id, is_present: s.is_present, id: s.id };
    });

    let save_data = {
      fk_academic: session_id,
      student_attendance_id: "",
      fk_section: classSelect,
      fk_school: school_id,
      school_emp_id: emp_id,
      attendance_date: attendence_date,
      student_data: student_data,
    };

    try {
      let response = await dispatch(saveAttendance(token, save_data));
      if (response.status === 200) {
        await Swal.fire({
          text: response.msg,
          icon: "success",
          imageAlt: "success image",
          confirmButtonText: "OK",
        });
      } else if (response.status === 403) {
        await Swal.fire({
          text: response.msg,
          icon: "error",
          imageAlt: "error image",
          confirmButtonText: "OK",
        });
      }
      await dispatch(getClassSection(token, s_data));
      await dispatch(getStudentList(token, data));
    } catch (error) {
      console.error("Error sending roll numbers:", error);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={8}>
              <Row>
                <HeaderPopup />
              </Row>
              <Card>
                <CardBody>
                  <Container fluid>
                    <Row>
                      <Col md={11} className="m-auto">
                        <form className="p-0">
                          <div className="input-group ">
                            <input
                              className="form-control bg-light  border"
                              type="search"
                              value={search || ""}
                              onChange={handlesearch}
                              id="search"
                              placeholder="Search by Student code or Name"
                            />
                            <span className="input-group-append">
                              <button className="btn ms-n5" type="button">
                                <i className="fa fa-search"></i>
                              </button>
                            </span>
                          </div>
                        </form>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} className="m-auto">
                        <div className="mt-4">
                          {isLoading ? <Loader /> : ""}
                          {students?.length === 0 ? (
                            <div
                              style={{ height: "310px" }}
                              className="align-center text-center"
                            >
                              {studentList?.msg ? (
                                <h3 className="text-danger mt-5 ">
                                  {studentList?.msg} !
                                </h3>
                              ) : (
                                <h3 className="text-primary mt-5 ">
                                  Students Not Found !
                                </h3>
                              )}
                            </div>
                          ) : (
                            !isLoading && (
                              <PerfectScrollbar
                                style={{
                                  height: "310px",
                                  paddingRight: "16px",
                                  boxSizing: "content-box",
                                }}
                                options={{ suppressScrollX: true }}
                              >
                                <div className="table-responsive">
                                  <Table className="table-sm  table-nowrap align-center text-center table-borderless">
                                    <thead className="">
                                      <tr className="">
                                        <th className="p-2" scope="col">
                                          <h6>Student Code </h6>
                                        </th>
                                        <th className="p-2" scope="col">
                                          <h6>Name</h6>
                                        </th>
                                        <th className="p-2" scope="col">
                                          <h6>Present</h6>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {students
                                        ?.filter((stu) =>
                                          keys.some((key) =>
                                            stu[key]
                                              ?.toLowerCase()
                                              .includes(search?.toLowerCase())
                                          )
                                        )
                                        .map((stu, index) => (
                                          <tr key={index}>
                                            <td className="p-0 text-left">
                                              {stu.student_code}
                                            </td>
                                            <td className="text-left">
                                              <h6 className="text-truncate font-size-13 ">
                                                {stu.student_name}
                                              </h6>
                                            </td>
                                            <td className="p-0">
                                              <div className="d-flex align-items-center justify-content-center">
                                                <label className="custom-switch pr-2">
                                                  <input
                                                    type="checkbox"
                                                    className="custom-switch-input"
                                                    name="status"
                                                    checked={stu.is_present}
                                                    onChange={() =>
                                                      handleCheckboxChange(
                                                        stu.student_id
                                                      )
                                                    }
                                                  />
                                                  <span className="custom-switch-indicator"></span>
                                                </label>
                                                {stu.is_present ? (
                                                  <b>Yes</b>
                                                ) : (
                                                  <b>No</b>
                                                )}
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </Table>
                                </div>
                              </PerfectScrollbar>
                            )
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="row d-flex justify-content-end">
                      <button
                        type="button"
                        className="mt-1 btn px-5"
                        onClick={() => makeAddendance()}
                        style={{
                          backgroundColor: "#42a5f5",
                          color: "#fff",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <LeftSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Attendance;
