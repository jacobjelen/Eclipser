import { merge } from 'lodash'

const UrlList = ({ domainName, localSettings, setLocalSettings, setStorageSettings, setUrlsVisible }) => {
    const urls = Object.values(localSettings.domains[domainName].urls).sort()
    
    return (

        <div className="urlList" id={domainName.substring(0, domainName.indexOf('.')) + "URLS"}
            onMouseLeave={() => {
                setUrlsVisible(false)
            }}
        >
            {urls.map((url) =>
            (
                <span
                    onClick={() => {
                        console.log('url clicked')
                        const temp = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object
                        temp.domains[url] = temp.domains[domainName]
                        delete temp.domains[domainName]
                        setStorageSettings(temp)
                        setLocalSettings(temp)
                    }}

                > {url.substring(url.indexOf('.'))} </span>
            )
            )}
        </div>
    )
}

export default UrlList
