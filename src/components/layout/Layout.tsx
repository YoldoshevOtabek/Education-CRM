import Main from "./Main";
import Sidebar from "./Sidebar";


export default function Layout() {
  return (
    <div className="flex">
    <Sidebar/>
    <Main/>
   </div>
  )
}
