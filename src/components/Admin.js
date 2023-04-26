import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const Admin = () => {

    const [verified, setverified] = useState(true);

    const [record, setRecord] = useState([]);
    const navigate = useNavigate();
    
     
     const [modeldata, setModeldata] = useState({
        registerId: '',
        email: '',
        firstname: '',
        lastname: '',
        addressLineOne: '',
        addressLineTwo: '',
        pincode: '',
        dob: '',
        phonenumber: '',
        pwd: ''
    })
    const logout = async () => {
        navigate('/login');
    }

    const getData = () => {
        fetch('http://localhost:8080/api/v1/all')
            .then(resposne => resposne.json())
            .then(res => setRecord(res))
    }

    useEffect(() => {
        getData();
    }, [])

    const showDetail = (id) => {

        fetch(`http://localhost:8080/api/v1/user/${id}`)
            .then(resposne => resposne.json())
            .then(res => setModeldata(res))
    }
   

    const handleAvailabilityUpdate =(id) => {
        
    fetch(`http://localhost:8080/api/v1/${id}/verified`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        verified: !verified
      })
    })
    .then(response => {
      if (response.ok) {
        setverified(!verified);
      }
    });

    }

    return (
        <div class="container mt-2">
            

            <div class="row mt-2 ">
                <div class="col-lg-1 col-md-6 col-sm-12">
                </div>
                <div class="col-lg-11 col-md-6 col-sm-12">
                    <h1 class="mt-3 mb-3 text-secondary">
                    List of users registered 
                    </h1>
                    <br/>
                    <div class=" mt-5">
                        <table class="table table-striped table-sm">
                        <thead class="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                               
                                <th>Show Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                          {record.map((names,index)=>
                           <tr key={index}>
                               <td>{names.registerId}</td>
                              <td>{names.firstname} {names.lastname}</td>
                              
                              <td><button class="btn btn-primary" onClick={(e)=>showDetail(names.registerId )} data-toggle="modal" data-target="#myModal">Get Details</button></td>
                           </tr>
                           )}
                        </tbody>
                        </table>
                        
                    </div>
                </div>

            </div>


            {/* 
 Model Box  */}

            <div class="modal" id="myModal">
                <div class="modal-dialog" style={{ width: "700px" }}>
                    <div class="modal-content">
                        <div class="modal-header">
                            {/* <h4 class="modal-title">Row No : {modeldata.registerId}</h4> */}
                            {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                        </div>

                        <div class="modal-body">
                            <table id="info"class="table table-striped table-dark">
                                <thead id="info" class="thead-light">
                                    <tr >
                                        <th id="info" scope="col">Register No</th>
                                        <th id="info" scope="col">Name</th>
                                        <th id="info" scope="col">Address</th>
                                        <th id="info" scope="col">Email</th>
                                        <th id="info" scope="col">Date OF Birth</th>
                                        <th id="info" scope="col">Phone Number</th>
                                        <th id="info" scope="col">Password</th>
                                        <th id="info" scope="col">User Verify</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td id="info">{modeldata.registerId}</td>
                                        
                                        <td id="info">{modeldata.firstname} {modeldata.lastname}</td>
                                        <td id="info">{modeldata.addressLineOne} {modeldata.addressLineTwo} {modeldata.pincode}</td>
                                        <td id="info">{modeldata.email}</td>
                                        <td id="info">{modeldata.dob}</td>
                                        <td id="info" >{modeldata.phonenumber}</td>
                                        <td id="info"> {modeldata.pwd}</td>
                                        <td id="info"><input type="checkbox" onClick={(e)=>handleAvailabilityUpdate(modeldata.registerId )}/></td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>


                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                        </div>

                    </div>
                </div>
            </div>
            <div className="HomeflexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
        
    )
    
}


export default Admin

