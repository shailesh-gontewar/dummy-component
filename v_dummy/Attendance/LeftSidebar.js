import React, { useContext, useState } from "react";
import moment from "moment";
import { Row, Card, CardBody, Col, Table, Modal, ModalBody } from "reactstrap";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { AttendanceContext } from "../../../context/attendanceContext";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loading from "../../Loader/Loader";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAttendanceReport } from "../../../actions/school_user/Attenadance";
const LeftSidebar = () => {
  const token = localStorage.getItem("token");

  const {
    classListOption,
    handleclassselect,
    selectedDate,
    handleDateChange,
    classSelect,
    school_id,
    session_id,
  } = useContext(AttendanceContext);
  const { studentreport, loading } = useSelector((state) => state.attendance);
  const [presentmodal, setpresentModal] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const dispatch = useDispatch();

  const Ptoggle = () => {
    if (presentmodal) {
      setpresentModal(false);
    } else {
      setpresentModal(true);
    }
  };

  // const [loading, setLoading] = useState(false);
  const [AttendanceReport, setAttendanceReport] = useState([]);

  const GenerateAttendanceReport = () => {
    // setLoading(true);
    const date = new Date(selectedDate);
    const monthY = String(date.getMonth() + 1).padStart(2, "0");
    const yearY = date.getFullYear();
    const body = {
      school_id: school_id,
      section_id: classSelect,
      year: year || yearY,
      month: month || monthY,
      academic_id: session_id,
    };
    if (!classSelect) {
      return;
    }
    dispatch(getAttendanceReport(token, body))
      .then((response) => {
        if (response?.payload?.length === 0) {
          Swal.fire({
            text: "No Attendance Report Found !",
            icon: "warning",
            imageAlt: "warning image",
          }).then((result) => {
            if (result.isConfirmed) {
              // setLoading(false);
            }
          });
        } else {
          setAttendanceReport(response?.payload);
          Ptoggle();
          // dispatch(getStudentList(token, data));
          // dispatch(getClass(token, s_data));
        }
      })
      .catch((err) => console.log(err));
  };

  const String = (str) => {
    let num = str;
    num = str.toString();
    return num;
  };

  const fileName = () => {
    const date = new Date(selectedDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // let name = "Attendance Report" + " " + classSelect + " ";
    let name = "Attendance Report";
    // + month + ", " + year

    return name;
  };

  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setMonth(event.target.value);
  };

  const years = () => {
    const currentYear = new Date(selectedDate).getFullYear();
    const yearsArray = [];
    for (let i = currentYear - 0; i <= currentYear + 0; i++) {
      yearsArray.push(i.toString());
    }
    return yearsArray[0];
  };
  const [selectedYear, setSelectedYear] = useState(years);

  const handleYearChange = (value) => {
    if (value.length <= 4) {
      setSelectedYear(value);
      setYear(value);
    }
  };
  const handlePresentClick = (arg) => {
    GenerateAttendanceReport();
  };
  return (
    <>
      <Card>
        <CardBody className="p-3">
          <Row className="mb-0">
            <div className="col-sm-12">
              <h4 className="card-title mb-2  text-start">Select Class</h4>
              <select
                value={classSelect}
                className="form-control input-height"
                type="select"
                name="class"
                onChange={handleclassselect}
              >
                <option style={{ fontWeight: "bold" }}>Select Class</option>
                {classListOption?.map((class1, index) => (
                  <option key={index} value={class1.value}>
                    {class1.label}
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
            <h4 className="card-title mb-2  text-start">Select Date</h4>
            <Flatpickr
              className="form-control d-block"
              placeholder="dd M,yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              options={{
                inline: true,
                dateFormat: "d M Y",
                // maxDate: new Date(),
                // altInput: true,
                // altFormat: "F j, Y",
                // dateFormat: "Y-m-d",
              }}
            />
          </div>
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
                <Row>
                  <Col>
                    <h4 className="card-title me-4 text-start">Month</h4>
                    <select
                      value={selectedMonth}
                      className="form-control"
                      onChange={handleMonthChange}
                    >
                      <option value="" disabled style={{ fontWeight: "bold" }}>
                        Select Month
                      </option>
                      {months.map((month) => (
                        <option
                          key={month.value}
                          value={month.value}
                          className="text-dark"
                        >
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <h4 className="card-title me-4 text-start">Year</h4>
                    <input
                      className="form-control"
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      type="number"
                    />
                  </Col>
                </Row>

                <button
                  onClick={() => handlePresentClick()}
                  type="button"
                  className="btn bg-primary text-white btn-rounded text-center mt-4"
                >
                  GENERATE {fileName().toUpperCase()}
                </button>

                <Modal
                  isOpen={presentmodal}
                  toggle={Ptoggle}
                  // style={{ width: "380px" }}
                  size="xl"
                >
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn-lg btn btn-success"
                    color="success"
                    table="table-to-xls"
                    filename={fileName()}
                    sheet="tablexls"
                    buttonText="Print"
                  />
                  <ModalBody>
                    <Card className="shadow-none">
                      <CardBody>
                        <div className="table-responsive">
                          <Table
                            className="table table-striped"
                            id="table-to-xls"
                          >
                            <thead>
                              <tr>
                                <th className="text-center">Sr.</th>
                                <th className="text-center">Roll No</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">1</th>
                                <th className="text-center">2</th>
                                <th className="text-center">3</th>
                                <th className="text-center">4</th>
                                <th className="text-center">5</th>
                                <th className="text-center">6</th>
                                <th className="text-center">7</th>
                                <th className="text-center">8</th>
                                <th className="text-center">9</th>
                                <th className="text-center">10</th>
                                <th className="text-center">11</th>
                                <th className="text-center">12</th>
                                <th className="text-center">13</th>
                                <th className="text-center">14</th>
                                <th className="text-center">15</th>
                                <th className="text-center">16</th>
                                <th className="text-center">17</th>
                                <th className="text-center">18</th>
                                <th className="text-center">19</th>
                                <th className="text-center">20</th>
                                <th className="text-center">21</th>
                                <th className="text-center">22</th>
                                <th className="text-center">23</th>
                                <th className="text-center">24</th>
                                <th className="text-center">25</th>
                                <th className="text-center">26</th>
                                <th className="text-center">27</th>
                                <th className="text-center">28</th>
                                <th className="text-center">29</th>
                                <th className="text-center">30</th>
                                <th className="text-center">31</th>
                                <th className="text-center">Present</th>
                                <th className="text-center">Absent</th>
                              </tr>
                            </thead>
                            <tbody>
                              {AttendanceReport?.map((stu, index) => {
                                const value = stu[index + 1];
                                return (
                                  <tr key={index}>
                                    <th scope="row" className="text-center">
                                      {index + 1}
                                    </th>
                                    <td className="text-center">
                                      {stu.serial_no}
                                    </td>
                                    <td className="text-center">
                                      {stu.student_name}
                                    </td>
                                    <td className="text-center">{stu[1]}</td>
                                    <td className="text-center">{stu[2]}</td>
                                    <td className="text-center">{stu[3]}</td>
                                    <td className="text-center">{stu[4]}</td>
                                    <td className="text-center">{stu[5]}</td>
                                    <td className="text-center">{stu[6]}</td>
                                    <td className="text-center">{stu[7]}</td>
                                    <td className="text-center">{stu[8]}</td>
                                    <td className="text-center">{stu[9]}</td>
                                    <td className="text-center">{stu[10]}</td>
                                    <td className="text-center">{stu[11]}</td>
                                    <td className="text-center">{stu[12]}</td>
                                    <td className="text-center">{stu[13]}</td>
                                    <td className="text-center">{stu[14]}</td>
                                    <td className="text-center">{stu[15]}</td>
                                    <td className="text-center">{stu[16]}</td>
                                    <td className="text-center">{stu[17]}</td>
                                    <td className="text-center">{stu[18]}</td>
                                    <td className="text-center">{stu[19]}</td>
                                    <td className="text-center">{stu[20]}</td>
                                    <td className="text-center">{stu[21]}</td>
                                    <td className="text-center">{stu[22]}</td>
                                    <td className="text-center">{stu[23]}</td>
                                    <td className="text-center">{stu[24]}</td>
                                    <td className="text-center">{stu[25]}</td>
                                    <td className="text-center">{stu[26]}</td>
                                    <td className="text-center">{stu[27]}</td>
                                    <td className="text-center">{stu[28]}</td>
                                    <td className="text-center">{stu[29]}</td>
                                    <td className="text-center">{stu[30]}</td>
                                    <td className="text-center">{stu[31]}</td>
                                    <td className="text-center">
                                      {stu.present}
                                    </td>
                                    <td className="text-center">
                                      {stu.absent}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    </Card>
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default LeftSidebar;
