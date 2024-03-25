import axios from "axios"
import { useEffect, useState } from "react"
import getRequestedHeader from "../../utils/util"
import { IoLogOut } from "react-icons/io5";

const HomePage = () => {
    const headers = getRequestedHeader()
    const [users, setUsers] = useState([])
    const [loggedInUserData, setLoggedInUserData] = useState({})

    const fetchUsers = async () => {
        axios.get('http://localhost:9999/api/user/allUsers', headers).then((res)=>{
            if(res?.data?.success){
                setUsers(res?.data?.results)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    const fetchLoggedInUserData = async () => {
        axios.get('http://localhost:9999/api/auth/getUserData', headers).then((res)=>{
            if(res?.data?.success){
                setLoggedInUserData(res?.data?.result)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetchUsers()
        fetchLoggedInUserData()
    },[])

    const handleLogOut = () => {
        localStorage.clear()
    }

    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{height:'100vh', width:'30vw', display:'flex', flexDirection:'column', overflow:'scroll'}}>
                <div style={{display:'flex', flexDirection:'row', padding:'5px', alignItems:'center', background:'#0C6BF6', justifyContent:'space-between'}}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <img src={loggedInUserData?.profilePic} width={60} height={60} style={{padding:'10px'}}></img>
                        <div style={{display:'flex', flexDirection:'column', paddingLeft: '10px', alignItems:'start'}}>
                            <p style={{fontSize:'30px', fontWeight:'bold'}}>{loggedInUserData?.name}</p>
                            <p style={{fontSize:'15px'}}>🟢 Online</p>
                        </div>
                    </div>
                    <IoLogOut style={{color:'#fff', fontSize:'30px'}} onClick={handleLogOut}/>
                </div>
                <div>
                    {
                        users?.map((user, index) => {
                            return (
                                <>
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} key={index}>
                                    <img src={user?.profilePic} width={60} height={60} style={{padding:'10px'}}></img>
                                    <div style={{display:'flex', flexDirection:'column', paddingLeft: '10px', alignItems:'start'}}>
                                        <p style={{fontSize:'25px', fontWeight:'normal'}}>{user?.name}</p>
                                        <p style={{fontSize:'15px'}}>🟢 Online</p>
                                    </div>
                                </div>
                                <hr></hr>
                                </>

                            )
                        })
                    }
                </div>
            </div>
            <>
            <div style={{height:'100vh', width:'70vw', justifyContent:'center', alignItems:'center', display:'flex'}}>
                <div>
                    <h1>Hii {loggedInUserData?.name} Welcome to the Chat App!</h1>
                </div>
            </div>
            </>
            
        </div>
    )
}

export default HomePage