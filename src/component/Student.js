import * as React from 'react';
import { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, makeStyles, Paper,Button } from '@material-ui/core';
import { color } from '@mui/system';

const useStyles=makeStyles((theme) =>({
  root: {
    '& > *' : {
      margin : theme.spacing(1),
      width : '25ch',
    },
  },
}));

export default function Student() {
    const paperStyle = {padding:'50px 20px', width:600,margin:"50px auto"}
    const[fullName,setName]=useState('')
    const[sclass,setClass] = useState('')
    const[rollno,setRollNumber] = useState('')
    const[fees,setFees] = useState('')
    const[students,setStudents] = useState([])
    const classes = useStyles();

    const handleClick = (e) =>{
      e.preventDefault()
      const student = {fullName,sclass,rollno,fees}
      console.log(student)
      fetch("http://localhost:8086/addStudent",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(student)
      }).then(()=>{
        console.log("NEW Student Added")
      })
    }

    useEffect(()=>{
      fetch("http://localhost:8086/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setStudents(result);
      })
    },[])
    
  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:'blue'}}><u>Add Student</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value={fullName}
      onChange = {(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Class" variant="outlined" fullWidth 
      value={sclass}
      onChange = {(e)=> setClass(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Roll-Number" variant="outlined" fullWidth 
      value={rollno}
      onChange = {(e)=> setRollNumber(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Fees" variant="outlined" fullWidth 
      value={fees}
      onChange = {(e)=> setFees(e.target.value)}
      />
    <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>

    </Box>
    </Paper>

    <Paper elevation = {3} style = {paperStyle}>
      {students.map(student=>(
        <Paper elevation ={6} style = {{margin:"10px",padding:"15px",textAlign:"left"}} key ={student.id}>
          id:{student.id}<br/>
          Name : {student.fullName}<br/>
          Class : {student.sclass}<br/>
          Roll Number : {student.rollno}<br/>
          Fees : {student.fees}<br/>
          </Paper>
      ))
      }


    </Paper>
    </Container>
  );
}
