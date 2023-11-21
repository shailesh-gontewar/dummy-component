import React, { useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import { Link } from 'react-router-dom'
import Select from "react-select";

const ClassesSection = () => {
    const [selectedOptions, setSelectedOptions] = useState();

    const optionList = [
        { value: "red", label: "Select Options here" },
        { value: "green", label: "Green" },
    ];
    function handleSelect(data) {
        setSelectedOptions(data);
    }
    return (
        <>
            <div id="main_content">
                <Sidebar />
                <div className="page">

                    <div className="section-body">
                        <div className="container-fluid">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="header-action">
                                    {/* <h1 className="page-title">SANJUBA HIGH SCHOOL</h1> */}
                                    <ol className="breadcrumb page-breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">School Registration</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Classes & Section</li>
                                    </ol>
                                </div>
                                <ul className="nav nav-tabs page-header-tab">
                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Student-all">Classes & Section List</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-add">Add Classes & Section</a></li>
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
                                                    <th >Sr.No.</th>
                                                    <th>School Name</th>
                                                    <th>Class</th>
                                                    <th>Medium</th>
                                                    <th>Min Strength</th>
                                                    <th>Max Strength</th>
                                                    <th>Active</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Corrine M Johnson</td>
                                                    <td>A</td>
                                                    <td>English</td>
                                                    <td>30</td>
                                                    <td>50</td>
                                                    <td>Yes</td>
                                                    <td>
                                                        <Link className="text-muted" to="/classes&section-view"><i className="fa fa-eye"></i></Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td><span className="font-16">Alice A Smith</span></td>
                                                    <td>A</td>
                                                    <td>English</td>
                                                    <td>30</td>
                                                    <td>50</td>
                                                    <td>No</td>
                                                    <td>
                                                        <Link className="text-muted" to="/classes&section-view"><i className="fa fa-eye"></i></Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="tab-pane" id="Student-add">
                                    <div className="row clearfix">
                                        <div className="col-lg-10 col-md-12 col-sm-12">
                                            <div className="card">
                                                <form className="card-body">
                                                    <div className="form-group row">
                                                        <label className="col-lg-2 col-md-2 col-form-label">Class Code <span className="text-danger">*</span></label>
                                                        <div className="col-md-3 mr-3">
                                                            <Select
                                                                options={optionList}
                                                                placeholder="Select Code"
                                                                value={selectedOptions}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                            />
                                                        </div>
                                                        <label className="col-md-2 col-form-label ml-5">Class Name <span className="text-danger">*</span></label>
                                                        <div className="col-md-3">
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-md-1">
                                                            <button type="submit" className="btn btn-primary">Search</button>
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
                                                                        <th >Sr.No.</th>
                                                                        <th>Section</th>
                                                                        <th>Medium</th>
                                                                        <th>Min Strength</th>
                                                                        <th>Max Strength</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                                        <td>1</td>
                                                                        <td><span className="font-16">A</span></td>
                                                                        <td className='col-lg-2'><Select
                                                                            options={optionList}
                                                                            placeholder="Select Medium"
                                                                            value={selectedOptions}
                                                                            onChange={handleSelect}
                                                                            isSearchable={true}
                                                                        /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                                        <td>2</td>
                                                                        <td><span className="font-16">B</span></td>
                                                                        <td className='col-lg-2'><Select
                                                                            options={optionList}
                                                                            placeholder="Select Medium"
                                                                            value={selectedOptions}
                                                                            onChange={handleSelect}
                                                                            isSearchable={true}
                                                                        /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                                        <td>3</td>
                                                                        <td><span className="font-16">C</span></td>
                                                                        <td className='col-lg-2'><Select
                                                                            options={optionList}
                                                                            placeholder="Select Medium"
                                                                            value={selectedOptions}
                                                                            onChange={handleSelect}
                                                                            isSearchable={true}
                                                                        /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                                        <td>4</td>
                                                                        <td><span className="font-16">D</span></td>
                                                                        <td className='col-lg-2'><Select
                                                                            options={optionList}
                                                                            placeholder="Select Medium"
                                                                            value={selectedOptions}
                                                                            onChange={handleSelect}
                                                                            isSearchable={true}
                                                                        /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
                                                                        <td><input type="text" className="form-control w-50" /></td>
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
                                        <button type="submit" className="mr-2 btn btn-primary btn-lg ">Save</button>
                                        <button type="submit" className="btn btn-outline-secondary btn-lg">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ClassesSection