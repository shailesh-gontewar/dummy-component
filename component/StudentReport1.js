import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  FormGroup,
  InputGroup,
  CardTitle,
  Input,
  Table,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import Knob from "../AllCharts/knob/knob"
import { useLocation } from "react-router-dom"

import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { AttendanceApi } from "apis/AttendanceApi"
import img1 from "../../assets/image/pre.png"
import img2 from "../../assets/image/abs.png"
import img4 from "../../assets/image/tot.png"
import { classApi } from "apis/ClassListApi"
import ReactHTMLTableToExcel from "react-html-table-to-excel"

const StudentReport = () => {
  //meta title
  document.title = "Student Attendance"
  const currentDate = new Date()
  const formattedDate = currentDate.toISOString().slice(0, 10)
  //  take data from localstorage
  const savedData = JSON.parse(localStorage.getItem("myattendance"))
  const sessionClass= sessionStorage.getItem('classselect');
  console.log(sessionClass)
  
  var myValue = JSON.parse(localStorage.getItem("User"))
  let teacher_code = myValue?.payload?.t_code ? myValue?.payload?.t_code : ""
  let get_class = myValue?.payload?.home_class
    ? myValue?.payload?.home_class
    : ""
  let get_section = myValue?.payload?.home_sec ? myValue?.payload?.home_sec : ""
  let class_teacher_classwise = `${get_class} ${get_section}`
  const [studentList, setStudentList] = useState([])
  // console.log(studentList,'stu')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(formattedDate)
  let attendanceDate = studentList?.attendence_date
  const [classList, setClassList] = useState([])
  let classListOption = classList?.filter((list, index, arr) => {
    return index === arr.findIndex(d => d.label === list.label)
  })
  //student Report
  const [studentDetail, setStudentDetail] = useState([])
  let mon_average = studentDetail?.payload?.month_average.toFixed(2)
  let sec_average = studentDetail?.payload?.session_average.toFixed(2)
  const location = useLocation()
  const studentData = location.state
  useEffect(() => {
    AttendanceApi.getStudentAttendanceDetails(studentData)
      .then(res => {
        setStudentDetail(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [studentData])
  //student Report
  const [classSelect, setClassSelect] = useState(class_teacher_classwise)
  function convertDate(data) {
    const dateString = data
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    return formattedDate
  }
  let handleclassselect = e => {
    setIsLoading(true)
    setStudentList([])
   
    setClassSelect(e.target.value)
  }
  const strClass= sessionClass
  const sess_class_sec = strClass.split(" ")
  let session_class = sess_class_sec[0]
  let session_section = sess_class_sec[1]
console.log(session_class,session_section ,' session class')
  const str = classSelect
  const parts = str.split(" ")
  let sel_class = parts[0]
  let sel_section = parts[1]
  let st_class = sel_class ? sel_class : session_class
  let st_sec = sel_section ? sel_section : session_section

  useEffect(() => {
    classApi
      .getAllClass()
      .then(res => {
        // setClassList(res.data)
        if (myValue == "Admin") {
          setClassList(
            res?.data?.section_list?.map(cl => {
              return {
                value: cl.UID,
                label: `${cl.st_class} ${cl.st_sec}`,
              }
            })
          )
        }
      })
      .catch(err => {
        console.log(err)
      })
    if (myValue != "Admin") {
      setClassList(
        myValue?.teacher_subject?.map(cl => {
          return {
            value: cl.uid,
            label: `${cl.st_class} ${cl.st_sec}`,
          }
        })
      )
    }
  }, [])
  const handleDateChange = data => {
    setIsLoading(true)
    setStudentList([])
    const date = new Date(data)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`
    setSelectedDate(formattedDate)
  }

  let data = {
    st_class,
    st_sec,
    attendence_date: selectedDate,
  }
  function getList(data) {
    AttendanceApi.getAllStudentList(data)
      .then(res => {
        if (savedData) {
          setStudentList(savedData)
        } else {
          setStudentList(res.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getList(data)
  }, [selectedDate, st_class, st_sec])
  const [modal, setModal] = useState(false)
  const [totalmodal, settotalModal] = useState(false)
  const [presentmodal, setpresentModal] = useState(false)
  const toggle = () => {
    if (modal) {
      setModal(false)
    } else {
      setModal(true)
    }
  }
  const Ttoggle = () => {
    if (totalmodal) {
      settotalModal(false)
    } else {
      settotalModal(true)
    }
  }
  const Ptoggle = () => {
    if (presentmodal) {
      setpresentModal(false)
    } else {
      setpresentModal(true)
    }
  }
  const handleProjectClick = arg => {
    toggle()
  }
  const handleTotalClick = arg => {
    Ttoggle()
  }
  const handlePresentClick = arg => {
    Ptoggle()
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Attendance" breadcrumbItem="Student Attendance" />
          <Row>
            <Col xl={8}>
              <Row>
                <Col lg={4}>
                  <Card
                    className="mini-stats-wid my-cursor"
                    onClick={() => handleTotalClick()}
                  >
                    <CardBody>
                      <div className="d-flex flex-wrap justify-content-center align-items-center ">
                        <div className="me-3">
                          <h5 className="text-white mb-2">Total</h5>
                          <h3 className="mb-0">{studentList.total_student}</h3>
                        </div>
                        <div className="avatar-sm ms-auto">
                          <div className="avatar-title bg-transparent rounded-circle text-primary font-size-20">
                            {/* <i className="bx bxs-book-bookmark"></i> */}
                            <img src={img4} alt="pre" width={59} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Modal
                          isOpen={totalmodal}
                          toggle={Ttoggle}
                          // style={{ width: "380px" }}
                        >
                          <ModalHeader toggle={Ttoggle} tag="h4">
                            {/* Total Student  */}
                            Total students on {convertDate(attendanceDate)}
                          </ModalHeader>

                          <ModalBody>
                            <Card className="shadow-none">
                              <CardBody>
                                <div className="table-responsive">
                                  <Table className="table table-striped">
                                    <thead>
                                      <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">
                                          Student Code
                                        </th>
                                        <th>Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {studentList?.student?.map(
                                        (stu, index) => (
                                          <tr key={index}>
                                            <th
                                              scope="row"
                                              className="text-center"
                                            >
                                              {index + 1}
                                            </th>

                                            <td className="text-center">
                                              {" "}
                                              {stu.st_code}
                                            </td>
                                            <td> {stu.st_name}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </CardBody>
                            </Card>
                          </ModalBody>
                        </Modal>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card
                    className="blog-stats-wid my-cursor"
                    onClick={() => handlePresentClick()}
                  >
                    <CardBody>
                      <div className="d-flex flex-wrap justify-content-center align-items-center ">
                        <div className="me-3 ">
                          <h5 className="text-white mb-2">Present</h5>
                          <h3 className="mb-0 ">{studentList.present}</h3>
                        </div>
                        <div className="avatar-sm ms-auto">
                          <div className="avatar-title bg-transparent  rounded-circle text-primary font-size-20">
                            <img src={img1} alt="pre" width={59} />
                            {/* <i className="bx bxs-book-bookmark"></i> */}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Modal
                          isOpen={presentmodal}
                          toggle={Ptoggle}
                          // style={{ width: "380px" }}
                        >
                          <ModalHeader toggle={Ptoggle} tag="h4">
                            Present students on {convertDate(attendanceDate)}
                          </ModalHeader>
                          <ModalBody>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="download-table-xls-button btn-sm btn btn-success"
                              color="success"
                              table="table-to-xls"
                              filename="attendance"
                              sheet="tablexls"
                              buttonText="Print as XLS"
                            />

                            <Card className="shadow-none">
                              <CardBody>
                                <div className="table-responsive">
                                  <Table
                                    className="table table-striped"
                                    id="table-to-xls"
                                  >
                                    <thead className="d-none">
                                      <tr>
                                        <th className="text-center">
                                          List of Present Student
                                        </th>
                                        <th className="text-center">
                                          {`${st_class} ${st_sec}`}
                                        </th>
                                        <th>{studentList?.attendence_date}</th>
                                      </tr>
                                    </thead>
                                    <thead>
                                      <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">
                                          Student Code
                                        </th>
                                        <th>Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {studentList?.present_list?.map(
                                        (stu, index) => (
                                          <tr key={index}>
                                            <th
                                              scope="row"
                                              className="text-center"
                                            >
                                              {index + 1}
                                            </th>
                                            <td className="text-center">
                                              {" "}
                                              {stu.st_code}
                                            </td>
                                            <td> {stu.st_name}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </CardBody>
                            </Card>
                          </ModalBody>
                        </Modal>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card
                    className="blog-stats-wid my-cursor"
                    onClick={() => handleProjectClick()}
                  >
                    <CardBody>
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="me-3">
                          <h5 className="text-white mb-2">Absent</h5>
                          <h3 className="mb-0 ">{studentList.absent}</h3>
                        </div>
                        <div className="avatar-sm ms-auto">
                          <div className="avatar-title bg-transparent rounded-circle text-primary font-size-20">
                            {/* <i className="bx bxs-book-bookmark"></i> */}
                            <img src={img2} alt="pre" width={59} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Modal
                          isOpen={modal}
                          toggle={toggle}
                          // style={{ width: "380px" }}
                        >
                          <ModalHeader toggle={toggle} tag="h4">
                            Absent students on {convertDate(attendanceDate)}
                          </ModalHeader>
                          <ModalBody>
                            <ReactHTMLTableToExcel
                              id="test-table-xls-button"
                              className="download-table-xls-button btn-sm btn btn-success"
                              color="success"
                              table="table-to-xls"
                              filename="attendance"
                              sheet="tablexls"
                              buttonText="Print as XLS"
                            />
                            <Card className="shadow-none">
                              <CardBody>
                                <div className="table-responsive">
                                  <Table
                                    className="table table-striped"
                                    id="table-to-xls"
                                  >
                                    <thead className="d-none">
                                      <tr>
                                        <th className="text-center">
                                          List of Absent Student
                                        </th>
                                        <th className="text-center">
                                          {`${st_class} ${st_sec}`}
                                        </th>
                                        <th>{studentList?.attendence_date}</th>
                                      </tr>
                                    </thead>
                                    <thead>
                                      <tr>
                                        <th className="text-center">Sr No</th>
                                        <th className="text-center">
                                          Student Code
                                        </th>
                                        <th>Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {studentList?.absent_list?.map(
                                        (stu, index) => (
                                          <tr key={index}>
                                            <th
                                              scope="row"
                                              className="text-center"
                                            >
                                              {index + 1}
                                            </th>
                                            <td className="text-center">
                                              {" "}
                                              {stu.st_code}
                                            </td>
                                            <td> {stu.st_name}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </CardBody>
                            </Card>
                          </ModalBody>
                        </Modal>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <Container fluid>
                    <Row className="">
                      <Col xl={12}>
                        <Card className="shadow-none">
                          <CardBody>
                            <CardTitle className="h4"></CardTitle>
                            <div className="table-responsive text-center">
                              <Table className="table table-borderless mb-0">
                                <thead>
                                  <tr>
                                    <th>
                                      <h5 className="text-muted mb-1">Sr</h5>
                                    </th>
                                    <th>
                                      <h5 className="text-muted mb-1">
                                        Student Code
                                      </h5>
                                    </th>
                                    <th>
                                      <h5 className="text-muted mb-1">Name</h5>
                                    </th>
                                    <th>
                                      <h5 className="text-muted mb-1">
                                        Attendance
                                      </h5>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>
                                      {
                                        studentDetail?.payload?.attendance
                                          ?.st_code
                                      }
                                    </td>
                                    <td>
                                      {
                                        studentDetail?.payload?.attendance
                                          ?.st_name
                                      }
                                    </td>
                                    <td>
                                      <div className="mx-2">
                                        <span
                                          // className="text-secondary mx-2"
                                          className={
                                            studentDetail?.payload?.attendance
                                              ?.is_present
                                              ? "text-success mx-2"
                                              : "text-secondary mx-2"
                                          }
                                        >
                                          <span
                                            className="mdi mdi-check mdi-24px "
                                            id="edittooltip"
                                          ></span>
                                        </span>
                                        <span
                                          className={
                                            studentDetail?.payload?.attendance
                                              ?.is_absent
                                              ? "text-danger mx-2"
                                              : "text-secondary mx-2"
                                          }
                                        >
                                          <span
                                            className="mdi mdi-window-close mdi-24px"
                                            id="deletetooltip"
                                          ></span>
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <Row className="">
                              <Col sm={6}>
                                <div className="text-center" dir="ltr">
                                  <Knob
                                    value={sec_average}
                                    fgColor="#556ee6"
                                    thickness={0.15}
                                    readOnly={true}
                                    height={100}
                                    width={100}
                                    onChange={e => {
                                      setSession(e)
                                    }}
                                  />
                                  <h5 className="font-size-14 mt-3">
                                    Session Average
                                  </h5>
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="text-center" dir="ltr">
                                  <Knob
                                    value={mon_average}
                                    fgColor="#34c38f"
                                    thickness={0.15}
                                    readOnly={true}
                                    height={100}
                                    width={100}
                                    onChange={e => {
                                      setpresent(mon_average)
                                    }}
                                  />
                                  <h5 className="font-size-14 mt-3">
                                    Monthly Average
                                  </h5>
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                  <hr className="mb-4" />
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              <Card>
                <CardBody className="p-3">
                  <Row className="mb-0">
                    {/* <label className="col-sm-12 col-form-label text-start font-size-14">
                     Select Class
                  </label> */}
                    <div className="col-sm-12">
                      <select
                        className="form-select"
                        type="select"
                        name="class"
                        onChange={handleclassselect}
                      >
                        {classListOption?.map((class1, index) => (
                          <option key={index} value={class1.label}>
                            {class1.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-3">
                  <div className="form-group mb-0">
                    {/* <Label className="form-label">Select Date</Label> */}
                    <h4 className="card-title mb-2  text-start">Select Date</h4>
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="dd M,yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      options={{
                        inline: true,
                        // altInput: true,
                        // altFormat: "F j, Y",
                        // dateFormat: "Y-m-d",
                      }}
                    />
                  </div>
                  {/* <div className="mb-3 form-check">
                   
                    <h4 className="card-title mb-3 me-2">Select Date</h4>
                    <Input
                      className="form-control-auto d-block"
                      type="date"
                      name="start_date"
                      value={selectedDate}
                      
                      onChange={handleDateChange}
                      placeholder="Select Date"
                    />
                  </div> */}
                </CardBody>
              </Card>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center">
                    <Row className="">
                      <Col xl={12}>
                        <h4 className="card-title mb-3 me-2 text-start">
                          Generate Attendance Report
                        </h4>
                        {/* <label htmlFor="start-date">From</label>
                        <Input
                          type="date"
                          id="start-date"
                          name="start-date"
                          required
                        />

                        <label htmlFor="end-date">To</label>
                        <Input
                          type="date"
                          id="end-date"
                          name="end-date"
                          required
                        /> */}

                        <FormGroup className="mb-4">
                          <InputGroup>
                            <Flatpickr
                              className="form-control"
                              placeholder="2023-04-01 to 2023-04-25"
                              options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <button
                          type="button"
                          className="btn bg-primary text-white btn-rounded text-center"
                        >
                          {/* <i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "} */}
                          Generate
                        </button>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default StudentReport
