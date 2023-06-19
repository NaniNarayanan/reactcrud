import React, { useEffect, useState } from 'react';
import '../user/user.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const User = () => {
    const [data, setData] = useState([]);

    const loadData = async () =>{
      const response = await axios.get("http://localhost:8080/api/get");
      setData(response.data);
    }

    useEffect(()=>{
      loadData();
    },[]);

  const deleteContact = (id) =>{
    if(
      window.confirm("Are you sure wants to the delete...?")
    ){
      axios.delete(`http://localhost:8080/api/remove/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  }
  return (
    <div>
        <div style={{textAlign:"center"}}>
              <h1 style={{letterSpacing:"3px"}}>Add Users Management</h1>
              <div style={{width:"900px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
        </div>
    <div style={{marginTop:"150px"}}>
      <Link to="/user/adduser">
        <button className='btn btn-contact' style={{backgroundColor:"#e82764", marginBottom:"10px", marginLeft:"47%"}}>Add User</button>
      </Link>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>FirstName</th>
            <th style={{textAlign:"center"}}>LastName</th>
            <th style={{textAlign:"center"}}>UserName</th>
            <th style={{textAlign:"center"}}>Password</th>
            <th style={{textAlign:"center"}}>Email</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>{
            return (
              <tr key={item.id}>
                {/* <th scope='row'>{index+1}</th> */}
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/user/adduser/update/${item.id}`}>
                    <button className='btn edit' style={{backgroundColor:"#008cba"}}>Edit</button>
                  </Link>
                  <button className='btn delete' style={{backgroundColor:"#f44336"}} onClick={()=> deleteContact(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default User;