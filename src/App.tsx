import React from 'react';
    import ChartConfigPanel from './components/ChartConfigPanel';
    import VictoryChartRenderer from './components/VictoryChartRenderer';
    import { ChartConfig } from './types';
    
    const App: React.FC = () => {
      const [chartConfig, setChartConfig] = React.useState<ChartConfig>({
        axes: [
          {
            id: 'voltage-axis',
            type: 'left',
            name: 'Voltage',
            color: '#FF5733',
            dynamicScaling: true,
          },
          {
            id: 'pressure-axis',
            type: 'left',
            name: 'Pressure',
            color: '#3498DB',
            dynamicScaling: true,
          },
          {
            id: 'flow-axis',
            type: 'right',
            name: 'Flow',
            color: '#2ECC71',
            dynamicScaling: true,
          },
          {
            id: 'power-axis',
            type: 'right',
            name: 'Power',
            color: '#F08080',
            dynamicScaling: true,
          },
        ],
        series: [
          {
            id: 'series-1',
            axisId: 'voltage-axis',
            name: 'Voltage Series',
            type: 'linear',
            valueField: 'voltage',
            color: '#FF5733',
          },
          {
            id: 'series-2',
            axisId: 'pressure-axis',
            name: 'Pressure Series',
            type: 'bar',
            valueField: 'pressure',
            color: '#3498DB',
          },
          {
            id: 'series-3',
            axisId: 'flow-axis',
            name: 'Flow Series',
            type: 'area',
            valueField: 'flow',
            color: '#2ECC71',
          },
        ],
        timeRange: 7,
      });
    
      const handleConfigChange = (newConfig: ChartConfig) => {
        setChartConfig(newConfig);
      };
    
      return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Unified Chart System</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ChartConfigPanel
                config={chartConfig}
                onConfigChange={handleConfigChange}
              />
            </div>
            <div>
              <VictoryChartRenderer config={chartConfig} />
            </div>
          </div>
        </div>
      );
    };
    
    export default App;
