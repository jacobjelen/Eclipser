import { merge } from 'lodash'

const WeekdayButton = ({ weekday, localSettings, setLocalSettings, setStorageSettings }) => {
    console.log("hello")
    
    const dayNames = ["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    return (
        <span className={localSettings.general.weekdays[weekday] ? "weekday--active" : "weekday--passive"}

        onClick={(event) => {
            const temp_localSettings = merge({}, localSettings)
            temp_localSettings.general.weekdays[weekday] = !temp_localSettings.general.weekdays[weekday]
            console.log(event.target.checked)
            setStorageSettings(temp_localSettings)
            setLocalSettings(temp_localSettings)
        }}
        >
            {/* weekday is int 1-7; 
            weekday-1 gives index to dayNames;*/}
            {dayNames[weekday-1].substring(0,2)} 
        
        </span>

    )
}

export default WeekdayButton