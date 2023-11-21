import React, { useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import SweetAlert from 'sweetalert2-react';
import Select from "react-select";

const SchoolDetails = () => {
    const [show, setShow] = useState(false);
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
                                    <h1 className="page-title">School View</h1>
                                    <ol className="breadcrumb page-breadcrumb">
                                        {/* <li className="breadcrumb-item"><a href="#">Vidyamate</a></li> */}
                                        <li className="breadcrumb-item"><a href="school-registration">School List</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">School View</li>
                                    </ol>
                                </div>
                                {/* <ul className="nav nav-tabs page-header-tab">
                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="school-registration">School List</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="school-registration">School Registration</a></li>
                                </ul> */}
                            </div>
                        </div>
                    </div>

                    <div className="section-body mt-4">
                        <div className="container-fluid">
                            <div className="row row-deck">
                                <div className="col-lg-7 col-md-12 col-sm-12">
                                    <div className="card">
                                        <div className="card-title m-2 text-right">
                                            <a href="#" className="card-options-remove" data-toggle="card-remove" onClick={() => setShow(true)} > <i class="fa fa-trash-o text-danger">
                                            </i></a><hr/>
                                        </div>
                                        <form className="card-body">
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Organization <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <Select
                                                        options={optionList}
                                                        placeholder="Select Organization"
                                                        value={selectedOptions}
                                                        onChange={handleSelect}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">School Name <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" placeholder="Enter School name" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Contact Person Name<span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" value="Corrine M Johnson" placeholder="Enter Contact Person name" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Contact Number<span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="number" className="form-control" value="(417) 646-7483" placeholder="Enter Contact Number" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Contact Email <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="email" className="form-control" value="ken@gmail.com" placeholder="Enter Contact Email" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Address <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="text" className="form-control" placeholder="Enter Address Here" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">State <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <Select
                                                        options={optionList}
                                                        placeholder="Select State"
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
                                                        placeholder="Select City"
                                                        value={selectedOptions}
                                                        onChange={handleSelect}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Pincode<span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <input type="number" className="form-control" placeholder="Enter Pincode" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Status <span className="text-danger">*</span></label>
                                                <div className="col-md-9">
                                                    <Select
                                                        options={optionList}
                                                        placeholder="Select Status"
                                                        value={selectedOptions}
                                                        onChange={handleSelect}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">School Logo</label>
                                                <div className="col-md-9">
                                                    {/* <Dropzone /> */}
                                                    <input type="file" className="dropify" />
                                                    <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <SweetAlert
                                        show={show}
                                        title="Are you sure?"
                                        text="You will not be able to recover this imaginary file!"
                                        type="warning"
                                        showCancelButton={true}
                                        confirmButtonColor="#dc3545"
                                        confirmButtonText="Yes, delete it!"
                                        closeOnConfirm={false}
                                        onConfirm={() => setShow(false)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SchoolDetails