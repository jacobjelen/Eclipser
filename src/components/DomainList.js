/*global chrome*/    //enables Chrome API 
import Domain from './Domain';

const DomainList = ({ currentDomain, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab  }) => {
    console.log("R: DomainList")

    return (
        <>
            {/* CURRENT DOMAIN  */}
            {   localSettings.domains && currentDomain &&       // the first && means 'and', the second means 'then' ???
                Object.entries(localSettings.domains)          //Object.entries returns [ ['key1', {value1}],['key2', {value2}] ]
                    .filter(item => item[0] === currentDomain)  // item[0] is the key, key is a domain. if it matches CurrentDomain, render..  
                    .map((item) => (
                        <Domain
                            currentDomain={currentDomain}
                            expand={true}
                            domainName={item[0]}
                            localSettings={localSettings}           // ??? contans domainSettings too
                            setLocalSettings={setLocalSettings}
                            setStorageSettings={setStorageSettings}
                            messageCurrentTab={messageCurrentTab} 

                        />
                    ))
            }

            {/*  ALL (OTHER) DOMAINS */}
            {localSettings.domains ?
                Object.entries(localSettings.domains)               //Object.entries returns [ ['key1', {value1}],['key2', {value2}] ]
                    .filter(item => item[0] !== currentDomain)      //filter out the current domain
                    .sort()                                         //sort alphabetically
                    .map((item) => (                                
                        <Domain
                            currentDomain={currentDomain}
                            domainName={item[0]}
                            localSettings={localSettings}
                            setLocalSettings={setLocalSettings}
                            setStorageSettings={setStorageSettings}
                            messageCurrentTab={messageCurrentTab} 

                        />
                    ))
                :
                <div>No Domains Saved</div>
            }

            
        </>
    )
}

export default DomainList

