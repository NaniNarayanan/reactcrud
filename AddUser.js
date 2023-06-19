import React, {useState, useEffect} from 'react';
import { useNavigate, useParams, Link} from "react-router-dom";
import '../user/adduser.css';
import axios from 'axios';
import { toast } from "react-toastify";

const initialState = {
    firstname:"",
    lastname:"",
    username:"",
    password:"",
    email:"",
}

function AddUser() {

    const [state, setState] = useState(initialState);

    const {firstname, lastname, username, password, email} = state;

    const navigate = useNavigate;

    const { id } = useParams();

    useEffect(() =>{
        axios.get(`http://localhost:8080/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}));
    },[id]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!firstname || !lastname || !username || !password || !email){
            toast.error("Please provide value into each input field");
        }else{
        if(!id){
            axios.post("http://localhost:8080/api/post",{
                firstname,
                lastname, 
                username,
                password,  
                email,
            }).then(()=>{
                setState({firstname:"",lastname:"",username:"",password:"",email:""});
            })
            .catch((err)=> toast.error(err.response.data));
            toast.success("Contact Added Successfully")
           
        }else{
            axios.put(`http://localhost:8080/api/update/${id}`,{
                firstname,
                lastname, 
                username,
                password,  
                email,
            }).then(()=>{
                setState({firstname:"",lastname:"",username:"",password:"",email:""});
            })
            .catch((err)=> toast.error(err.response.data));
            toast.success("Contact Updated Successfully")
        }
            
            setTimeout(()=> navigate('/user'),500)
        }
    }

    const handleInputChange = (e) =>{
        const { name, value} = e.target;
        setState({...state, [name]: value});
    }

  return (
    <div style={{marginTop:"100px"}}>
        <form style={{margin:"auto", padding:"15px", maxWidth:"400px", 
        alignContent:"center"}} onSubmit={handleSubmit}>
            <label htmlFor='firstname'>Name</label>
            <input type='text' id='firstname' name='firstname' placeholder='Your Name' value={firstname || ""} onChange={handleInputChange}/>
            <label htmlFor='lastname'>LastName</label>
            <input type='text' id='lastname' name='lastname' placeholder='Your Last Name' value={lastname || "" } onChange={handleInputChange}/>
            <label htmlFor='username'>UserName</label>
            <input type='text' id='username' name='username' placeholder='Your User Name' value={username || "" } onChange={handleInputChange}/>
            <label htmlFor='password'>Password</label>
            <input type='text' id='password' name='password' placeholder='Enter Password' value={password || "" } onChange={handleInputChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your email' value={email || ""} onChange={handleInputChange}/>
            <input type='submit' value={id ? "update" : "save"}/>
            <Link to="/user">
                <input type='button' value="Go Back"/>
            </Link>
        </form>
    </div>
  )
}

export default AddUser