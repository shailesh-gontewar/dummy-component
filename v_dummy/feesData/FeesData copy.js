import React, { useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import { Link } from 'react-router-dom'
import Select from "react-select";

const FeesData = () => {
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


                        </div>
                    </div>
                    <div className="section-body mt-4">
                        <div className="container-fluid">

                            {/* <div className="d-flex justify-content-between align-items-center "> */}
                            <div className="row clearfix">
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <ul className="nav nav-tabs flex-column py-2">
                                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Basic-info"> Basic Info</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-heads">Fees Heads</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Classes-section"> Classes & Section</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-structure">Fees Structure</a></li>
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
                                                            <label className="col-md-2 col-form-label">Organization <span className="text-danger">*</span></label>
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
                                                            <label className="col-md-2 col-form-label">School Name <span className="text-danger">*</span></label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" placeholder="Enter School Name" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-2 col-form-label">Address <span className="text-danger">*</span></label>
                                                            <div className="col-md-7">
                                                                <input type="text" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-md-2 col-form-label">State <span className="text-danger">*</span></label>
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
                                                            <label className="col-md-2 col-form-label">City <span className="text-danger">*</span></label>
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
                                                            <label className="col-md-2 col-form-label">Status <span className="text-danger">*</span></label>
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
                                                            <label className="col-md-2 col-form-label">School Logo</label>
                                                            <div className="col-md-7">
                                                                {/* <Dropzone /> */}
                                                                <input type="file" className="dropify" />
                                                                <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                                            </div>
                                                        </div>

                                                    </form>
                                                    <div className="col-sm-12 justify-content-center align-item-center mb-3">
                                                        <button type="submit" className="mr-1 btn btn-primary px-5"
                                                        // onClick={handleData}

                                                        >Save</button>
                                                        <button type="submit" className="btn btn-outline-secondary px-5">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="Fees-heads">

                                            <div className="col-lg-12 col-md-12 col-sm-12">

                                                <div className="card">
                                                    <form className="card-body">

                                                        <div className="form-group row">
                                                            <label className="col-lg-2 col-md-2 col-form-label mr-0"> Fee Head Code <span className="text-danger">*</span></label>
                                                            <div className="col-lg-2 col-md-2 mr-4">
                                                                <input type="text" className="form-control" />
                                                            </div>

                                                            <label className="col-lg-2 col-md-1 col-form-label ml-4 ">Fee Head Name <span className="text-danger">*</span></label>
                                                            <div className="col-lg-2 col-md-2 ">
                                                                <input type="text" className="form-control" />
                                                            </div>
                                                            <div className="col-md-2 col-lg-2 ml-4">
                                                                <button type="submit" className="btn btn-primary">Show</button>
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
                                                                    <th>Status</th>
                                                                    {/* <th>Action</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>Corrine Johnson</td>

                                                                    <td>Annual</td>
                                                                    <td>Annual</td>
                                                                    <td><input type="checkbox" id="checkbox1" /></td>
                                                                    {/* <td>
                                                                        <Link className="text-muted" to="/fees-details"><i className="fa fa-edit"></i></Link>
                                                                    </td> */}
                                                                </tr>
                                                                <tr>
                                                                    <td>2</td>
                                                                    <td>Gladys Smith</td>
                                                                    <td>Tuition</td>
                                                                    <td>Annual</td>
                                                                    <td><input type="checkbox" id="checkbox1" /></td>
                                                                    {/* <td>
                                                                        <Link className="text-muted" to="/fees-details"><i className="fa fa-edit"></i></Link>
                                                                    </td> */}
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="Classes-section">
                                            {/* <div class="row row-deck"> */}
                                                <ul className="nav nav-tabs ml-3">
                                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Student-all">Classes & Section List</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-add">Add Classes & Section</a></li>
                                                </ul>
                                                
                                                <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="Student-all">
                                                            <div className="table-responsive card">
                                                                <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th >Sr.No.</th>
                                                                            {/* <th>School Name</th> */}
                                                                            <th>Class</th>
                                                                            <th>Medium</th>
                                                                            <th>Min Strength</th>
                                                                            <th>Max Strength</th>
                                                                            <th>Active</th>
                                                                            {/* <th>Action</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            {/* <td>Corrine M Johnson</td> */}
                                                                            <td>A</td>
                                                                            <td>English</td>
                                                                            <td>30</td>
                                                                            <td>50</td>
                                                                            <td>Yes</td>
                                                                            {/* <td>
                                                                                <Link className="text-muted" data-toggle="tab" to="/classes&section-view"><i className="fa fa-edit"></i></Link>
                                                                            </td> */}
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            {/* <td><span className="font-16">Alice A Smith</span></td> */}
                                                                            <td>A</td>
                                                                            <td>English</td>
                                                                            <td>30</td>
                                                                            <td>50</td>
                                                                            <td>No</td>
                                                                            {/* <td>
                                                                                <Link className="text-muted" to="/classes&section-view"><i className="fa fa-edit"></i></Link>
                                                                            </td> */}
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
                                                                                    <button type="submit" className="btn btn-primary">Show</button>
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
                                            {/* </div> */}
                                        </div>

                                        <div className="tab-pane" id="Fees-structure">
                                            <div class="row row-deck">
                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                    <div className="card">
                                                        <form className="card-body">
                                                            <div className="form-group row">
                                                                <label className="col-md-2 col-form-label">Class Code :<span className="text-danger"></span></label>
                                                                <div className="col-md-3 ml-0 mr-4">
                                                                    <Select
                                                                        options={optionList}
                                                                        placeholder="Select Class Code"
                                                                        value={selectedOptions}
                                                                        onChange={handleSelect}
                                                                        isSearchable={true}
                                                                    />
                                                                </div>
                                                                <label className="col-lg-2 col-md-1 col-form-label ml-3">Concession : <span className="text-danger"></span></label>
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
                                                                    <button type="submit" className="btn btn-primary">Show</button>
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
                                                                                <th >Sr.No.</th>
                                                                                <th>Fee Type</th>
                                                                                <th>No.of Installments</th>
                                                                                <th>Total Amount <br />(Annually)</th>
                                                                                <tr>
                                                                                    <th colspan="2">Admission Type</th>
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
                                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                                <td>1</td>
                                                                                <td><span className="font-16">Corrine M Johnson</span></td>
                                                                                <td>1</td>
                                                                                <td>25000</td>
                                                                                <tr>
                                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3' /></td>
                                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3' /></td>
                                                                                </tr>
                                                                                {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                                                            </tr>
                                                                            <tr>
                                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                                <td>2</td>
                                                                                <td><span className="font-16">Alice A Smith</span></td>
                                                                                <td>1</td>
                                                                                <td>25000</td>
                                                                                <tr>
                                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3' /></td>
                                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3' /></td>
                                                                                </tr>
                                                                                {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                                                            </tr>
                                                                            <tr>
                                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                                <td>3</td>
                                                                                <td><span className="font-16">Ken Smith</span></td>
                                                                                <td>1</td>
                                                                                <td>25000</td>
                                                                                <tr>
                                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3' /> </td>
                                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3' /></td>
                                                                                </tr>
                                                                                {/* <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-edit"></i></Link></td> */}
                                                                            </tr>
                                                                            <tr>
                                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                                <td>4</td>
                                                                                <td><span className="font-16">Gerald K Smith</span></td>
                                                                                <td>1</td>
                                                                                <td>25000</td>
                                                                                <tr>
                                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3' /></td>
                                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3' /></td>
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
                                                <button type="submit" className="mr-2 btn btn-primary btn-lg">Save</button>
                                                <button type="submit" className="btn btn-outline-secondary btn-lg">Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                    {/* ###################### */}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* </div> */}

        </>
    )
}

export default FeesData