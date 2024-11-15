
import { Button, Card, DialogTitle, Divider, Menu, MenuList, Tooltip, Typography, makeStyles, useTheme } from "@material-ui/core";
import moment from "moment";
import { useState } from "react";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
    main: {
        maxWidth: "25%",
        width: "100%",
        borderRadius: theme.spacing(3.75),
        marginTop: theme.spacing(2),
        display: "flex",
        flexFlow: "column",
        // gap: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            maxWidth: "100%",
            padding: 0
        },
        "& .MuiButton-root": {
            border: "none",
            borderRadius: `${theme.spacing(5)}px !important`,
            cursor: "pointer",
            textTransform: "none",
            color: theme.palette.background.unique.inverseBlack,
            background: theme.palette.background.neutral[100],
            fontWeight: 600,
            fontSize: 14,
            width: theme.spacing(15),
            padding: 0,
            height: theme.spacing(5),
        },
        "& .apexchartsp42c1ht2": {
            width: "100%"
        }
    },
    header: {
        padding: 0,
        marginTop: 15,
        alignItems: "center",
        display: "flex",
        fontSize: 20,
        justifyContent: "space-between",
        color: theme.palette.background.unique.inverseBlack,
    },
    menuItems: {
        cursor: "pointer",
        color: theme.palette.background.unique.inverseBlack,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(1.5),
        textAlign: "center",
    },
    menu: {
        "& .MuiMenu-paper": {
            borderRadius: theme.spacing(1.5),
            height: theme.spacing(21),
            width: 130,
            "&::-webkit-scrollbar": {
                display: "none"
            },
            "& .MuiMenu-list": {
                width: "100% !important"
            }
        },
    },
    axis: {
        fontSize: 12,
        textTransform: "none",
        fontWeight: 400,
        colors: theme.palette.background.unique.inverseBlack,
    },
    countryCard: {
        minHeight: theme.spacing(10.5),
        borderRadius: theme.spacing(3),
        background: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseBlack : theme.palette.background.main,
        padding: theme.spacing(2)
    },
    cardBody1: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    country: {
        fontSize: 14,
        color: `${theme.palette.background.neutral[300]} !important`,
    },
    temperature: {
        fontSize: 20,
        color: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : theme.palette.background.unique.inverseBlack,
    },
    place: {
        fontSize: 18,
        color: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : theme.palette.background.unique.inverseBlack,
    },
    condition: {
        fontSize: 14,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 150,
        whiteSpace: "nowrap",
        color: theme.palette.type.includes("light") ? theme.palette.background.unique.inverseWhite : theme.palette.background.unique.inverseBlack,
    },
    countryCardContainer: {
        display: "flex",
        flexFlow: "column",
        gap: theme.spacing(2),
        marginTop: 30,
        maxHeight: 400,
        overflow: "auto"
    }
}))
export default function StatsGraph({ stats, date, bulkData, setQuery }) {
    const classes = useStyles()
    const parameters = [{
        name: "Temperature",
        value: "temp_c"
    },
    {
        name: "Precipitation",
        value: "precip_in"
    },
    {
        name: "Pressure",
        value: "pressure_mb"
    },
    {
        name: "Pressure",
        value: "pressure_mb"
    },
    {
        name: "Visibility",
        value: "vis_km"
    },
    {
        name: "Wind",
        value: "wind_kph"
    },
    {
        name: "Heat Index",
        value: "heatindex_c"
    },
    {
        name: "Gust",
        value: "gust_kph"
    }, {
        name: "Humidity",
        value: "humidity"
    }
    ]
    const [anchorEl, setAnchorEl] = useState(null)
    const [parameter, setParameter] = useState("temp_c");
    date = date ? date : moment().format("YYYY-MM-DD");
    const hourlyData = stats?.forecast?.forecastday
    const data = hourlyData && hourlyData.length ? hourlyData.find(item => item.date === date) : {};
    const paramData = data && data.hour ? data.hour.map((item) => {
        return { x: item.time, y: item[parameter] }
    }) : []

    const series = [
        {
            name: parameters.find((item => item.value === parameter)).name,
            data: paramData
        }]

    const theme = useTheme()
    let options = {
        plotOptions: {
            bar: {
                columnWidth: '50%',
            }
        },
        tooltip: {
            theme: theme.palette.type
        },
        colors: [theme.palette.type.includes("light") ? theme.palette.background.frenchGrey[5] : theme.palette.background.frenchGrey[0]],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false,
        },
        series,
        xaxis: {
            tickAmount: 12,
            labels: {
                style: {
                    cssClass: classes.axis,
                    colors: theme.palette.background.unique.inverseBlack,
                },
                datetimeUTC: true,
                formatter: (value) => moment(value).format("hh A")
            },
        },
        yaxis: {
            labels: {
                style: {
                    cssClass: classes.axis,
                    colors: theme.palette.background.unique.inverseBlack,
                },
                formatter: (value) => value
            }
        },

    };

    return (
        <aside className={classes.main}>
            <section className={classes.header}>
                <span>Parameters</span>
                <Button onClick={(e) => setAnchorEl(e.currentTarget)}> {parameters.find((item => item.value === parameter)).name}</Button>
                <Menu
                    className={classes.menu}
                    id="lock-menu"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                // transformOrigin={{
                //     // horizontal: "center",
                //     vertical: "top"
                // }}
                >
                    {parameters.map((item, index) => {
                        return (
                            <div key={`weather_parameters${index}`}>
                                <MenuList
                                    onClick={() => {
                                        setParameter(item.value)
                                        setAnchorEl(null)
                                    }}
                                    className={classes.menuItems}
                                    value={item.value} >{item.name}
                                </MenuList>
                                <Divider />
                            </div>
                        )
                    })}
                </Menu>
            </section>

            <Chart options={options} series={series} type="bar" width={"100%"} height={240} style={{ marginTop: 32 }} />
            <FamousPlaces data={bulkData} setQuery={setQuery} />
        </aside>
    )

}



const FamousPlaces = ({ data, setQuery }) => {

    const classes = useStyles()
    return (
        <>
            <DialogTitle className={classes.header}>
                Famous Places
            </DialogTitle>
            <div className={classes.countryCardContainer}>
                {data && data.bulk && data.bulk.length && data.bulk.map((item, index) => (
                    item?.query?.location?.name && <Card key={`famous_places${index}`} className={classes.countryCard} onClick={() => setQuery(item?.query?.location?.name)}>
                        <section className={classes.cardBody1}>
                            <div>
                                <Typography className={classes.country}>
                                    {item?.query?.location?.country}
                                </Typography>
                                <Typography className={classes.place}>
                                    {item?.query?.location?.name}
                                </Typography>
                            </div>
                            <img src={item?.query?.current?.condition.icon} alt={item?.query?.current?.condition.text} height={60} width={60} />

                            {/* <Rainy height={60} width={60} /> */}
                        </section>
                        <section className={classes.cardBody1}>
                            <Tooltip title={item?.query?.current?.condition?.text} arrow={true}>
                                <Typography className={classes.condition}>
                                    {item?.query?.current?.condition?.text}
                                </Typography>
                            </Tooltip>
                            <Typography className={classes.temperature}>
                                {`${item?.query?.current?.temp_c}°C`}
                            </Typography>
                        </section>
                    </Card>
                ))}
            </div>
        </>
    )
}
