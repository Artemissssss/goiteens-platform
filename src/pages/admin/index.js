import { adminStatus } from "@/context/adminStatus";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { nanoid } from 'nanoid'

function index() {
    const { status, setStatus } = useContext(adminStatus);
    const router = useRouter()

    useEffect(()=>{
        if(status !== 1){
          router.push('/authorization')
        }
      },[])
      useEffect(()=>{
        if(status !== 1){
            router.push('/authorization')
        }
      },[status])

    const createUser = (e) =>{
        e.preventDefault();
        fetch(`/api/createUser`, {
            method: 'POST',
            body: JSON.stringify({"login":e.target[0].value,"password":e.target[1].value, status:parseInt(e.target[2].value),"idRoom":e.target[3].value}),
            headers: {
              'Content-Type': 'application/json'
            }}).then(async (res)=>{const data = await res.json();setStatus(data.status)});
    }
    const createRoom = (e) =>{
        e.preventDefault();
        fetch(`/api/createRoom`, {
            method: 'POST',
            body: JSON.stringify({"name":e.target[0].value,"material":e.target[1].value,"idRoom":e.target[2].value,"tasks":[]}),
            headers: {
              'Content-Type': 'application/json'
            }}).then(async (res)=>{const data = await res.json();setStatus(data.status)});
    }
  return (
    <>
    <form onSubmit={createRoom}>
        <input type="text" placeholder="name" required/>
        <input type="text" placeholder="theme-route" required/>
        <input type="text" defaultValue={nanoid()} readOnly/>
        <button>Submit</button>
    </form>
    <form onSubmit={createUser}>
        <input type="text" placeholder="login" required/>
        <input type="text" placeholder="password" required/>
        <input type="number" placeholder="status" step={1} min={2} max={3} required/>
        <input type="text" placeholder="id of classroom" required/>
        <button>Submit</button>
    </form>
    </>
  )
}
export default index