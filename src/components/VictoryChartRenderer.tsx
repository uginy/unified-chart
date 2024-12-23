import React from 'react';
    import {
      VictoryChart,
      VictoryAxis,
      VictoryLine,
      VictoryBar,
      VictoryArea,
      VictoryTheme,
      VictoryGroup,
      VictoryScatter,
    } from 'victory';
    import { ChartConfig, DataPoint } from '../types';
    
    interface VictoryChartRendererProps {
      config: ChartConfig;
    }
    
    const generateMockData = (
      timeRange: number,
      valueFields: string[]
    ): DataPoint[] => {
      const now = new Date();
      const data: DataPoint[] = [];
      const startDate = new Date(now);
    
      if (timeRange === 1) {
        startDate.setHours(0, 0, 0, 0);
      } else {
        startDate.setDate(now.getDate() - timeRange + 1);
        startDate.setHours(0, 0, 0, 0);
      }
    
      let currentDate = new Date(startDate);
      while (currentDate <= now) {
        const dataPoint: DataPoint = { time: new Date(currentDate) };
        valueFields.forEach((field) => {
          dataPoint[field] = Math.random() * 100;
        });
        data.push(dataPoint);
        currentDate.setMinutes(currentDate.getMinutes() + 5);
      }
    
      return data;
    };
    
    const VictoryChartRenderer: React.FC<VictoryChartRendererProps> = ({
      config,
    }) => {
      const valueFields = config.series.map((series) => series.valueField);
      const mockData = generateMockData(config.timeRange, valueFields);
    
      const leftAxes = config.axes.filter((axis) => axis.type === 'left');
      const rightAxes = config.axes.filter((axis) => axis.type === 'right');
    
      return (
        <div className="border rounded-md p-4">
          <h3 className="font-bold mb-4">Chart Display</h3>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 20 }}
            width={600}
            height={400}
          >
            <VictoryAxis
              tickFormat={(x) => {
                if (x instanceof Date) {
                  const options: Intl.DateTimeFormatOptions =
                    config.timeRange === 1
                      ? { hour: 'numeric', minute: 'numeric' }
                      : { month: 'short', day: 'numeric' };
                  return x.toLocaleDateString('en-US', options);
                }
                return '';
              }}
            />
            {leftAxes.map((axis) => (
              <VictoryAxis
                dependentAxis
                key={axis.id}
                orientation="left"
                style={{
                  axis: { stroke: axis.color },
                  tickLabels: { fill: axis.color },
                }}
                label={axis.name}
              />
            ))}
            {rightAxes.map((axis) => (
              <VictoryAxis
                dependentAxis
                key={axis.id}
                orientation="right"
                style={{
                  axis: { stroke: axis.color },
                  tickLabels: { fill: axis.color },
                }}
                label={axis.name}
              />
            ))}
            {config.series.map((series) => {
              const axisConfig = config.axes.find((axis) => axis.id === series.axisId);
              if (!axisConfig) return null;
    
              const data = mockData.map((d) => ({
                x: d.time,
                y: d[series.valueField],
              }));
    
              switch (series.type) {
                case 'linear':
                  return (
                    <VictoryGroup key={series.id}>
                      <VictoryLine
                        data={data}
                        style={{ data: { stroke: series.color } }}
                      />
                      <VictoryScatter
                        data={data}
                        size={3}
                        style={{ data: { fill: series.color } }}
                      />
                    </VictoryGroup>
                  );
                case 'bar':
                  return (
                    <VictoryBar
                      key={series.id}
                      data={data}
                      style={{ data: { fill: series.color } }}
                    />
                  );
                case 'area':
                  return (
                    <VictoryArea
                      key={series.id}
                      data={data}
                      style={{ data: { fill: series.color } }}
                    />
                  );
                default:
                  return null;
              }
            })}
          </VictoryChart>
        </div>
      );
    };
    
    export default VictoryChartRenderer;
