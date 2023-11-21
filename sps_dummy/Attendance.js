import React, { useEffect, useState } from "react"
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
// import StudentsList from "../Teacher/TeacherList/students-list"
import StudentList from "./StudentList"
import { Link } from "react-router-dom"
import PerfectScrollbar from "react-perfect-scrollbar"
import { AttendanceApi } from "apis/AttendanceApi"

const Attendance = props => {
  const { studentList } = props
  const [absent, setAbsent] = useState([])
  const [present, setPresent] = useState(null)
  const [show, setShow] = useState(true)
  const [classSelect, setClassSelect] = useState(JSON.parse(localStorage.getItem('classselect')))

  // useEffect(()=>{
  //   const item=JSON.parse(localStorage.getItem('classselect'))
  //   if(item){
  //     setClassSelect(item)
  //   }
  // },[])

  console.log(classSelect)

  let onPresent = data => {
    let present = {
      ...data,
      is_present: true,
      teacher_code: "00029",
      attendence_date: "2023-04-24",
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
      attendence_date: "2023-04-24",
    }
    setAbsent(absent)
    AttendanceApi.takeStudentAttendance(absent).then(res => {
      window.location.href = "/attendance"
      console.log(res.data.msg)
    })
  }

  return (
    <React.Fragment>
      <Col xl={8}>
        <Row>
          <Col lg={4}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap justify-content-center align-items-center ">
                  <div className="me-3">
                    <h5 className="text-muted mb-2">Total</h5>
                    <h4 className="mb-0">{studentList.total_student}</h4>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="me-3 ">
                    <h5 className="text-muted mb-2">Present</h5>
                    <h4 className="mb-0 ">{studentList.present}</h4>
                  </div>
                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <div className="me-3">
                    <h5 className="text-muted mb-2">Absent</h5>
                    <h4 className="mb-0 ">{studentList.absent}</h4>
                  </div>
                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
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
                                        stu.is_absent
                                          ? "text-danger"
                                          : "text-secondary"
                                      }
                                      onClick={() => onAbsent(stu)}
                                      // onClick={() => console.log(stu.is_present)}
                                    >
                                      <span
                                        className="mdi mdi-window-close mdi-24px"
                                        id="absent"
                                      >
                                        
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
            <hr className="mb-4" />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default Attendance
