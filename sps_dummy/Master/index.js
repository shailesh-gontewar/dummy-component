import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  UncontrolledCollapse,
} from "reactstrap";
import {
  CreateConnession,
  deleteMasterData,
  getMasterData,
  updateMasterData,
} from "../../../actions/super-user/MasterData";
import { useDispatch, useSelector } from "react-redux";
import ContextMenu from "./ContexMenu";

const Master = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { createmasterData, masterData } = useSelector(
    (state) => state.masterData
  );
  const [verticalActiveTab, setverticalActiveTab] = useState("cancelreason");
  const [isMasterData, setIsMasterData] = useState("cancelreason");
  const [getMaster, setGetMaster] = useState([]);
  const [classdata, setClassData] = useState([]);
  const [cdata, setcData] = useState([]);

  const [classdata1, setClassData1] = useState([]);
  const [isUpdate, setIsUpdate] = useState("");
  const [clickedRowId, setClickedRowId] = useState(null);
  console.log(isUpdate, "Edit value");

 console.log(cdata)

  useEffect(() => {
    if (token) {
      dispatch(getMasterData(token, "data"));
    }
  }, [dispatch, token]);

  useEffect(() => {
    setClassData(
      masterData?.payload?.filter((obj) => obj.name === isMasterData)
    );

    setGetMaster(masterData?.payload);
  }, [masterData, isMasterData]);

  const handleGetSelectedData = () => {
    // if (cdata?.length === 0) {
    //   Swal.fire({
    //     text: "Please enter a input field.",
    //     icon: "error",
    //   });
    //   return;
    // }
    if (cdata?.value?.trim() === '') {
      Swal.fire({
        text: 'Please enter a value for the input field.',
        icon: 'error',
      });
      return;
    }

    dispatch(CreateConnession(token, JSON.stringify(cdata)))
      .then(() => {
        dispatch(getMasterData(token, "data"));
        setClickedRowId(null);
        setcData([])
      })
      .catch((error) => console.error(error));
   
  };
  const handleUpdateSelectedData = () => {
    if (isUpdate) {
      let data = {
        name: isUpdate.name,
        value: isUpdate.value,
      };
      console.log(data)
      dispatch(updateMasterData(token, isUpdate.id, JSON.stringify(data)))
        .then(() => {
          dispatch(getMasterData(token, "data"));
          setIsUpdate("");
        })
        .catch((error) => console.error(error));
    } else {

    }
  };



  const toggleVertical = (tab) => {
    if (verticalActiveTab !== tab) {
      setverticalActiveTab(tab);
      setIsMasterData(tab);
      setClickedRowId(null);
    }
  };
  // =====================
  // const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState({
    rowId: null,
    property: null,
  });

  const handleRowClick = (id, property) => {
    setEditingCell({ rowId: id, property });
  };

  const handleInputChangeFee = (e, id, property) => {
    const newValue = e.target.value;
    // const newData = classdata.map((row) => {
    //   if (row.id === id) {
    //     row[property] = newValue;
    //   }
    //   return row;
    // });
    const newData = classdata?.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [property]: e.target.value,
        };
      }
      return row;
    });

    const newData1 = classdata
      ?.filter((r) => r.id === id)
      .map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [property]: e.target.value,
          };
        }
        return row;
      });

    setIsUpdate(newData1[0]);

    setClassData(newData);
    const newclassData = classdata.map((row) => {
      if (row.id === id) {
        row[property] = newValue;
      }
      return row;
    });

    console.log(newclassData, "edit");
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
    const newRowId = Math.max(...classdata.map((row) => row.id)) + 1;
    const newRow = { id: newRowId, name: "", value: "" };
    setClassData([...classdata, newRow]);
    const newClassRowId = Math.max(...classdata.map((row) => row.id)) + 1;
    const newClassRow = {
      id: newClassRowId,
      name: isMasterData,
      value: "",
    };
    setClassData([...classdata, newClassRow]);
    setcData(newClassRow);
  };

  const handleDeleteRow = () => {
    if (clickedRowId) {
      dispatch(deleteMasterData(token, clickedRowId))
        .then(() => {
          dispatch(getMasterData(token, "data"));
          setClickedRowId(null);
        })
        .catch((error) => console.error(error));
      // const newData = data.filter((row) => row.id !== clickedRowId);
      // setData(newData);
      // setClickedRowId(null);
      // const newClassData = classdata.filter((row) => row.id !== clickedRowId);
      // setClassData(newClassData);
      // setClickedRowId(null);
    }
  };

  return (
    <>
      <div className="section-body">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center ">
            <div className="header-action">
              <h1 className="page-title"> HIGH SCHOOL</h1>
              {/* <ol className="breadcrumb page-breadcrumb">
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">Users</li>
              </ol> */}
            </div>
            <ul className="nav nav-tabs page-header-tab">
              {/* <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#">
                  Organisation List
                </a>
              </li> */}
              {/* <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#">Add User</a></li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="section-body mt-4">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <ul className="nav nav-tabs flex-column m-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link active my_active-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("cancelreason");
                        }}
                      >
                        <span>Cancel Reason</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link my_active-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("Concession");
                        }}
                      >
                        <span>Concession</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("designation");
                        }}
                      >
                        <span>Designation</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("document");
                        }}
                      >
                        <span>Document</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("Education");
                        }}
                      >
                        <span>Education</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("Occupation");
                        }}
                      >
                        <span>Occupation</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("MotherTongue");
                        }}
                      >
                        <span>Mother Tongue</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("Nationality");
                        }}
                      >
                        <span>Nationality</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("Religion");
                        }}
                      >
                        <span>Religion</span>{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#Basic-info"
                        onClick={() => {
                          toggleVertical("SpecialFee");
                        }}
                      >
                        <span>Special Fee</span>{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <Col className="col-lg-5 col-md-12 col-sm-12">
                <TabContent
                  activeTab={verticalActiveTab}
                  className="text-muted mt-4 mt-md-0"
                >
                  <TabPane tabId="cancelreason">
                    <h5>Cancel Reason</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>
                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="Concession">
                    <h5>Concession</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="designation">
                    <h5>Designation</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="document">
                    <h5>Document</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="Education">
                    <h5>{isMasterData}</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="Occupation">
                    <h5>{isMasterData}</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="MotherTongue">
                    <h5>Mother Tongue</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="Nationality">
                    <h5>{isMasterData}</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="Religion">
                    <h5>{isMasterData}</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                  <TabPane tabId="SpecialFee">
                    <h5>Special Fee</h5>
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive card"> </div>
                        <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Master Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classdata?.map((row, index) => (
                              <tr
                                key={row.id}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  handleRowRightClick(row.id);
                                }}
                              >
                                {/* <td>
                                      <input type="checkbox" id="checkbox1" />
                                    </td> */}
                                <td>{index + 1}</td>

                                <td
                                  onClick={() =>
                                    handleRowClick(row.id, "value")
                                  }
                                  onBlur={handleInputBlur}
                                >
                                  {editingCell.rowId === row.id &&
                                  editingCell.property === "value" ? (
                                    <input
                                      type="text"
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangeFee(e, row.id, "value")
                                      }
                                      autoFocus
                                    />
                                  ) : (
                                    row.value
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {clickedRowId && (
                          <ContextMenu
                            top={3}
                            left={0}
                            handleAddRow={handleAddRow}
                            handleDeleteRow={handleDeleteRow}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 pt-2 justify-content-center align-item-center">
                      <button
                        type="submit"
                        className="mr-2 btn btn-primary btn-lg "
                        onClick={handleGetSelectedData}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="mr-2 btn btn-secondary btn-lg "
                        onClick={handleUpdateSelectedData}
                      >
                       Update
                      </button>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Master;
