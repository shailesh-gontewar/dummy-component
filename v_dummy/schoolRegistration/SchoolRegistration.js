import React, { useState } from "react";
import Sidebar from "../../Layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

const SchoolRegistration = () => {
  const [selectedOptions, setSelectedOptions] = useState();
  // const [showData, setShowData] = useState(false)
  // let navigate=useNavigate()

  const [data, setData] = useState([
    {
      id: 1,
      name: "Corrine Johnson",
      feeHeadCode: "Annual",
      feeHeadName: "Annual",
    },
    {
      id: 2,
      name: "Gladys Smith",
      feeHeadCode: "Tuition",
      feeHeadName: "Annual",
    },
  ]);
  const [classdata, setClassData] = useState([
    {
      id: 1,
      class: "A",
      medium: "English",
      minStrength: "30",
      maxStrength: "50",
      active: "Yes",
    },
    {
      id: 2,
      class: "A",
      medium: "English",
      minStrength: "30",
      maxStrength: "50",
      active: "No",
    },
  ]);

  const [editingCell, setEditingCell] = useState({
    rowId: null,
    property: null,
  });
  const [clickedRowId, setClickedRowId] = useState(null);

  const handleRowClick = (id, property) => {
    setEditingCell({ rowId: id, property });
  };

  const handleInputChange = (e, id, property) => {
    const newValue = e.target.value;
    // for fees Heads data mapping
    const newData = data.map((row) => {
      if (row.id === id) {
        row[property] = newValue;
      }
      return row;
    });
    setData(newData);
    // for classes & Section data mapping
    const newclassData = classdata.map((row) => {
      if (row.id === id) {
        row[property] = newValue;
      }
      return row;
    });
    setClassData(newclassData);
  };

  const handleInputBlur = () => {
    setEditingCell({ rowId: null, property: null });
  };

  // For Right Click
  const handleRowRightClick = (rowId) => {
    setClickedRowId(rowId);
  };
  const handleAddRow = () => {
    const newRowId = Math.max(...data.map((row) => row.id)) + 1;
    const newRow = { id: newRowId, name: "", feeHeadCode: "", feeHeadName: "" };
    setData([...data, newRow]);

    // for class&section
    const newClassRowId = Math.max(...classdata.map((row) => row.id)) + 1;
    const newClassRow = {
      id: newClassRowId,
      class: "",
      medium: "",
      minStrength: "",
      maxStrength: "",
      active: "",
    };
    setClassData([...classdata, newClassRow]);
  };

  const handleDeleteRow = () => {
    if (clickedRowId) {
      const newData = data.filter((row) => row.id !== clickedRowId);
      setData(newData);
      setClickedRowId(null);
      // for class&Section
      const newClassData = classdata.filter((row) => row.id !== clickedRowId);
      setClassData(newClassData);
      setClickedRowId(null);
    }
  };

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
  ];

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  // const handleData = () => {
  // setShowData(!showData)
  // }

  return (
    <>
      <div id="main_content">
        {/* <Sidebar showData={showData}/> */}
        <Sidebar />
        <div className="page">
          <div className="section-body">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="header-action">
                  <h1 className="page-title">School Registration</h1>
                </div>
                <ul className="nav nav-tabs page-header-tab">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#Student-all"
                    >
                      School List
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#Student-add"
                    >
                      Add School
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="section-body mt-4">
            <div className="container-fluid">
              <div className="tab-content">
                <div className="tab-pane active" id="Student-all">
                  <div className="table-responsive card">
                    <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                      <thead>
                        <tr>
                          <th>Sr.No.</th>
                          <th>logo</th>
                          <th>School Name</th>
                          <th>Contact No.</th>
                          <th>Email</th>
                          <th>State</th>
                          <th>City</th>
                          <th>Status</th>
                          <th>Action</th>+
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar1.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Corrine M Johnson</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button> */}
                            {/* <button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button> */}
                            {/* <button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Alice A Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar3.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Ken Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar4.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Gerald K Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar5.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Ken Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar6.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Alice A Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar7.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Ken Smith</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td className="w60">
                            <img
                              className="avatar"
                              src="../assets/images/xs/avatar8.jpg"
                              alt=""
                            />
                          </td>
                          <td>
                            <span className="font-16">Corrine M Johnson</span>
                          </td>
                          <td>(417) 646-7483</td>
                          <td>ken@gmail.com</td>
                          <td>State 1</td>
                          <td>City 1</td>
                          <td>Active</td>
                          <td>
                            <Link className="text-muted" to="/school-details">
                              <i className="fa fa-edit"></i>
                            </Link>
                            {/* <button onClick={() => this.setState({ show: true })} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="tab-pane" id="Student-add">
                  <div className="row clearfix">
                    <div className="col-lg-2 col-md-12 col-sm-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <ul className="nav nav-tabs flex-column py-2">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#Basic-info"
                                >
                                  {" "}
                                  Basic Info
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#Fees-heads"
                                >
                                  Fees Heads
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#Classes-section"
                                >
                                  {" "}
                                  Classes & Section
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#Fees-structure"
                                >
                                  Fees Structure
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-10 col-md-12 col-sm-12">
                      {/* ###################### */}
                      <div className="tab-content">
                        <div className="tab-pane active" id="Basic-info">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                              <form className="card-body">
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    Organization{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <Select
                                      options={optionList}
                                      placeholder="Select "
                                      value={selectedOptions}
                                      onChange={handleSelect}
                                      isSearchable={true}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    School Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter School Name"
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    Address{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    State <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <Select
                                      options={optionList}
                                      placeholder="Select "
                                      value={selectedOptions}
                                      onChange={handleSelect}
                                      isSearchable={true}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    City <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <Select
                                      options={optionList}
                                      placeholder="Select "
                                      value={selectedOptions}
                                      onChange={handleSelect}
                                      isSearchable={true}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    Status{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-md-7">
                                    <Select
                                      options={optionList}
                                      placeholder="Select "
                                      value={selectedOptions}
                                      onChange={handleSelect}
                                      isSearchable={true}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-md-2 col-form-label">
                                    School Logo
                                  </label>
                                  <div className="col-md-7">
                                    {/* <Dropzone /> */}
                                    <input type="file" className="dropify" />
                                    <small
                                      id="fileHelp"
                                      className="form-text text-muted"
                                    >
                                      This is some placeholder block-level help
                                      text for the above input. It's a bit
                                      lighter and easily wraps to a new line.
                                    </small>
                                  </div>
                                </div>
                              </form>
                              <div className="col-sm-12 justify-content-center align-item-center mb-3">
                                <button
                                  type="submit"
                                  className="mr-1 btn btn-primary px-5"
                                  // onClick={handleData}
                                >
                                  Save
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-outline-secondary px-5"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="Fees-heads">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                              <form className="card-body">
                                <div className="form-group row">
                                  <label className="col-lg-2 col-md-2 col-form-label mr-0">
                                    {" "}
                                    Fee Head Code{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-2 col-md-2 mr-4">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>

                                  <label className="col-lg-2 col-md-1 col-form-label ml-4 ">
                                    Fee Head Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div className="col-lg-2 col-md-2 ">
                                    <input
                                      type="text"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-md-2 col-lg-2 ml-4">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      ADD
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="card">
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-hover text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5">
                                  <thead>
                                    <tr>
                                      <th>Sr.No.</th>
                                      <th>Name</th>
                                      <th>Fee Head Code</th>
                                      <th>Fee Head Name</th>
                                      {/* <th>Status</th> */}
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((row) => (
                                      <tr
                                        key={row.id}
                                        onContextMenu={() =>
                                          handleRowRightClick(row.id)
                                        }
                                      >
                                        <td>{row.id}</td>
                                        <td
                                          onClick={() =>
                                            handleRowClick(row.id, "name")
                                          }
                                          onBlur={handleInputBlur}
                                        >
                                          {editingCell.rowId === row.id &&
                                          editingCell.property === "name" ? (
                                            <input
                                              type="text"
                                              value={row.name}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  e,
                                                  row.id,
                                                  "name"
                                                )
                                              }
                                              autoFocus
                                            />
                                          ) : (
                                            row.name
                                          )}
                                        </td>
                                        <td
                                          onClick={() =>
                                            handleRowClick(
                                              row.id,
                                              "feeHeadCode"
                                            )
                                          }
                                          onBlur={handleInputBlur}
                                        >
                                          {editingCell.rowId === row.id &&
                                          editingCell.property ===
                                            "feeHeadCode" ? (
                                            <input
                                              type="text"
                                              value={row.feeHeadCode}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  e,
                                                  row.id,
                                                  "feeHeadCode"
                                                )
                                              }
                                              autoFocus
                                            />
                                          ) : (
                                            row.feeHeadCode
                                          )}
                                        </td>
                                        <td
                                          onClick={() =>
                                            handleRowClick(
                                              row.id,
                                              "feeHeadName"
                                            )
                                          }
                                          onBlur={handleInputBlur}
                                        >
                                          {editingCell.rowId === row.id &&
                                          editingCell.property ===
                                            "feeHeadName" ? (
                                            <input
                                              type="text"
                                              value={row.feeHeadName}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  e,
                                                  row.id,
                                                  "feeHeadName"
                                                )
                                              }
                                              autoFocus
                                            />
                                          ) : (
                                            row.feeHeadName
                                          )}
                                        </td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            id={`checkbox${row.id}`}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {clickedRowId && (
                                <div
                                  className="context-menu"
                                  style={{ top: 0, left: 0 }}
                                >
                                  <div
                                    className="context-menu-item"
                                    onClick={handleAddRow}
                                  >
                                    Add New Row
                                  </div>
                                  <div
                                    className="context-menu-item"
                                    onClick={handleDeleteRow}
                                  >
                                    Delete Row
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="tab-pane" id="Classes-section">
                          {/* <div class="row row-deck"> */}
                          <ul className="nav nav-tabs ml-3">
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#Student-all"
                              >
                                Classes & Section List
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#Student-add"
                              >
                                Add Classes & Section
                              </a>
                            </li>
                          </ul>

                          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                            <div className="tab-content">
                              <div className="tab-pane active" id="Student-all">
                                <div className="card">
                                  <div className="card-body">
                                    <div className="table-responsive card">
                                      <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                                        <thead>
                                          <tr>
                                            <th>Sr.No.</th>
                                            <th>Class</th>
                                            <th>Medium</th>
                                            <th>Min Strength</th>
                                            <th>Max Strength</th>
                                            <th>Active</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {classdata.map((row) => (
                                            <tr
                                              key={row.id}
                                              onContextMenu={() =>
                                                handleRowRightClick(row.id)
                                              }
                                            >
                                              <td>{row.id}</td>
                                              <td
                                                onClick={() =>
                                                  handleRowClick(
                                                    row.id,
                                                    "class"
                                                  )
                                                }
                                                onBlur={handleInputBlur}
                                              >
                                                {editingCell.rowId === row.id &&
                                                editingCell.property ===
                                                  "class" ? (
                                                  <input
                                                    type="text"
                                                    value={row.class}
                                                    onChange={(e) =>
                                                      handleInputChange(
                                                        e,
                                                        row.id,
                                                        "class"
                                                      )
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  row.class
                                                )}
                                              </td>
                                              <td
                                                onClick={() =>
                                                  handleRowClick(
                                                    row.id,
                                                    "medium"
                                                  )
                                                }
                                                onBlur={handleInputBlur}
                                              >
                                                {editingCell.rowId === row.id &&
                                                editingCell.property ===
                                                  "medium" ? (
                                                  <input
                                                    type="text"
                                                    value={row.medium}
                                                    onChange={(e) =>
                                                      handleInputChange(
                                                        e,
                                                        row.id,
                                                        "medium"
                                                      )
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  row.medium
                                                )}
                                              </td>
                                              <td
                                                onClick={() =>
                                                  handleRowClick(
                                                    row.id,
                                                    "minStrength"
                                                  )
                                                }
                                                onBlur={handleInputBlur}
                                              >
                                                {editingCell.rowId === row.id &&
                                                editingCell.property ===
                                                  "minStrength" ? (
                                                  <input
                                                    type="text"
                                                    value={row.minStrength}
                                                    onChange={(e) =>
                                                      handleInputChange(
                                                        e,
                                                        row.id,
                                                        "minStrength"
                                                      )
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  row.minStrength
                                                )}
                                              </td>

                                              <td
                                                onClick={() =>
                                                  handleRowClick(
                                                    row.id,
                                                    "maxStrength"
                                                  )
                                                }
                                                onBlur={handleInputBlur}
                                              >
                                                {editingCell.rowId === row.id &&
                                                editingCell.property ===
                                                  "maxStrength" ? (
                                                  <input
                                                    type="text"
                                                    value={row.maxStrength}
                                                    onChange={(e) =>
                                                      handleInputChange(
                                                        e,
                                                        row.id,
                                                        "maxStrength"
                                                      )
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  row.maxStrength
                                                )}
                                              </td>
                                              <td
                                                onClick={() =>
                                                  handleRowClick(
                                                    row.id,
                                                    "active"
                                                  )
                                                }
                                                onBlur={handleInputBlur}
                                              >
                                                {editingCell.rowId === row.id &&
                                                editingCell.property ===
                                                  "active" ? (
                                                  <input
                                                    type="text"
                                                    value={row.active}
                                                    onChange={(e) =>
                                                      handleInputChange(
                                                        e,
                                                        row.id,
                                                        "active"
                                                      )
                                                    }
                                                    autoFocus
                                                  />
                                                ) : (
                                                  row.active
                                                )}
                                              </td>
                                              {/* <td>Yes</td> */}
                                            </tr>
                                          ))}

                                          {/* <tr>
                                                                        <td>1</td>
                                                                        <td>A</td>
                                                                        <td>English</td>
                                                                        <td>30</td>
                                                                        <td>50</td>
                                                                        <td>Yes</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>2</td>
                                                                        <td>A</td>
                                                                        <td>English</td>
                                                                        <td>30</td>
                                                                        <td>50</td>
                                                                        <td>No</td>
                                                                    </tr> */}
                                        </tbody>
                                      </table>
                                    </div>
                                    {clickedRowId && (
                                      <div
                                        className="context-menu"
                                        style={{ top: 0, left: 0 }}
                                      >
                                        <div
                                          className="context-menu-item"
                                          onClick={handleAddRow}
                                        >
                                          Add New Row
                                        </div>
                                        <div
                                          className="context-menu-item"
                                          onClick={handleDeleteRow}
                                        >
                                          Delete Row
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="tab-pane" id="Student-add">
                                <div className="row clearfix">
                                  <div className="col-lg-10 col-md-12 col-sm-12">
                                    <div className="card">
                                      <form className="card-body">
                                        <div className="form-group row">
                                          <label className="col-lg-2 col-md-2 col-form-label">
                                            Class Code{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <div className="col-md-3 mr-3">
                                            <Select
                                              options={optionList}
                                              placeholder="Select Code"
                                              value={selectedOptions}
                                              onChange={handleSelect}
                                              isSearchable={true}
                                            />
                                          </div>
                                          <label className="col-md-2 col-form-label ml-5">
                                            Class Name{" "}
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <div className="col-md-3">
                                            <input
                                              type="text"
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-md-1">
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              Show
                                            </button>
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row clearfix">
                                          <div className="table-responsive card">
                                            <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                                              <thead>
                                                <tr>
                                                  <th></th>
                                                  <th>Sr.No.</th>
                                                  <th>Section</th>
                                                  <th>Medium</th>
                                                  <th>Min Strength</th>
                                                  <th>Max Strength</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      id="checkbox1"
                                                    />
                                                  </td>
                                                  <td>1</td>
                                                  <td>
                                                    <span className="font-16">
                                                      A
                                                    </span>
                                                  </td>
                                                  <td className="col-lg-2">
                                                    <Select
                                                      options={optionList}
                                                      placeholder="Select Medium"
                                                      value={selectedOptions}
                                                      onChange={handleSelect}
                                                      isSearchable={true}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      id="checkbox1"
                                                    />
                                                  </td>
                                                  <td>2</td>
                                                  <td>
                                                    <span className="font-16">
                                                      B
                                                    </span>
                                                  </td>
                                                  <td className="col-lg-2">
                                                    <Select
                                                      options={optionList}
                                                      placeholder="Select Medium"
                                                      value={selectedOptions}
                                                      onChange={handleSelect}
                                                      isSearchable={true}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      id="checkbox1"
                                                    />
                                                  </td>
                                                  <td>3</td>
                                                  <td>
                                                    <span className="font-16">
                                                      C
                                                    </span>
                                                  </td>
                                                  <td className="col-lg-2">
                                                    <Select
                                                      options={optionList}
                                                      placeholder="Select Medium"
                                                      value={selectedOptions}
                                                      onChange={handleSelect}
                                                      isSearchable={true}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <input
                                                      type="checkbox"
                                                      id="checkbox1"
                                                    />
                                                  </td>
                                                  <td>4</td>
                                                  <td>
                                                    <span className="font-16">
                                                      D
                                                    </span>
                                                  </td>
                                                  <td className="col-lg-2">
                                                    <Select
                                                      options={optionList}
                                                      placeholder="Select Medium"
                                                      value={selectedOptions}
                                                      onChange={handleSelect}
                                                      isSearchable={true}
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="text"
                                                      className="form-control w-50"
                                                    />
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                                  <button
                                    type="submit"
                                    className="mr-2 btn btn-primary btn-lg "
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-outline-secondary btn-lg"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>

                        <div className="tab-pane" id="Fees-structure">
                          <div class="row row-deck">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                <form className="card-body">
                                  <div className="form-group row">
                                    <label className="col-md-2 col-form-label">
                                      Class Code :
                                      <span className="text-danger"></span>
                                    </label>
                                    <div className="col-md-3 ml-0 mr-4">
                                      <Select
                                        options={optionList}
                                        placeholder="Select Class Code"
                                        value={selectedOptions}
                                        onChange={handleSelect}
                                        isSearchable={true}
                                      />
                                    </div>
                                    <label className="col-lg-2 col-md-1 col-form-label ml-3">
                                      Concession :{" "}
                                      <span className="text-danger"></span>
                                    </label>
                                    <div className="col-md-3">
                                      <Select
                                        options={optionList}
                                        placeholder="Select Concession"
                                        value={selectedOptions}
                                        onChange={handleSelect}
                                        isSearchable={true}
                                      />
                                    </div>
                                    <div className="col-md-0">
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                      >
                                        Show
                                      </button>
                                      {/* <button type="submit" className="btn btn-outline-secondary">Show</button> */}
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                                <div className="card-body">
                                  <div className="row clearfix">
                                    <div className="table-responsive card">
                                      <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                                        <thead>
                                          <tr>
                                            <th></th>
                                            <th>Sr.No.</th>
                                            <th>Fee Type</th>
                                            <th>No.of Installments</th>
                                            <th>
                                              Total Amount <br />
                                              (Annually)
                                            </th>
                                            <tr>
                                              <th colspan="2">
                                                Admission Type
                                              </th>
                                            </tr>
                                            <tr>
                                              <th>New</th>
                                              <th>Old</th>
                                            </tr>
                                            {/* <th>Action</th> */}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>
                                              <input
                                                type="checkbox"
                                                id="checkbox1"
                                              />
                                            </td>
                                            <td>1</td>
                                            <td>
                                              <span className="font-16">
                                                Corrine M Johnson
                                              </span>
                                            </td>
                                            <td>1</td>
                                            <td>25000</td>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="mr-3"
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="ml-3"
                                                />
                                              </td>
                                            </tr>
                                            {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                          </tr>
                                          <tr>
                                            <td>
                                              <input
                                                type="checkbox"
                                                id="checkbox1"
                                              />
                                            </td>
                                            <td>2</td>
                                            <td>
                                              <span className="font-16">
                                                Alice A Smith
                                              </span>
                                            </td>
                                            <td>1</td>
                                            <td>25000</td>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="mr-3"
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="ml-3"
                                                />
                                              </td>
                                            </tr>
                                            {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                          </tr>
                                          <tr>
                                            <td>
                                              <input
                                                type="checkbox"
                                                id="checkbox1"
                                              />
                                            </td>
                                            <td>3</td>
                                            <td>
                                              <span className="font-16">
                                                Ken Smith
                                              </span>
                                            </td>
                                            <td>1</td>
                                            <td>25000</td>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="mr-3"
                                                />{" "}
                                              </td>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="ml-3"
                                                />
                                              </td>
                                            </tr>
                                            {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                          </tr>
                                          <tr>
                                            <td>
                                              <input
                                                type="checkbox"
                                                id="checkbox1"
                                              />
                                            </td>
                                            <td>4</td>
                                            <td>
                                              <span className="font-16">
                                                Gerald K Smith
                                              </span>
                                            </td>
                                            <td>1</td>
                                            <td>25000</td>
                                            <tr>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="mr-3"
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  type="checkbox"
                                                  id="checkbox1"
                                                  className="ml-3"
                                                />
                                              </td>
                                            </tr>
                                            {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                            <button
                              type="submit"
                              className="mr-2 btn btn-primary btn-lg"
                            >
                              Save
                            </button>
                            <button
                              type="submit"
                              className="btn btn-outline-secondary btn-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* ###################### */}
                    </div>
                  </div>

                  {/* <div className="row clearfix">
                                        <div className="col-lg-8 col-md-12 col-sm-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Basic Information</h3>
                                                </div>
                                                <form className="card-body">
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">Organization <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                            <Select
                                                                options={optionList}
                                                                placeholder="Select "
                                                                value={selectedOptions}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">School Name <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control" placeholder="Enter School Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">Address <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">State <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                        <Select
                                                                options={optionList}
                                                                placeholder="Select "
                                                                value={selectedOptions}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">City <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                        <Select
                                                                options={optionList}
                                                                placeholder="Select "
                                                                value={selectedOptions}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">Status <span className="text-danger">*</span></label>
                                                        <div className="col-md-9">
                                                        <Select
                                                                options={optionList}
                                                                placeholder="Select "
                                                                value={selectedOptions}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-md-3 col-form-label">School Logo</label>
                                                        <div className="col-md-9">
                                                            <input type="file" className="dropify" />
                                                            <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}

                  {/* <div className="col-sm-12 justify-content-center align-item-center">
                                        <button type="submit" className="mr-1 btn btn-primary px-5"
                                        // onClick={handleData}
                                        
                                        >Save</button>
                                        <button type="submit"  className="btn btn-outline-secondary px-5">Cancel</button>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolRegistration;
