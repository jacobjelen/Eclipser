import SetList from "./SetList";

//https://react-icons.github.io/react-icons/icons?name=ai
import { 
    AiOutlineMenu,                 // menu
    AiOutlineSetting,                // settings
    AiOutlineCloseCircle,        //delete
    
    AiOutlineEyeInvisible,       //invisible
    AiOutlineEye,                //visible
    
    AiOutlineDown,               //expand down
    AiOutlineUp,
    
    AiOutlineClockCircle,       // clock
} from "react-icons/ai";     


const Domain = ({domainName, domainSettings}) => {

    return (
        <div className="domainDiv">
            <div className="domainLine">
                <div className="domainName">
                    {domainSettings.active ? <AiOutlineEye style={{color:"green"}}/> : <AiOutlineEyeInvisible style={{color:"grey"}}/>}
                    
                    {domainName}
                    </div>
            
                
                <div className="domainButtons"> 
                <AiOutlineCloseCircle />
                </div>
            
            </div> 
            
            <SetList domainSettings={domainSettings} />
               
        </div>
    )
}

export default Domain
