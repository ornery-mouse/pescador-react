// **************** THIRD PARTY DEPENDENCIES ****************
import { useEffect, useState, useContext } from 'react'
// import { gql, useQuery } from '@apollo/client'
// import axios from 'axios'
import { BsPlusSquareFill, BsJournalBookmarkFill} from 'react-icons/bs'
import { TiWeatherPartlySunny } from 'react-icons/ti'
import { BiWater } from 'react-icons/bi'

// **************** PESCADOR DEPENDENCIES ****************
import AuthContext from '../../store/AuthContext'
import classes from './Dashboard.module.css'
import DashboardIcon from './DashboardIcon'
import CurrentConditions from './CurrentConditions'
import { getDashboardData } from '../../api/userData'

export default function Dashboard() {
    const user = useContext(AuthContext).user
    // **************** STATE ****************
    const [favoriteStation, setFavoriteStation] = useState([])
    // const [stationData, setStationData] = useState(null)
    
    
    // **************** HOOKS ****************
    useEffect(() => {
        getDashboardData(user)
        .then(station => {
            setFavoriteStation(station.data)
        })
    }, [user])

    return (
        <div className={classes.Dashboard}>
            <div className={classes.DashboardIconDisplay}>
                <DashboardIcon title='Add A Trip' goesTo='/journal/add' >
                    <BsPlusSquareFill className={classes.icon}/>
                </DashboardIcon>
                <DashboardIcon title='My Waters' goesTo='/waters' >
                    <BiWater className={classes.icon}/>
                </DashboardIcon>
                <DashboardIcon title='Weather' goesTo='/weather' >
                    <TiWeatherPartlySunny className={classes.icon}/>
                </DashboardIcon>
                <DashboardIcon title='Journal' goesTo='/journal' >
                    <BsJournalBookmarkFill className={classes.icon}/>
                </DashboardIcon>
            </div>
            <div className={classes.WidgetDisplay}>

                <CurrentConditions station={favoriteStation}/>

                <div className={classes.WeatherDisplay}>
                    <h3>Weather Display</h3>
                    <p>Current and forecast weather conditions</p>
                </div> 
            </div>
        </div>
    )
}