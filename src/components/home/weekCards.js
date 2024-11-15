import { Divider, Paper, Tooltip, makeStyles } from "@material-ui/core"
import moment from "moment/moment"
import clsx from "clsx"
import { memo } from "react"
import { US_EPA_SCALE } from "../../constants"
import { UK_DEFRA_INDEX } from "../../constants"

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: theme.spacing(4),
        gap: theme.spacing(1),
        justifyContent: "space-between",

        [theme.breakpoints.down("lg")]: {
            overscrollBehaviorX: "contain",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            overflowY: "auto",
        },
        "&::-webkit-scrollbar-track": {
            background: theme.palette.background.unique.inverseBlack,
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.background.unique.inverseBlack,
        }
    },
    daysCard: {
        height: "fit-content",
        borderRadius: theme.spacing(2),
        textAlign: "center",
        width: theme.spacing(17),
        background: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseBlack : theme.palette.background.main,
        padding: 10,
        "& p": {
            margin: 0
        },
        "& > div > div > span": {
            fontWeight: 600,
            fontSize: 15,
        },
        "& > div > div > svg": {
            marginTop: 2
        },
        "& > div > div > section": {
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            fontSize: 12,
            marginTop: 5,
            whiteSpace: "nowrap",
            "& p:nth-child(2)": {
                fontWeight: 600
            },

        },
        "& .aqistats": {
            padding: "0 !important",
            transform: "rotateY(180deg)",
            marginTop: theme.spacing(2)
        },
    },
    flip: {
        transform: "rotateY(180deg)",
        transition: "transform 0.8s",
    },
    flipAnti: {
        transform: "rotateY(0deg)",
        transition: "transform 0.8s",
    },
    activeDay: {
        width: 260,
        height: "fit-content",
        background: theme.palette.type.includes("light") ? theme.palette.background.frenchGrey[5] : theme.palette.background.frenchGrey[1],
        borderRadius: theme.spacing(2),
        "& p": {
            margin: 0,
            whiteSpace: "nowrap"
        },

    },
    cardHeader: {
        borderTopRightRadius: theme.spacing(2),
        borderTopLeftRadius: theme.spacing(2),
        padding: 10,
        background: theme.palette.type.includes("light") ? theme.palette.background.frenchGrey[6] : theme.palette.background.frenchGrey[4],
        color: theme.palette.background.unique.inverseWhite,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 600,
        fontSize: 15,
    },
    currectTemp: {
        fontSize: 45,
        margin: 0,
        textAlign: "left",
        fontWeight: 800,
        color: theme.palette.background.unique.inverseWhite,
    },
    fields: {
        display: "flex",
        gap: 2,
        marginTop: 5,
        fontSize: 12,
        whiteSpace: "nowrap",
        justifyContent: "space-between",
        "& p:first-child": {
            color: ({ isDays }) => isDays ? theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : theme.palette.background.unique.inverseBlack : theme.palette.background.unique.inverseWhite,
        },
        "& p:nth-child(2)": {
            color: ({ isDays }) => isDays ? theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : theme.palette.background.unique.inverseBlack : theme.palette.background.unique.inverseWhite,
            fontWeight: 600
        },
    },
    bottomStats: {
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        "& > section > span": {
            display: "flex",
            fontSize: 12,
            marginTop: 5,
            gap: 2,
            "& p:first-child": {
                color: theme.palette.background.unique.inverseWhite,
            },
            "& p:nth-child(2)": {
                color: theme.palette.background.unique.inverseWhite,
                fontWeight: 600
            },

        }
    },
    statsContainer: {
        color: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : "",
        "& .MuiDivider-root": {
            marginTop: theme.spacing(1),
            background: theme.palette.type.includes("light") ? theme.palette.background.frenchGrey[1] : "",
        },
        "& .stats": {
            padding: "8px 10px 10px 10px",
        },
        "& > div > span": {
            display: "flex",
            fontSize: 12,
            gap: 2,
            marginTop: 5,
            "& p:first-child": {
                color: theme.palette.background.unique.inverseWhite,
            },
            "& p:nth-child(2)": {
                color: theme.palette.background.unique.inverseWhite,
                fontWeight: 600
            },

        },
    },
    aqiSide: {
        transform: "rotateY(180deg)",
        display: "flex",
        padding: 10,
        justifyContent: "space-between",
        "& > aside": {
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            "& > div": {
                fontSize: 12,
                "& p:first-child": {
                    color: ({ isDays }) => isDays ? theme.palette.background.unique.inverseBlack : theme.palette.background.unique.inverseWhite,
                },
                "& p:nth-child(2n)": {
                    color: ({ isDays }) => isDays ? theme.palette.background.unique.inverseBlack : theme.palette.background.unique.inverseWhite,
                    fontWeight: 600
                },
            }
        }
    }
}))

export default memo(WeeklyReport);

