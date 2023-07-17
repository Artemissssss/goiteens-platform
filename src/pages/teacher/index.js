import { adminStatus } from "@/context/adminStatus";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { idOfRoom } from "@/context/idOfRoom";

function index() {
    const { status, setStatus } = useContext(adminStatus);
    const { roomID } = useContext(idOfRoom);
    const [taskList, setTaskList] = useState([])
    const router = useRouter()

    useEffect(()=>{
        if(status !== 2){
          router.push('/authorization')
        }else{
            fetch(`/api/classroom/${roomID}`).then(async (res)=>{const data = await res.json();setTaskList(data.tasks)});
        }
      },[])
      useEffect(()=>{
        if(status !== 2){
            router.push('/authorization')
        }
      },[status])

    const createUser = (e) =>{
        e.preventDefault();
        fetch(`/api/createUser`, {
            method: 'POST',
            body: JSON.stringify({"login":e.target[0].value,"password":e.target[1].value, status:parseInt(e.target[2].value),"idRoom":roomID}),
            headers: {
              'Content-Type': 'application/json'
            }})
    }
    const taskMake = (e) =>{
        e.preventDefault();
        fetch(`/api/taskMake`, {
            method: 'POST',
            body: JSON.stringify({"material":e.target[0].value,"idRoom":roomID}),
            headers: {
              'Content-Type': 'application/json'
            }})
    }
  return (
    <>
    <form onSubmit={taskMake}>
        <input type="text" placeholder="material" required/>
        <button>Submit</button>
    </form>
    <form onSubmit={createUser}>
        <input type="text" placeholder="login" required/>
        <input type="text" placeholder="password" required/>
        <input type="number" placeholder="status" defaultValue="3" readOnly/>
        <button>Submit</button>
    </form>
    {taskList.map((arr,i) => {return (
        <>
        <div key={i}>
            <h3>{arr.login}</h3>
            <p>{arr.text}</p>
            <p>{arr.answer}</p>
        </div>
        </>
    )})}
    </>
  )
}
export default index
