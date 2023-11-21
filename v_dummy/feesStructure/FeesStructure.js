import React, { useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import { Link } from 'react-router-dom'
import Select from "react-select";

const FeesStructure = () => {
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
                                    <h1 className="page-title">Fees Structure</h1>
                                    <ol className="breadcrumb page-breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">School Registration</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Fees Structure</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section-body mt-4">
                        <div className="container-fluid">
                            <div class="row row-deck">
                                <div className="col-lg-11 col-md-12 col-sm-12">
                                    <div className="card">
                                        <form className="card-body">
                                            <div className="form-group row">
                                                <label className="col-md-1 col-form-label mr-4">Class Code <span className="text-danger"></span></label>
                                                <div className="col-md-3 ml-0 mr-4">
                                                    <Select
                                                        options={optionList}
                                                        placeholder="Select Class Code"
                                                        value={selectedOptions}
                                                        onChange={handleSelect}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                                <label className="col-lg-1 col-md-1 col-form-label ml-3">Concession <span className="text-danger"></span></label>
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
                                                                <th>Action</th>
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
                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3'/></td>
                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3'/></td>
                                                                </tr>
                                                                <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-eye"></i></Link></td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                <td>2</td>
                                                                <td><span className="font-16">Alice A Smith</span></td>
                                                                <td>1</td>
                                                                <td>25000</td>
                                                                <tr>
                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3' /></td>
                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3'/></td>
                                                                </tr>
                                                                <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-eye"></i></Link></td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                <td>3</td>
                                                                <td><span className="font-16">Ken Smith</span></td>
                                                                <td>1</td>
                                                                <td>25000</td>
                                                                <tr>
                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3'/> </td>
                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3'/></td>
                                                                </tr>
                                                                <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-eye"></i></Link></td>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="checkbox" id="checkbox1" /></td>
                                                                <td>4</td>
                                                                <td><span className="font-16">Gerald K Smith</span></td>
                                                                <td>1</td>
                                                                <td>25000</td>
                                                                <tr>
                                                                    <td><input type="checkbox" id="checkbox1" className='mr-3'/></td>
                                                                    <td><input type="checkbox" id="checkbox1" className='ml-3'/></td>
                                                                </tr>
                                                                <td><Link className="text-muted" to="/feesStructure-view"><i className="fa fa-eye"></i></Link></td>
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
                </div>
            </div>
        </>
    )
}

export default FeesStructure