function WeeklyReport({ reportType, forecastday, current, selectedDate, setSeletedDate }) {
    const classes = useStyles({ reportType })

    return (
        <section className={classes.container}>
            {forecastday && forecastday.length && forecastday.map((item, index) => {
                const aqiData = item.day.air_quality;
                return (
                    <Paper key={`weeks_${index}`} className={item.date === selectedDate ? classes.activeDay : classes.daysCard}
                    // onClick={() => setSeletedDate(item.date)}
                    >
                        {item.date === selectedDate ?
                            <div className={classes.statsContainer}>
                                <header className={classes.cardHeader}>
                                    <span>{moment(item.date).format("dddd")}</span>
                                    <span>{moment().format("HH:mm A")}</span>
                                </header>

                                <div className={clsx(reportType === "FORECAST" ? "stats" : "", reportType === "FORECAST" ? classes.flipAnti : classes.flip)}>
                                    {reportType === "AQI" ?
                                        <section className={classes.aqiSide}>
                                            <AQIData data={aqiData} activeDay={true} />
                                            <aside>
                                                <div>
                                                    <p>US-EPA standard</p>
                                                    <p>{US_EPA_SCALE[aqiData["us-epa-index"]]}</p>
                                                </div>
                                                <div>
                                                    <p>UK Defra Index:</p>
                                                    <Tooltip title={`${UK_DEFRA_INDEX(aqiData["gb-defra-index"]).band}`}>
                                                        <p>{`${UK_DEFRA_INDEX(aqiData["gb-defra-index"]).value} μg/m3`}</p>
                                                    </Tooltip>
                                                </div>
                                            </aside>
                                        </section> : <>
                                            <section style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p className={classes.currectTemp}>
                                                    {`${current.temp_c}°C`}
                                                </p>
                                                <img src={item?.day?.condition.icon} alt={item?.day?.condition.text} />
                                            </section>
                                            <div className={classes.bottomStats}>
                                                <section>
                                                    <span>
                                                        <p>Real Feel:</p>
                                                        <p>{`${current.feelslike_c}°C`}</p>
                                                    </span>
                                                    <span>
                                                        <p>Humidity:</p>
                                                        <p>{`${current.humidity}°C`}</p>
                                                    </span>
                                                    <span>
                                                        <p>Wind:</p>
                                                        <p>{`${current.wind_kph} Km/h`}</p>
                                                    </span>
                                                    <span>
                                                        <p>Pressure:</p>
                                                        <p>{`${current.pressure_mb} MB`}</p>
                                                    </span>
                                                </section>

                                                <section>
                                                    <span>
                                                        <p>Prec chances:</p>
                                                        <p>{`${item.day.daily_chance_of_rain} %`}</p>
                                                    </span>
                                                    <span>
                                                        <p>Snowfall</p>
                                                        <p>{`${item.day.daily_chance_of_snow} %`}</p>
                                                    </span>
                                                </section>
                                            </div>
                                            <div className={classes.bottomStats}>
                                                <section>
                                                    <span>
                                                        <p>Sunrise:</p>
                                                        <p>{item.astro.sunrise}</p>
                                                    </span>
                                                    <span>
                                                        <p>Sunset:</p>
                                                        <p>{item.astro.sunset}</p>
                                                    </span>
                                                </section>
                                                <section>
                                                    <span>
                                                        <p>Moonrise:</p>
                                                        <p>{item.astro.moonrise}</p>
                                                    </span>
                                                    <span>
                                                        <p>Moonset:</p>
                                                        <p>{item.astro.moonset}</p>
                                                    </span>
                                                </section>
                                            </div>
                                        </>}
                                </div>
                            </div> :
                            <div className={classes.statsContainer}>
                                <span>{moment(item.date).format("dddd")}</span>
                                <Divider />


                                <div className={reportType === "FORECAST" ? classes.flipAnti : classes.flip}>
                                    {reportType === "AQI" ? <AQIData data={aqiData} isDays={true} /> :
                                        <>
                                            <img src={item?.day?.condition.icon} alt={item?.day?.condition.text} height={70} width={70} />

                                            {/* <Rainy height={60} width={60} /> */}
                                            <section>
                                                <p>Min Temp:</p>
                                                <p>{`${item.day.mintemp_c}°C`}</p>
                                            </section>
                                            <section>
                                                <p>Max Temp:</p>
                                                <p>{`${item.day.maxtemp_c}°C`}</p>
                                            </section>
                                            <section>
                                                <p>Prec chances:</p>
                                                <p>{`${item.day.daily_chance_of_rain} %`}</p>
                                            </section>
                                            <section>
                                                <p>Snow chances:</p>
                                                <p>{`${item.day.daily_chance_of_snow} %`}</p>
                                            </section>
                                            <section>
                                                <p>Sunrise:</p>
                                                <p>{item.astro.sunrise}</p>
                                            </section>
                                            <section>
                                                <p>Sunrise:</p>
                                                <p>{item.astro.sunrise}</p>
                                            </section>
                                        </>}
                                </div>
                            </div>
                        }

                    </Paper>
                )
            })}
        </section>
    )
}

const AQIData = ({ data, isDays, activeDay }) => {
    const classes = useStyles({ isDays, activeDay })
    return (
        <div className={clsx("aqistats")}>
            <section className={classes.fields}>
                <p>CO:</p>
                <p>{data.co ? `${data.co.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>NO2:</p>
                <p>{data.no2 ? `${data.no2.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>O3:</p>
                <p>{data.o3 ? `${data.o3.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>SO2:</p>
                <p>{data.so2 ? `${data.so2.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>pm2.5:</p>
                <p>{data.pm2_5 ? `${data.pm2_5.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>pm10:</p>
                <p>{data.pm10 ? `${data.pm10.toFixed(2)} μg/m3` : "N/A"}</p>
            </section>
            <section className={classes.fields}>
                <p>US-EPA standard:</p>
                <p>{data['us-epa-index'] || "-"}</p>
            </section>
            <section className={classes.fields}>
                <p>UK Defra Index:</p>
                <p>{data['gb-defra-index'] || "-"}</p>
            </section>
        </div>
    )
}


