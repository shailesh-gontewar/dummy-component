import React, { useState } from 'react'
import SweetAlert from 'sweetalert2-react';
import Sidebar from '../../Layout/Sidebar';
import Select from "react-select";


const EditFeesStructure = () => {
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
                            {/* <div className="d-flex justify-content-between align-items-center ">
                                <div className="header-action">
                                    <h1 className="page-title">Fees Structure</h1>
                                    <ol className="breadcrumb page-breadcrumb">
                                        <li className="breadcrumb-item"><a href="/fees-data">Fees Structure</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Fees Structure View</li>
                                    </ol>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="section-body mt-4">
                        <div className="container-fluid">
                            <div className="row clearfix">
                            <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <ul className="nav nav-tabs flex-column py-2">
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Basic-info"> Basic Info</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-heads">Fees Heads</a></li>
                                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Classes-section"> Classes & Section</a></li>
                                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Fees-structure">Fees Structure</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="row row-deck"> */}
                                    <div className="col-lg-8 col-md-12 col-sm-12">
                                        <div className="card">
                                        <div className='card-title'>
                                            <div class="row align-items-center px-4 pt-3">
                                                <div class="col-auto">
                                                    <a href="fees-data" class="back-button"><i class="fa fa-arrow-left"></i></a>
                                                </div>
                                                <div class="col">
                                                    <h5 class="title">Back</h5>
                                                </div>
                                                <div class="col-auto">
                                                    <a href="#" class="remove-icon" data-toggle="card-remove" onClick={() => setShow(true)}>
                                                        <i class="fa fa-trash-o text-danger"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                            <form className="card-body pt-0">
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Fee Type<span className="text-danger">*</span></label>
                                                    <div className="col-md-6">
                                                        <Select
                                                            options={optionList}
                                                            placeholder="Select Fee Type"
                                                            value={selectedOptions}
                                                            onChange={handleSelect}
                                                            isSearchable={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">No. Of Installments<span className="text-danger">*</span></label>
                                                    <div className="col-md-6">
                                                        <input type="number" className="form-control" placeholder="Enter No. Of Installments" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Total Amount (Annually)<span className="text-danger">*</span></label>
                                                    <div className="col-md-6">
                                                        <input type="number" className="form-control" placeholder="Enter Total Amount" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Admission Type<span className="text-danger">*</span></label>
                                                    <div className="col-md-6">
                                                        <select className="form-control input-height" name="Designation">
                                                            <option value="">Select...</option>
                                                            <option value="Category 1">New</option>
                                                            <option value="Category 1">Old</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Admin<span className="text-danger">*</span></label>
                                                    <div className="col-md-6">
                                                        <select className="form-control input-height" name="Designation">
                                                            <option value="">Select...</option>
                                                            <option value="Category 1">Yes</option>
                                                            <option value="Category 1">No</option>
                                                        </select>
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
            {/* </div> */}
        </>
    )
}

export default EditFeesStructure