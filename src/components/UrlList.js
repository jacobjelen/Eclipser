const UrlList = ({domainName, localSettings, setLocalSettings, setStorageSettings}) => {
    
    const urls = Object.values(localSettings.domains[domainName].urls).sort()

    return (
        <ul className="setList">
            {urls.map( (url) => 
                (
                    <li> {url} </li>
                )           
            )}
        </ul>
    )
}

export default UrlList
