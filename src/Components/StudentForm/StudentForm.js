import { useNavigate, useParams } from 'react-router-dom'
import './StudentForm.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function StudentForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const navigateToStudentForm = () => {

    }
    const [fullName, setFullName] = useState("")
    const [studentId, setStudentId] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")

    function handleFullNameChange(event) {
        setFullName(event.target.value)
    }
    function handleStudentIdChange(event) {
        setStudentId(event.target.value)

    }
    function handleDateOfBirthChange(event) {
        setDateOfBirth(event.target.value)
    }

    function handlePhonenumberChange(event) {
        setPhoneNumber(event.target.value)

    }
    function handleEmailChange(event) {
        setEmail(event.target.value)
    }



    useEffect(() => {
        if (id) {
            axios.get("http://localhost:3001/students/" + id)
                .then((res) => {
                    setFullName(res.data.fullName);
                    setStudentId(res.data.studentId);
                    setDateOfBirth(res.data.dateOfBirth);
                    setPhoneNumber(res.data.phoneNumber);
                    setEmail(res.data.email);
                })
                .catch((err) => console.log(err));
        }
    }, [id]);


    function handleSaveClick(e) {
        // console.log(fullName,studentId,dateOfBirth,phoneNumber,email);
        e.preventDefault();

        if (id) {
            // UPDATE Existing Student
            axios.put("http://localhost:3001/students/" + id, {
                fullName,
                studentId,
                dateOfBirth,
                phoneNumber,
                email

            })
                .then(() => {
                    navigate('/viewStudent');
                })
                .catch(err => console.log(err));
        } else {
            // ADD New Student
            axios.post("http://localhost:3001/students", {
                fullName,
                studentId,
                dateOfBirth,
                phoneNumber,
                email
            })
                .then(() => {

                    setFullName("");
                    setStudentId("");
                    setDateOfBirth("");
                    setPhoneNumber("");
                    setEmail("");

                    navigate('/viewStudent');

                })
                .catch(error => console.log(error));
        }
    }

    function handleCancelChange() {
        navigate('/viewStudent')
    }

    return (
        <div className='mostOuterSection'>
            <div className='innerSection'>
                <div className='headerOfForm'>Student Form</div>
                <div className='labelsOfForm'><label>Full Name</label></div>
                <div><input type='text' placeholder='Full name' value={fullName} onChange={handleFullNameChange} /></div>
                <div className='labelsOfForm'><label>Student ID </label></div>
                <div><input type='number' placeholder='student id' value={studentId} onChange={handleStudentIdChange} /></div>
                <div className='labelsOfForm'><label>Date of Birth</label></div>
                <div><input type='date' placeholder='date of birth' value={dateOfBirth} onChange={handleDateOfBirthChange} /></div>
                <div className='labelsOfForm'><label>Phone Number</label></div>
                <div><input type='number' placeholder='phone number' value={phoneNumber} onChange={handlePhonenumberChange} /></div>
                <div className='labelsOfForm'><label>Email</label></div>
                <div><input type='email' placeholder='email' value={email} onChange={handleEmailChange} /></div>
                <div className='buttonSectionOfForm'>
                    <div><button onClick={handleSaveClick}>Save</button></div>
                    <div><button onClick={handleCancelChange}>Cancel</button></div>
                </div>
            </div>
        </div>
    )

}