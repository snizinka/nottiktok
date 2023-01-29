// @ts-nocheck
import React, { useState, useEffect } from 'react';
import analytics from '../style/analytics.module.css'
import Header from './Header';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { analizePost } from '../store/action-creator/post';
import { analizeTitle } from '../store/action-creator/post';
import useActions from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

function handleHover(evt: any, item: any, legend: any) {
    legend.chart.data.datasets[0].backgroundColor.forEach((color: any, index: any, colors: any) => {
        colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    });
    legend.chart.update();
}


const Analytics = () => {
    const { user } = useTypedSelector(state => state.user)
    const { error, analize, loading, localLoading, title } = useTypedSelector(state => state.post)
    const { analizePost } = useActions()
    const { analizeTitle } = useActions()
    const [search, setSearch] = useState('')
    const [period, setPeriod] = useState(0)
    const [fperiod, setFperiod] = useState('January')
    const [speriod, setSperiod] = useState('March')
    const [titleChange, setTitleChange] = useState(false)
    const [pageLayout, setPageLayout] = useState(false)

    const [labels, setLables] = useState([] as any)
    const [amount, setAmount] = useState([] as any)
    const [stepSize, setStepSize] = useState()
    const [likes, setLikes] = useState(0)
    const [month, setMonth] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octovber', 'November', 'December'])
    const [mothPeriod, setMonthPeriod] = useState(month[0])

    function fill() {
        setAmount([])
        setLables([])
        setStepSize(1)

        analize?.subscriptionAnalys?.map((sa: any) => {
            setLikes(analize?.likesAnalys[0].lks)
            let date = new Date(sa.subscribtionDate).toISOString();
            let compl = new Date(date).toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' });
            let spltDate = compl.split(',', 1);
            let spltAll: string[] = spltDate[0].split('.', 3); // splited date

            for (let i = 0; i < 12; i++) {
                if (String(spltAll[1]) === String(i + 1)) {
                    setMonthPeriod(month[i])
                    console.log(month[i])
                }
            }

            setLables((oldArray: any) => [...oldArray, spltDate])
            setAmount((oldArray: any) => [...oldArray, sa.amount])
        })
    }

    useEffect(() => {
        fill()
    }, [analize.subscriptionAnalys])

    const data = {
        labels: labels,
        datasets: [{
            data: amount,
            backgroundColor: 'transparent',
            borderColor: '#B1BCE6',
            tension: 0.4,
            pointBorderColor: 'red'
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    sepSize: 2
                }
            },
            y: {

                ticks: {
                    sepSize: 2,
                    callback: (value: any) => '+' + value + ' subs'
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }

    return (
        <div>
            <Header></Header>
            <div className={analytics.wrapper}>
                <div className={analytics.container}>
                    <h1 className={analytics.title}>Analytics</h1>
                    {
                        !pageLayout ? <div className={analytics.layout_title}>
                            <div className={analytics.search}>
                                <div className={analytics.title_select}>
                                    <h1>Analyze selected post</h1>
                                    <button onMouseOver={() => { setTitleChange(true) }}
                                        onMouseLeave={() => { setTitleChange(false) }}
                                        onClick={() => setPageLayout(!pageLayout)}
                                        style={{
                                            width: titleChange === true ? "160px" : "30px",
                                            borderRadius: titleChange === true ? "7px" : "30px"
                                        }}>{titleChange === true ? "Analyze account" : ">"}</button>
                                </div>
                                {
                                    console.log(titleChange)
                                }
                                <input type='text' className={analytics.search_txt} value={search} onInput={(e: any) => {
                                    setSearch(e.target.value)
                                    analizeTitle(e.target.value, user[0].userId)
                                }} />
                                <div className={analytics.posts}>
                                    {
                                        title?.postByTitle?.map((p: any) => {
                                            return <div className={analytics.menu_item} onClick={() => {
                                                analizePost(p.postId)
                                            }} ><p>{p.description}</p></div>
                                        })
                                    }
                                </div>
                            </div>

                            <div className={analytics.left_column}>
                                <div className={analytics.top_part}>
                                    <div className={analytics.text_container}>
                                        <p>Posts views: 190</p>
                                        <p>Posts likes: {analize?.likesAnalys[0]?.lks}</p>
                                        <p>Average topic: science</p>
                                        <p>Subscribers by period of:
                                            {
                                                period === 0 ? <div>
                                                    <span className={analytics.month}>{mothPeriod}</span>
                                                    <button className={analytics.add} onClick={() => { setPeriod(1) }}>+</button>
                                                </div> :
                                                    <div>
                                                        <span className={analytics.month}>{mothPeriod}</span>
                                                        <p>to</p>
                                                        <input type="date" />
                                                        <span className={analytics.month}>{speriod}</span>
                                                    </div>

                                            }

                                        </p>

                                        <div className="chart">
                                            <Line data={data} options={options} handleHover={handleHover}></Line>
                                        </div>
                                    </div>
                                </div>

                                <div className={analytics.bottom_part}>
                                    <div className={analytics.txt_container}>
                                        <p>Tasks done</p>
                                        <p>Tasks received</p>
                                    </div>
                                </div>
                            </div>
                            <div className={analytics.right_column}>

                            </div> </div> : <div></div>
                    }
                </div>
            </div>
        </div>

    );
};

export default Analytics;