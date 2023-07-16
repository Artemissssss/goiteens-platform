import { adminStatus } from "@/context/adminStatus";
import { idOfRoom } from "@/context/idOfRoom";
import { useContext } from "react";

function authorization() {
    const { status, setStatus } = useContext(adminStatus);
    const { roomID, setRoomID } = useContext(idOfRoom);
    const auth = (e) =>{
        e.preventDefault();
        fetch(`/api/authorization`, {
            method: 'POST',
            body: JSON.stringify({"login":e.target[0].value,"password":e.target[1].value}),
            headers: {
              'Content-Type': 'application/json'
            }}).then(async (res)=>{const data = await res.json();setStatus(data[0].status);setRoomID(data[1].idRoom)});
    }

  return (
    <form onSubmit={auth}>
        <input type="text" placeholder="login" required/>
        <input type="password" placeholder="password" required/>
        <button>Submit</button>
    </form>
  )
}
export default authorization