/* src/components/dashboard/GrowthAnalysis.jsx */

import './GrowthAnalysis.css';
import ProgressBar from "../ProgressBar/ProgressBar";
import {useEffect, useState} from "react";
import axios from "axios";
import {RECORD_CHILD_ALL_BODY_SIZE} from "../../routes/ApiPath.js";
import LineChart from "../line-chart/LineChart";

const GrowthAnalysis = () => {
    const [activeTab, setActiveTab] = useState('height');
    const handleGrowthTabs = type => {
        setActiveTab(type);
        setChartData(childAllRecords.map(record => record[type]));
    };
    const [childId, setChildId] = useState('hong');
    const [childName, setChildName] = useState('홍길동');
    const [childHeight, setChildHeight] = useState(64);
    const [childWeight, setChildWeight] = useState(5);

    const [labels, setLabels] = useState('');
    const [chartData, setChartData] = useState({});
    const [childAllRecords, setChildAllRecords] = useState({});

    const fetchData = async () => {
        try {
            let { data } = await axios.get(RECORD_CHILD_ALL_BODY_SIZE + '?childId=' + childId);
            setChildAllRecords(data);
            setLabels(data.map(record => record.recordDate));
            setChartData(data.map(record => record.height));
        } catch (e) {
            console.log(e);
            // 요청 실패 시 빈 배열로 초기화
            setChildAllRecords([]);
            setLabels([]);
            setChartData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="tabs">
                <div onClick={() => handleGrowthTabs('height')}
                     className={`tab ${activeTab === 'height' ? 'active' : ''}`}>
                    키
                </div>
                <div onClick={() => handleGrowthTabs('weight')}
                     className={`tab ${activeTab === 'weight' ? 'active' : ''}`}>
                    몸무게
                </div>
            </div>

            <div className="section-title">3개월 전</div>
            <div className="highlight-text">
                {childName} 님의 {activeTab === 'height' ? '키':'몸무게'}는
                <span style={{ color: '#f78e1e' }}>
                    {' '}평균 {activeTab === 'height' ? childHeight+' cm' : childWeight + ' kg'}
                </span> 이에요 ✏️
            </div>

            <div className="progress-bar">
                <ProgressBar value={0}/>
            </div>
            <div className="range-labels">
                <span>작은편</span>
                <span>평균</span>
                <span>큰편</span>
            </div>

            <div className="chart">
                <LineChart
                    labels={labels}
                    chartData={chartData}
                    title={childName + ' 님 ' + (activeTab === 'height' ? '키' : '몸무게') + ' 변화'}
                    label={activeTab}
                />
            </div>
        </>
    );
};

export default GrowthAnalysis;
