/*global chrome*/    //enables Chrome API 
import Domain from './Domain';

const DomainList = ({ currentDomain, localSettings, setLocalSettings }) => {
    console.log(">> DomainList")

    return (
        <>
            {/* CURRENT DOMAIN  */}
            {   localSettings.domains && currentDomain &&       // the first && means 'and', the second means 'then' ???
                Object.entries(localSettings.domains)          //Object.entries returns [ ['key1', {value1}],['key2', {value2}] ]
                    .filter(item => item[0] == currentDomain)  // item[0] is the key, key is a domain. if it matches CurrentDomain, render..  
                    .map((item) => (
                        <Domain
                            domainName={item[0]}
                            domainSettings={item[1]}
                            localSettings={localSettings}           // ??? contans domainSettings too
                            setLocalSettings={setLocalSettings}

                        />
                    ))
            }

            {/*  ALL (OTHER) DOMAINS */}
            {localSettings.domains ?
                Object.entries(localSettings.domains)            //Object.entries returns [ ['key1', {value1}],['key2', {value2}] ]
                    .filter(item => item[0] != currentDomain)
                    .map((item) => (
                        <Domain
                            domainName={item[0]}
                            domainSettings={item[1]}
                            localSettings={localSettings}
                            setLocalSettings={setLocalSettings}

                        />
                    ))
                :
                <div>No Domains Saved</div>
            }

            
        </>
    )
}

export default DomainList

