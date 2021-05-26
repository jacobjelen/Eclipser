import SetList from "./SetList";

const Domain = ({domainName, domainSettings}) => {

    return (
        <div className="domainDiv">
            <div className="domainLine">
                <div className="domainName">{domainName}</div>
            
                <div className="domainButtons"> X </div>
            
            </div> 
            
            <SetList domainSettings={domainSettings} />
               
        </div>
    )
}

export default Domain
