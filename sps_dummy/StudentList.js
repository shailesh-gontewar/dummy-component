import React, { useEffect, useState } from "react"
import avatar5 from "../../assets/images/users/avatar-5.jpg"
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar"
import withRouter from "components/Common/withRouter"
import { isEmpty, map } from "lodash"
import * as moment from "moment"
import { Badge, Col, Container, Row, Table } from "reactstrap"
import { AttendanceApi } from "apis/AttendanceApi"

const StudentList = () => {
  const [studentList, setStudentList] = useState([])
  const [absent, setAbsent] = useState([])
  const [present, setPresent] = useState(null)
  const [show, setShow] = useState(true)
  // console.log(absent)
  // console.log(present)

  useEffect(() => {
    let data = {
      st_class: "x",
      st_sec: "JDB",
      attendence_date: "2023-04-17",
    }
    AttendanceApi.getAllStudentList(data)
      .then(res => {
        setStudentList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  let onPresent = data => {
    let present = {
      ...data,
      is_present: true,
      teacher_code: "00029",
      attendence_date: "2023-04-21",
    }
    setPresent(present)
    AttendanceApi.takeStudentAttendance(present).then(res => {
      window.location.href = "/attendance"
      console.log(res.data.msg)
    })
  }
  let onAbsent = data => {
    let absent = {
      ...data,
      is_absent: true,
      teacher_code: "00029",
      attendence_date: "2023-04-21",
    }
    setAbsent(absent)
    AttendanceApi.takeStudentAttendance(absent).then(res => {
      window.location.href = "/attendance"
      console.log(res.data.msg)
    })
  }

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col md={11} className="m-auto">
            <form className="app-search bg-light p-0 d-lg-block ">
              <div className="position-relative">
                <input
                  // onChange={e => {
                  //   setValue(e.target.value)
                  //   onChange(e.target.value)
                  // }}
                  id="search-bar-0"
                  type="text"
                  className="form-control"
                  placeholder="Search Student..."
                  // value={value || ""}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="mt-4">
              <PerfectScrollbar style={{ height: "310px" }}>
                <div className="table-responsive">
                  <Table className="table table-sm m-0 table-nowrap align-center text-center table-borderless">
                    <thead className="">
                      <tr>
                        {/* <th className="p-2 " scope="col" style={{ width: "100px" }}></th> */}
                        <th className="p-2 " scope="col">
                          Roll Number
                        </th>
                        <th className="p-2" scope="col">
                          Name
                        </th>
                        <th className="p-2" scope="col">
                          Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList?.student?.map((stu, index) => (
                        <tr key={index}>
                          {/* <td>
                            <img
                            src={avatar5}
                            alt="s"
                            className="rounded-circle avatar-xs"
                          />
                            <div className="avatar-xs">
                              <span className="avatar-title  bg-light rounded-circle"></span>
                            </div>
                          </td> */}
                          {/* <td></td> */}
                          <td className="p-0"> {stu.st_code}</td>
                          <td className="p-0">
                            <h5 className="text-truncate font-size-13">
                              <Link
                                to={`/single-student/${stu.st_code}`}
                                className="text-secondary "
                              >
                                {stu.st_name}
                              </Link>
                            </h5>
                          </td>

                          <td className="p-0">
                            <div className="d-flex justify-content-center gap-3 ">
                              <Link
                                to="#"
                                className="text-success"
                                onClick={() => onPresent(stu)}
                              >
                                <span
                                  className="mdi mdi-check mdi-24px "
                                  id="present"
                                ></span>
                              </Link>
                              <Link
                                to="#"
                                // className={
                                //   // stu?.is_present == true ? ("text-secondary"):("text-danger")
                                //   stu.is_present ? ("text-danger") : ("text-secondary")

                                // }
                                className={
                                  stu.is_present
                                    ? "text-danger"
                                    : "text-secondary"
                                }
                                // onClick={() => onAbsent(stu)}
                                onClick={() => console.log(stu.is_present)}
                              >
                                <span
                                  className="mdi mdi-window-close mdi-24px"
                                  id="absent"
                                >
                                  {stu.is_present == "false"
                                    ? "Present"
                                    : "Absent"}
                                </span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </PerfectScrollbar>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default withRouter(StudentList)
