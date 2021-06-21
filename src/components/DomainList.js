/*global chrome*/    //enables Chrome API 
import Domain from './Domain';

const DomainList = ({ currentDomain, localSettings, setLocalSettings, setStorageSettings, test, setTest }) => {
    console.log(">> DomainList")

    // function reorderDomainList(currentDomain, domainListFromStorage) {

    //     // if no current domain or only 1 stored domain in the list, return unchanged domain list
    //     if (currentDomain.length <= 0 || domainListFromStorage.length <= 1){ 
    //         console.log('reorderDomainList returned early - no change')
    //         return domainListFromStorage 
    //     }  

    //     // else... 
    //     const newList = domainListFromStorage.filter( item => { return item[0] == currentDomain })
    //         .concat( domainListFromStorage.filter(item => item[0] != currentDomain) )

    //     console.log(newList)
    //     return newList
    // }

    // const reorderedDomainList = reorderDomainList(currentDomain, localSettings.domains)

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
                            setStorageSettings={setStorageSettings}

                            test={test}
                            setTest={setTest}
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
                            setStorageSettings={setStorageSettings}

                            test={test}
                            setTest={setTest}
                        />
                    ))
                :
                <div>No Domains Saved</div>
            }

            <button onClick={() => {
                setTest(test + 1)
            }}>test +1 (domainList)</button>
        </>
    )
}

export default DomainList

