import { useEffect, useState } from 'react'
import './ViewStudent.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
export default function ViewStudent() {
    const navigate = useNavigate()
    const navigateToStudentForm = () => {
        navigate('/edit-singleElement/:id')
    }
    const { id } = useParams();
    const [search, setSearch] = useState("")
    const [studentInfo, setStudentInfo] = useState([{
        fullName: "",
        studentId: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: ""
    }]);
    function handleSearchChange(event) {
        setSearch(event.target.value)
    }
    useEffect(() => {
        axios.get("http://localhost:3001/students")
            .then((response) => {
                setStudentInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });



    }, []);

    function handleEditChange() {
        // navigate('/edit-singleElement/:id')

    }


    function handleDeleteChange(id) {
        axios.delete("http://localhost:3001/students/" + id)
            .then(() => {
                axios.get("http://localhost:3001/students")
                    .then((res) => setStudentInfo(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));



    }

    return (
        <div className='mostOuterSectionOfViewStudent'>
            <div><input type='text' className='searchInput' placeholder='search' value={search} onChange={handleSearchChange} /></div>
            {
                studentInfo
                    .filter((singleElement) =>
                        Object.values(singleElement || {})
                            .some((value) =>
                                String(value || "")
                                    .toLowerCase()
                                    .includes(String(search || "").toLowerCase())
                            )
                    )
                    .map((singleElement, index) => (
                        <div className='innerSectionProfileCard' key={index}>
                            <div className='headerTitle'>{singleElement.fullName}</div>
                            <div>{singleElement.studentId}</div>
                            <div>{singleElement.dateOfBirth}</div>
                            <div>{singleElement.phoneNumber}</div>
                            <div>{singleElement.email}</div>

                            <div className='buttonSectionOfViewStudent'>
                                <button className='editButton' onClick={() => navigate("/edit-singleElement/" + singleElement.id)}>
                                    Edit
                                </button>
                                <button className='deleteButton' onClick={() => handleDeleteChange(singleElement.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
            }


        </div>
    )
}