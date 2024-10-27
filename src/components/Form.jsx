import React, { useEffect, useState } from 'react'
import './Form.css'

function Form() {
    const [hobby, sethobby] = useState(["Dancing", "Swimming", "Walking", "Singing"]);
    const [country, setcountry] = useState(["india", "Australia", "Russia", "Luxemberg"]);
    const [nationality, setnationality] = useState(["Indian", "American", "Chinese", "African", "Russian"])
    const [data, setdata] = useState({})
    const [list, setlist] = useState([])
    const [pos, setpos] = useState(-1)
    let [error, seterror] = useState({})

    useEffect(() => {
        console.log("hhh");
        let stlist = JSON.parse(localStorage.getItem("about")) || []
        setlist(stlist)
    }, setlist)

    // ===========================submit edit

    let changeinput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setdata({ ...data, [name]: value })
    }
    let validatedata = () => {


        let err = {}
        if (!data.Firstname) {
            err.firstname = "Enter First Name"
        }
        if (!data.Middlename) {
            err.middlename = "Enter Middle Name"
        }
        if (!data.Lastname) {
            err.lastname = "Enter last Name"
        }
        if (!data.occupation) {
            err.occupation = "Enter occupation"
        }
        if (!data.DOB) {
            err.dob = "Enter DOB"
        }
        if (!data.marry) {
            err.marry = "select one option"
        }
        if (!data.country) {
            err.country = "Select country"
        }
        if (!data.gender) {
            err.gender = "Select Gender"
        }
        if (!data.email) {
            err.email = "Enter email"
        }
        if (!data.phone) {
            err.phone = "Enter phone no"
        }
        if (!data.nationality) {
            err.nationality = "select nationality "
        }
        return err;
    }
    let handlesubmit = (e) => {
        e.preventDefault()
        let validate = validatedata()
        if (Object.keys(validate).length > 0) {
            seterror(validate)

        }
        else {
            if (pos != -1) {
                list.map((v, i) => {
                    if (pos == i) {
                        list[i] = data
                    }
                    localStorage.setItem("about", JSON.stringify([...list]));
                })
            }
            else {
                let obj = [...list, data];
                setlist(obj);
                localStorage.setItem("about", JSON.stringify(obj));
                console.log(obj);
            }
            setpos(-1)
            setdata({})
            seterror({})
        }
    }
    // =================================delete
    let remove = (pos) => {
        let leftdata = list.filter((val, i) => {
            return pos != i
        })
        setlist(leftdata)
        localStorage.setItem("about", JSON.stringify(leftdata));
    }
    // ===============================update
    let update = (pos) => {
        setpos(pos)
        let res = list.filter((v, i) => {
            if (pos == i) {
                return v
            }
        })
        console.log(res[0]);
        setdata(res[0])
    }

    return (
        <>
            <div className="container">
                <div className="form">
                    <div>
                        <form action="" method='post' onSubmit={(e) => { handlesubmit(e) }}>
                            <div>
                                <div className='Name-list'>
                                    <input type="text" placeholder='First Name' className='inputs' name='Firstname' value={data.Firstname ? data.Firstname : ""} onChange={((e) => { changeinput(e) })} />

                                    <input type="text" placeholder='Middle Name' className='inputs' name='Middlename' value={data.Middlename ? data.Middlename : ""} onChange={((e) => { changeinput(e) })} />
                                    <input type="text" placeholder='Last Name' className='inputs' name='Lastname' value={data.Lastname ? data.Lastname : ""} onChange={((e) => { changeinput(e) })} />
                                </div>
                                <div className='Name-list' style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ color: "red", paddingLeft: "20px" }}>{error.firstname}</p>
                                    <p style={{ color: "red" }}>{error.middlename}</p>
                                    <p style={{ color: "red", paddingRight: "70px" }}>{error.lastname}</p>
                                </div>
                            </div>

                            <div style={{ padding: '20px 70px 20px 20px' }}>
                                <h3 className='info'>info ! please provide your exact name as per Adhaar to avail Aadhar based benifits on IRCTC eTicketing website </h3>
                                <div className='input-data'>
                                    <select name="occupation" id="" className='hobby' onChange={((e) => { changeinput(e) })} value={data.occupation ? data.occupation : ""}>
                                        <option >select occupation</option>
                                        {
                                            hobby.map((val) => {
                                                return (
                                                    <option>{val}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input type="date" name='DOB' className='dob' onChange={((e) => { changeinput(e) })} value={data.DOB ? data.DOB : ""} />
                                </div>
                                <div className='Name-list' style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                    <p style={{ color: "red" }}>{error.occupation}</p>
                                    <p style={{ color: "red", paddingRight: "70px" }}>{error.dob}</p>
                                </div>

                                {/* ============== */}
                                <div className='input-data'>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                                        <div className='radio-data'>
                                            <input type="radio" name='marry' value={"Married"} onChange={((e) => { changeinput(e) })} checked={data.marry == "Married" ? "checked" : ""} />
                                            <h3 className='radio-head'>Married</h3>
                                        </div>
                                        <div className='radio-data'>
                                            <input type="radio" name='marry' value={"unmarried"} onChange={((e) => { changeinput(e) })} checked={data.marry == "unmarried" ? "checked" : ""} />
                                            <h3 className='radio-head'>UnMarried</h3>
                                        </div>
                                    </div>
                                    <select name="country" id="" placeholder="select" className='hobby' onChange={((e) => { changeinput(e) })} value={data.country ? data.country : ""}>
                                        {
                                            country.map((val) => {
                                                return (
                                                    <option className='opt'>{val}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='Name-list' style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <p style={{ color: "red" }}>{error.marry}</p>
                                    <p style={{ color: "red", paddingRight: "70px" }}>{error.country}</p>
                                </div>
                                {/* ================== */}
                                <div className='input-data'>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                                        <div className='gender-data'>
                                            <input type="radio" name='gender' value={"Male"} onChange={((e) => { changeinput(e) })} checked={data.gender == "Male" ? "checked" : ""} />
                                            <h4 className='gender-head'>Male</h4>
                                        </div>
                                        <div className='gender-data'>
                                            <input type="radio" name='gender' value={"Female"} onChange={((e) => { changeinput(e) })} checked={data.gender == "Female" ? "checked" : ""} />
                                            <h4 className='gender-head'>Female</h4>
                                        </div>
                                        <div className='gender-data'>
                                            <input type="radio" name='gender' value={"Transgender"} onChange={((e) => { changeinput(e) })} checked={data.gender == "Transgender" ? "checked" : ""} />
                                            <h4 className='gender-head'>Transgender</h4>
                                        </div>
                                    </div>
                                    <input type="email" name='email' placeholder='email' className='mail' onChange={((e) => { changeinput(e) })} value={data.email ? data.email : ""} />
                                </div>
                                <div className='Name-list' style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px", marginBottom: "8px" }}>
                                    <p style={{ color: "red" }}>{error.gender}</p>
                                    <p style={{ color: "red", paddingRight: "70px" }}>{error.email}</p>
                                </div>
                                {/* ================= */}
                                <div className='input-data'>
                                    <div className='tel-data'>
                                        <input type="tel" className='phone1' placeholder='91' />
                                        <input type="tel" name='phone' className='phone' placeholder='Phone' onChange={((e) => { changeinput(e) })} value={data.phone ? data.phone : ""} />
                                    </div>
                                    <div style={{ width: "45%" }}>
                                        <select name="nationality" id="" placeholder="select" className='nationality' onChange={((e) => { changeinput(e) })} value={data.nationality ? data.nationality : ""}>
                                            <option >select a nationality</option>
                                            {
                                                nationality.map((val) => {
                                                    return (
                                                        <option>{val}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='Name-list' style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px", marginBottom: "8px" }}>
                                    <p style={{ color: "red" }}>{error.phone}</p>
                                    <p style={{ color: "red", paddingRight: "70px" }}>{error.nationality}</p>
                                </div>
                                {/* ================== */}
                                <div className='input-data'>
                                    <div>
                                        <button type='button' className='btn1'>Back</button>
                                    </div>
                                    <div>
                                        {/* <button type='submit' className='btn2'>Continue
                                            <h2 style={{ fontSize: "25px" }}>&#x2192;</h2>
                                        </button>  */}
                                        <input type="submit" className='btn2' value={pos != -1 ? "edit" : "continue"} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>?""
                </div>
            </div>
            {/* =================print */}
            <div className="container">
                <table className='table-list'>
                    <tr>
                        <th className='padding' >First Name</th>
                        <th className='padding'>Middle Name</th>
                        <th className='padding'>Last Name</th>
                        <th className='padding'>Occupation</th>
                        <th className='padding'>DOB</th>
                        <th className='padding'>Relationship</th>
                        <th className='padding'>Country</th>
                        <th className='padding'>Gender</th>
                        <th className='padding'>Email</th>
                        <th className='padding'>Phone</th>
                        <th className='padding'>Nationality</th>
                        <th className='padding'>delete</th>

                    </tr>
                    {
                        list.map((val, i) => {
                            return (
                                <>

                                    <tr key={i}>
                                        <td className='padding' >{val.Firstname}</td>
                                        <td className='padding' >{val.Middlename}</td>
                                        <td className='padding' >{val.Lastname}</td>
                                        <td className='padding' >{val.occupation}</td>
                                        <td className='padding' >{val.DOB}</td>
                                        <td className='padding' >{val.marry}</td>
                                        <td className='padding' >{val.country}</td>
                                        <td className='padding' >{val.gender}</td>
                                        <td className='padding' >{val.email}</td>
                                        <td className='padding' >{val.phone}</td>
                                        <td className='padding' >{val.nationality}</td>
                                        <td>
                                            <button onClick={() => { remove(i) }} style={{backgroundColor:"red", color:"white", margin:"2px"}}>delete</button>
                                            <button onClick={() => { update(i) }} style={{backgroundColor:"green", color:"white", margin:"2px"}}>update</button>
                                        </td>
                                    </tr>

                                </>
                            )
                        })
                    }

                    <tr>
                        <td></td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Form