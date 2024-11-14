/* src/components/dashboard/GrowthAnalysis.jsx */

import './GrowthAnalysis.css';
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SPRING_CHILDREN_BASE } from "../../routes/ApiPath.js";
import GrowthLineChart from "../line-chart/GrowthLineChart.jsx";
import AppContext from "../../contexts/AppProvider.jsx";

const GrowthAnalysis = () => {
    const { selectedChildId } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('height');
    const [childName, setChildName] = useState(null);
    const [childValue, setChildValue] = useState(0);
    const [percentage, setPercentage] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const [growthData, setGrowthData] = useState([]);
    const fetchChildData = async () => {
        try {
            const response = await axios.get(SPRING_CHILDREN_BASE + `/child/${selectedChildId}`);
            setChildName(response.data.name);
        } catch (error) {
            console.error("아이 정보 데이터를 가져오는 중 오류가 발생했습니다.", error);
        }

    }

    const fetchGrowthData = async () => {
        try {
            const response = await axios.get(SPRING_CHILDREN_BASE + `/growth-data/${selectedChildId}`);
            const selectedData = activeTab === 'height' ? response.data.heightData : response.data.weightData;
            const lastValidDateStr = selectedData.slice().reverse().find(item => item[activeTab] !== null)?.date;

            if (lastValidDateStr) {
                const lastDateObj = new Date(lastValidDateStr);
                const now = new Date();
                const diffInMs = now - lastDateObj;
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                const diffInMonths = Math.floor(diffInDays / 30);
                const diffInYears = Math.floor(diffInDays / 365);

                let timeAgo;
                if (diffInYears >= 1) {
                    timeAgo = `${diffInYears}년 전`;
                } else if (diffInMonths >= 1) {
                    timeAgo = `${diffInMonths}달 전`;
                } else {
                    timeAgo = `${diffInDays}일 전`;
                }

                setLastDate(timeAgo);
            }


            let max = null;
            let min = null;
            let calculatedPercentage = null;

            if (response.data.statistics) {
                console.log("데이터 있음");
                console.log(response.data.statistics);
                const avgValue = activeTab === 'height' ? response.data.statistics.avgHeight : response.data.statistics.avgWeight;
                max = avgValue * 1.1;
                min = avgValue * 0.9;
            }

            const formattedData = selectedData.map(item => ({
                x: item.date,
                y: item[activeTab]
            }));

            const dataLabel = activeTab === 'height' ? 'Height' : 'Weight';
            setGrowthData([{ id: dataLabel, data: formattedData }]);

            const lastValue = formattedData.slice().reverse().find(item => item.y !== null)?.y;
            setChildValue(lastValue);
            if (max !== null && min !== null && lastValue !== undefined) {
                calculatedPercentage = ((lastValue - min) / (max - min)) * 100
                if (calculatedPercentage < 0) {
                    calculatedPercentage = 0;
                } else if (calculatedPercentage > 100) {
                    calculatedPercentage = 100;
                }
                setPercentage(calculatedPercentage.toFixed(0));
            } else {
                setPercentage(null);
            }

        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        fetchChildData();
    }, [selectedChildId]);

    // selectedChildId 또는 activeTab 변경 시 fetchGrowthData 호출
    useEffect(() => {
        fetchGrowthData();
    }, [selectedChildId, activeTab]);
    const unit = activeTab === 'height' ? 'cm' : 'kg';
    return (
        <>
            <div className="tab-bar">
                <div onClick={() => setActiveTab('height')}
                    className={`tab ${activeTab === 'height' ? 'active' : ''}`}>
                    키
                </div>
                <div onClick={() => setActiveTab('weight')}
                    className={`tab ${activeTab === 'weight' ? 'active' : ''}`}>
                    몸무게
                </div>
            </div>

            <div className="content-wrap">
                <div className="last-date">{lastDate}</div>
                <div className="highlight-text">
                    <span>{childName} 님의 {activeTab === 'height' ? '키' : '몸무게'}는 <br /></span>
                    <div className='value-wrap'>
                        <spanddddss
                            className={`status ${percentage !== null
                                    ? percentage <= (1/ 3) * 100
                                        ? 'status-small'
                                        : percentage >= (2 / 3) * 100
                                            ? 'status-large'
                                            : 'status-average'
                                    : 'status-average'
                                }`}
                        >
                            {percentage !== null ? (percentage <= (1/ 3) * 100 ? '작은편' : percentage >= (2 / 3) * 100 ? '큰편' : '평균') : '평균'}
                        </spanddddss>
                        <b>{childValue} {unit}</b> 이에요
                    </div>
                </div>

                <div>
                    <ProgressBar percentage={percentage} />
                </div>
            </div>
            {growthData.length ? <GrowthLineChart data={growthData} unit={unit} /> : null}
        </>
    );
};

export default GrowthAnalysis;
