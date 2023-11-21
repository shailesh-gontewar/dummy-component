import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AttendanceContext } from "../../../context/attendanceContext";
import img1 from "../../../assets/image/pre.png";
import img2 from "../../../assets/image/abs.png";
import img4 from "../../../assets/image/tot.png";

const StudentStatsCard = ({ title, count, list}) => {
  const [modal, setModal] = useState(false);
  const { studentList, convertDate, attendence_date } =
    useContext(AttendanceContext);


    // console.log(studentList,"attendence_date",attendence_date)
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleClick = (arg) => {
    toggleModal();
  };
  const closeBtn = (
    <button className="btn btn-sm close " onClick={toggleModal} type="button">
      <i className="fa fa-times"></i>
    </button>
  );
  return (
    <Col lg={4}>
      <Card className="my-cursor" onClick={handleClick}>
        <CardBody className="top_counter">
          <div className="icon">
            <div className="avatar-title bg-transparent rounded-circle text-primary font-size-20">
              {title === "Total" && <img src={img4} alt="pre" width={59} />}
              {title === "Present" && <img src={img1} alt="pre" width={59} />}
              {title === "Absent" && <img src={img2} alt="pre" width={59} />}
            </div>
          </div>
          <div className="content">
            <h5>{title}</h5>
            <h5 className="number mb-0">{count || "00"}</h5>
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal} tag="h5" close={closeBtn}>
                {title} students on {convertDate(attendence_date)}
              </ModalHeader>
              <ModalBody>
                <ReactHTMLTableToExcel
                  id={`${title.toLowerCase()}-table-xls-button`}
                  className="download-table-xls-button btn-sm btn btn-success m-2"
                  color="success"
                  table="table-to-xls"
                  filename={`${title.toLowerCase()}-attendance`}
                  sheet="tablexls"
                  buttonText="Print"
                />
                <Card className="shadow-none">
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table table-striped" id="table-to-xls">
                        <thead className="d-none">
                          <tr>
                            <th className="text-center">
                              List of {title} Student
                            </th>
                            <th className="text-center">
                              {/* {`${st_class.toUpperCase()} ${st_sec}`} */}
                            </th>
                            <th>{convertDate(attendence_date)}</th>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th className="text-center">Sr No</th>
                            <th className="text-center">Student Code</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((stu, index) => (
                            <tr key={index}>
                              <th scope="row" className="text-center">
                                {index + 1}
                              </th>
                              <td className="text-center">
                                {stu.student_code}
                              </td>
                              <td>{stu.student_name}</td>
                            </tr>
                          ))}
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
  );
};

export default StudentStatsCard;
