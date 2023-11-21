import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import { Link } from 'react-router-dom'

const FeesHeads = () => {
    return (
        <>
            <div id="main_content">
                <Sidebar />
                <div className="page">

                    <div className="section-body">
                        <div className="container-fluid">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="header-action">
                                    <h1 className="page-title">SANJUBA HIGH SCHOOL</h1>
                                    <ol className="breadcrumb page-breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">School Registration</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Fees Head</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section-body mt-4">
                        <div className="container-fluid">
                            <div className="tab-content">
                            <div className="col-lg-10 col-md-12 col-sm-12">
                                <div className="card">
                                    <form className="card-body">

                                        <div className="form-group row">
                                            <label className="col-lg-2 col-md-2 col-form-label mr-0"> Fee Head Code <span className="text-danger">*</span></label>
                                            <div className="col-lg-3 col-md-2 mr-4">
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
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Corrine Johnson</td>

                                                        <td>Annual</td>
                                                        <td>Annual</td>
                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                        {/* <td><input type="checkbox" id="checkbox1" /></td> */}
                                                        <td>
                                                            <Link className="text-muted" to="/fees-details"><i className="fa fa-eye"></i></Link>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Gladys Smith</td>
                                                        <td>Tuition</td>
                                                        <td>Annual</td>
                                                        <td><input type="checkbox" id="checkbox1" /></td>
                                                        {/* <td><input type="checkbox" id="checkbox1" /></td> */}
                                                        <td>
                                                            <Link className="text-muted" to="/fees-details"><i className="fa fa-eye"></i></Link>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FeesHeads