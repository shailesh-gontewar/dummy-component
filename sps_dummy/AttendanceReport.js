import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  InputGroup,
  CardTitle,
  Label,
  Input,
} from "reactstrap"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"

const AttendanceReport = props => {
  const [selectedDate, setSelectedDate] = useState(null)
  const handleDateChange = e => {
    setSelectedDate(e.target.value)
  }
  console.log(selectedDate)
  // const date = new Date(selectedDate)
  // let newData = date.toLocaleString().slice(0, 10)
  // console.log(newData)
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody className="">
            {/* <h4 className="card-title mb-3 me-2">Select Date</h4>
            <FormGroup className="mb-0">
            
              <InputGroup>
                <Flatpickr
                  className="form-control d-block"
                  placeholder="dd-mm-yyyy"
                  onChange={handleDateChange}
                  options={{
                    dateFormat: "d F Y",
                    disableMobile: true,
                  }}
                />
              </InputGroup>
            </FormGroup> */}
            <div className="mb-3 form-check">
              {/* <Label className="form-label">Select Date</Label> */}
              <h4 className="card-title mb-3 me-2">Select Date</h4>
              <Input
                className="form-control-auto"
                type="date"
                name="start_date"
                // value={date}
                onChange={handleDateChange}
                placeholder="Select Date"
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
                    Monthly Attendance Report
                  </h4>
                  <FormGroup className="mb-4">
                    <InputGroup>
                      <Flatpickr
                        className="form-control d-block"
                        placeholder="dd mm yyyy"
                        options={{
                          mode: "range",
                          dateFormat: "Y-m-d",
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                  <button
                    type="button"
                    className="btn btn-success btn-rounded text-center"
                  >
                    {/* <i className="bx bx-check-double font-size-16 align-middle me-2"></i>{" "} */}
                    Generate
                  </button>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
        <Row className="justify-content-center">
          <Col xl={12}>
            <Card className="shadow-none">
              <CardBody>
                <CardTitle className="h4 card-title mb-2 ps-4">
                  Today's Absent Student
                </CardTitle>
                {/* <div className="mb-4">
                  <ul className="">
                    <li className="list-group-item fw-bold">
                      Total Strength - <span>100</span>{" "}
                    </li>
                    <li className="list-group-item fw-bold">
                      Total Present - <span>85</span>
                    </li>
                    <li className="list-group-item fw-bold">
                      Total Absent - <span>15</span>
                    </li>
                  </ul>
                </div> */}
                <div>
                  <ol className="list-group-numbered">
                    <li className="list-group-item"> Sanjay Sharma</li>
                    <li className="list-group-item">Rahul Swami</li>
                    <li className="list-group-item">Gulnaz Sheikh</li>
                    <li className="list-group-item">Rajendra Kumar</li>
                  </ol>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}

export default AttendanceReport
