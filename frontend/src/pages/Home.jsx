import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import ExcelChartBuilder from '../components/ExcelChartBuilder';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
//import FileUpload from "../components/FileUpload";
//import DataTable from "../components/DataTable";

function Home() {
   // const [tableData, setTableData] = useState([]);

  
    return (
    
    
          <div>            
             <Navbar/>
            <Sidebar/>
              

            <ExcelChartBuilder />
        
   
 
  
      
      </div>
   
  
      
     
    
    )
}

export default Home;