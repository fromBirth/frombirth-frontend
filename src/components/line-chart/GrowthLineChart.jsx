import { ResponsiveLine } from '@nivo/line';

const GrowthLineChart = ({ data,unit }) => {
    if (!data.length || !data[0].data) return null;


    const formattedData = data.map(dataset => ({
        ...dataset,
        data: dataset.data.map(point => {
            const [year, month, day] = point.x.split('-');
            const formattedDate = `${month}.${day}`;
            return {
                ...point,
                x: formattedDate,
                year
            };
        })
    }));
    console.log(data)
    const margin = { top: 40, right: 23, bottom: 30, left: 23 };

    const yValues = formattedData[0].data
        .filter(point => point.y !== null)
        .map(point => point.y);


    if (!yValues.length) return null;

    const minYValue = Math.round(Math.min(...yValues) * 0.95);
    const maxYValue = Math.round(Math.max(...yValues) * 1.05)

    const tickValues = formattedData[0].data
        .filter(point => point.y !== null) // y 값이 null이 아닌 x 값들만 포함
        .map(point => ({ date: point.x, year: point.year }));
    const nonNullData = formattedData[0].data.filter(point => point.y !== null);

    const lastIndex = formattedData[0].data.findIndex(point => point === nonNullData[nonNullData.length - 1]);
    const lastValidPoint = nonNullData[nonNullData.length - 1];




    return (
        <div style={{position: 'relative', height: '400px'}}>
            {/* 좌측 상단 단위 표시 (cm) */}
            <div style={{
                position: 'absolute',
                top: '6px',
                left: '-0.4px',
                fontSize: '12px',
                color: 'var(--menu-text-color)'
            }}>
                ({unit})
            </div>


            {/* 우측 하단 단위 표시 (날짜) */}
            <div style={{
                position: 'absolute',
                bottom: '4px',
                right: '22px',
                fontSize: '12px',
                color: 'var(--menu-text-color)'
            }}>
                (날짜)
            </div>


            <ResponsiveLine
                data={formattedData}
                margin={margin}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: minYValue - 3,
                    max: maxYValue,
                    stacked: false,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: tickValues.map(tick => tick.date),
                    tickSize: 0,
                    tickPadding: 10,
                    tickRotation: 0
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0
                }}

                enableGridX={false}
                fill={[
                    {match: '*', id: 'gradientArea', color: '#FFE1D7'} // area 색상 설정
                ]}
                colors='#FEBD9F'
                pointColor={(point) =>
                    point.data.x === lastValidPoint.x ? 'white' : '#FEBD9F'  // 마지막 유효 포인트만 white로 설정
                }
                pointBorderColor={({index}) => (index === lastIndex - 1 ? '#FA6A3C' : '#FEBD9F')}
                areaBaselineValue={minYValue - 3}
                pointSize={10}
                pointBorderWidth={2}
                enableArea={true}
                isInteractive={false}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 12,      // 폰트 크기 설정
                                fill: 'var(--menu-text-color)',   // 텍스트 색상
                                fontFamily: 'Pretendard', // 폰트 종류 설정
                            }
                        }
                    }
                }}
            />
            {/* x축 눈금 아래에 커스텀 span 태그 추가 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                gap: '2.4%',
                width: '79%',
                marginTop: '-20px',
                margin: '0 auto'
            }}>
                {tickValues.map((tick, index) => {
                    const showYear = index === 0 || tick.year !== tickValues[index - 1].year;
                    return (
                        <span key={index} style={{
                            fontSize: '12px',
                            color: 'var(--menu-text-color)',
                            textAlign: 'center',
                            width: '40px',
                        }}>
                {showYear && <div
                    style={{backgroundColor: '#E6E9F0', padding: '2px 5px', borderRadius: '4px'}}>{tick.year}</div>}
            </span>
                    );
                })}
            </div>

        </div>
    );
};

export default GrowthLineChart;
