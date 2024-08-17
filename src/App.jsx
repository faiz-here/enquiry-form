import React, { useState } from 'react'
import "./app.css"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let [formData, setFormData] = useState({
    uName: "",
    uEmail: "",
    uPhone: "",
    uMessage: "",
    index: ""
  })
  let getValue = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData)
  }
  let [userData, setUserData] = useState([])

  let [inputError, setInputError] = useState({
    emailError: false,
    phoneError: false
  })


  let submitform = (e) => {
    e.preventDefault()

    let currentUserFormdata = {
      uName: formData.uName,
      uEmail: formData.uEmail,
      uPhone: formData.uPhone,
      uMessage: formData.uMessage,
    }

    if (formData.index === "") {
      let checkFilterUser = userData.filter((value, i) => value.uEmail == formData.uEmail || value.uPhone == formData.uPhone)
      if (checkFilterUser.length == 1) {
        setInputError({
          emailError: true,
          phoneError: true,
        })
        // alert("email or phone already exist")
        toast.error("email or phone already exist")


      }
      else if (formData.uName == "" || formData.uEmail == "" || formData.uPhone == "" || formData.uMessage == "") {
        alert("All fields are requird")
      }
      else {
        let oldUserData = [...userData, currentUserFormdata]
        setUserData(oldUserData)
        setFormData(
          {
            uName: "",
            uEmail: "",
            uPhone: "",
            uMessage: "",
            index: ""
          }
        )
        setInputError({
          emailError: false,
          phoneError: false,
        })
        toast("Field updated")
      }
    }
    else {
      let editIndex = formData.index
      let oldData = userData;

      let checkFilterUser = userData.filter((value, i) => (value.uEmail == formData.uEmail || value.uPhone == formData.uPhone) && i != editIndex)
      if (checkFilterUser.length == 1) {
        toast.error("email or phone already exist")
      }

      else {
        oldData[editIndex]["uName"] = formData.uName;
        oldData[editIndex]["uEmail"] = formData.uEmail;
        oldData[editIndex]["uPhone"] = formData.uPhone;
        oldData[editIndex]["uMessage"] = formData.uMessage;
        setUserData(oldData)
        setFormData(
          {
            uName: "",
            uEmail: "",
            uPhone: "",
            uMessage: "",
            index: ""
          }
        )
      }
    }
  }
  let deleterow = (indexNumber) => {
    let userdataAfterdelete = userData.filter((value, i) => i != indexNumber)
    setUserData(userdataAfterdelete);
    toast.success("Data Deleted Successfully")
  }
  let updaterow = (indexnumber) => {
    let updateUserData = userData.filter((value, i) => indexnumber == i)
    let newUpdateUserData = updateUserData[0]
    newUpdateUserData["index"] = indexnumber
    setFormData(
      // newUpdateUserData

      {
        uName: newUpdateUserData.uName,
        uEmail: newUpdateUserData.uEmail,
        uPhone: newUpdateUserData.uPhone,
        uMessage: newUpdateUserData.uMessage,
        index: newUpdateUserData.index,
        // index: indexnumber
      }
    )
    // console.log(indexnumber);
    // let ameer = userData.filter((value, index)=> newUpdateUserData==value)
    // console.log(ameer);

  }

  return (
    <>
      <div className="container">
        <ToastContainer />
        <h1>Enquiry now</h1>

        <form action="" onSubmit={submitform}>
          <div className="inputs">
            <label htmlFor="">Name</label>
            <div> <input type="text" placeholder='Your Name' onChange={getValue} value={formData.uName} name='uName' /></div>
          </div>
          <div className="inputs">
            <label htmlFor="">Email</label>
            <div> <input type="text" placeholder='Email should be unique' onChange={getValue} value={formData.uEmail} name='uEmail'
              className={`emailfield ${(inputError.emailError) ? 'error' : ''}`} /></div>
          </div>
          <div className="inputs">
            <label htmlFor="">Phone</label>
            <div> <input type="number" maxLength={10} placeholder='Phone should be unique' onChange={getValue} value={formData.uPhone} name='uPhone'
              className={`emailfield ${(inputError.emailError) ? 'error' : ''}`} /></div>
          </div>
          <div className="inputs">
            <label htmlFor="">Message</label>
            <div> <textarea onChange={getValue} placeholder="Your Message" value={formData.uMessage} name="uMessage" id="customTextarea" cols="30" rows="10"></textarea></div>
          </div>
          <button className='btn'>
            {(formData.index != "" || formData.index === 0) ? "Update" : "Save"}
          </button>
        </form>
        <table className="tables table table-bordered table-hover">
          <thead className="thead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Message</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {(userData.length >= 1) ?
              userData.map((value, index) => {
                return (
                  <tr key={index} >
                    <td scope="row"> {index + 1}. </td>
                    <td> {value.uName} </td>
                    <td> {value.uEmail} </td>
                    <td> {value.uPhone} </td>
                    <td> {value.uMessage} </td>
                    <td>
                      <button className='btn' onClick={() => deleterow(index)}>Delete</button>
                      <button className='btn' onClick={() => updaterow(index)} >Edit</button>
                    </td>
                  </tr>
                  
                )
              })
              :
              <tr>
                <td colSpan={6} className="bg-white custom-font"> No data found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
export default App