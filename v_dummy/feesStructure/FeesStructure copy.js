import React from 'react'
import Sidebar from '../../Layout/Sidebar'

const FeesStructure = () => {
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
                                        <li className="breadcrumb-item"><a href="#">Vidyamate</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Fees Structure</li>
                                    </ol>
                                </div>
                                <ul className="nav nav-tabs page-header-tab">
                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Student-all">Fee Structure List</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-add">Fee Structure Registration</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="section-body mt-4">
                        <div className="container-fluid">
                        <div class="tab-pane active" id="fees-list">
                        <div class="row row-deck">
                            <div className="card">
                            <form className="card-body">
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Fee Type <span className="text-danger">*</span></label>
                                    <div className="col-md-7">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">No. of installment</label>
                                    <div className="col-md-7">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Total Amount <span className="text-danger">*</span></label>
                                    <div className="col-md-7">
                                        <input data-provide="datepicker" data-date-autoclose="true" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Payment Duration <span className="text-danger">*</span></label>
                                    <div className="col-md-7 ">
                                        <input type="radio" className="mr-4" name="payment_duration" value="option1"/> Monthly
                                        <input type="radio" className="mx-4" name="payment_duration" value="option2"/> Annually
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label">Admission Type<span className="text-danger">*</span></label>
                                    <div className="col-md-7 ">
                                        <input type="radio" className="mr-4" name="admission_type" value="option1"/> New 
                                        <input type="radio" className="mx-5" name="admission_type" value="option2"/> Old
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label"></label>
                                    <div className="col-md-7">
                                        <button type="submit" className="btn btn-primary w-25">Save</button>
                                    </div>
                                </div>
                            </form>
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

export default FeesStructure