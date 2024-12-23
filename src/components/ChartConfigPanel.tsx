import React, { useState } from 'react';
    import { ChartConfig, AxisConfig, SeriesConfig } from '../types';
    import { Plus, Trash } from 'lucide-react';
    
    interface ChartConfigPanelProps {
      config: ChartConfig;
      onConfigChange: (config: ChartConfig) => void;
    }
    
    const ChartConfigPanel: React.FC<ChartConfigPanelProps> = ({
      config,
      onConfigChange,
    }) => {
      const [activeTab, setActiveTab] = useState('axes');
    
      const handleAddAxis = () => {
        const newAxis: AxisConfig = {
          id: `axis-${config.axes.length + 1}`,
          type: 'left',
          color: '#000000',
          dynamicScaling: true,
        };
        onConfigChange({
          ...config,
          axes: [...config.axes, newAxis],
        });
      };
    
      const handleRemoveAxis = (axisId: string) => {
        onConfigChange({
          ...config,
          axes: config.axes.filter((axis) => axis.id !== axisId),
          series: config.series.filter((series) => series.axisId !== axisId),
        });
      };
    
      const handleAxisChange = (axisId: string, newAxis: AxisConfig) => {
        onConfigChange({
          ...config,
          axes: config.axes.map((axis) => (axis.id === axisId ? newAxis : axis)),
        });
      };
    
      const handleAddSeries = () => {
        const newSeries: SeriesConfig = {
          id: `series-${config.series.length + 1}`,
          axisId: config.axes[0]?.id || '',
          name: `Series ${config.series.length + 1}`,
          type: 'linear',
          valueField: 'value',
          color: '#000000',
        };
        onConfigChange({
          ...config,
          series: [...config.series, newSeries],
        });
      };
    
      const handleRemoveSeries = (seriesId: string) => {
        onConfigChange({
          ...config,
          series: config.series.filter((series) => series.id !== seriesId),
        });
      };
    
      const handleSeriesChange = (seriesId: string, newSeries: SeriesConfig) => {
        onConfigChange({
          ...config,
          series: config.series.map((series) =>
            series.id === seriesId ? newSeries : series
          ),
        });
      };
    
      const handleTimeRangeChange = (newTimeRange: number) => {
        onConfigChange({
          ...config,
          timeRange: newTimeRange,
        });
      };
    
      return (
        <div className="border rounded-md p-4">
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'axes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('axes')}
            >
              Axes
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('series')}
            >
              Data Series
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === 'timeRange' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('timeRange')}
            >
              Time Range
            </button>
          </div>
    
          {activeTab === 'axes' && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-bold">Axes Management</h3>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center space-x-1"
                  onClick={handleAddAxis}
                >
                  <Plus size={16} />
                  <span>Add Axis</span>
                </button>
              </div>
              {config.axes.map((axis) => (
                <div key={axis.id} className="border p-2 mb-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <select
                      value={axis.type}
                      onChange={(e) =>
                        handleAxisChange(axis.id, {
                          ...axis,
                          type: e.target.value as 'left' | 'right',
                        })
                      }
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Axis Name (optional)"
                      value={axis.name || ''}
                      onChange={(e) =>
                        handleAxisChange(axis.id, { ...axis, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded-md"
                    />
                    <input
                      type="color"
                      value={axis.color}
                      onChange={(e) =>
                        handleAxisChange(axis.id, { ...axis, color: e.target.value })
                      }
                    />
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={axis.dynamicScaling}
                        onChange={(e) =>
                          handleAxisChange(axis.id, {
                            ...axis,
                            dynamicScaling: e.target.checked,
                          })
                        }
                      />
                      <span>Dynamic Scaling</span>
                    </label>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleRemoveAxis(axis.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
    
          {activeTab === 'series' && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-bold">Data Series Configuration</h3>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center space-x-1"
                  onClick={handleAddSeries}
                  disabled={config.axes.length === 0}
                >
                  <Plus size={16} />
                  <span>Add Series</span>
                </button>
              </div>
              {config.series.map((series) => (
                <div key={series.id} className="border p-2 mb-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Series Name"
                      value={series.name}
                      onChange={(e) =>
                        handleSeriesChange(series.id, {
                          ...series,
                          name: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-md"
                    />
                    <select
                      value={series.type}
                      onChange={(e) =>
                        handleSeriesChange(series.id, {
                          ...series,
                          type: e.target.value as 'linear' | 'bar' | 'area',
                        })
                      }
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="linear">Linear</option>
                      <option value="bar">Bar</option>
                      <option value="area">Area</option>
                    </select>
                    <select
                      value={series.axisId}
                      onChange={(e) =>
                        handleSeriesChange(series.id, {
                          ...series,
                          axisId: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-md"
                    >
                      {config.axes.map((axis) => (
                        <option key={axis.id} value={axis.id}>
                          {axis.name || axis.id}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Value Field"
                      value={series.valueField}
                      onChange={(e) =>
                        handleSeriesChange(series.id, {
                          ...series,
                          valueField: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded-md"
                    />
                    <input
                      type="color"
                      value={series.color}
                      onChange={(e) =>
                        handleSeriesChange(series.id, {
                          ...series,
                          color: e.target.value,
                        })
                      }
                    />
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleRemoveSeries(series.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
    
          {activeTab === 'timeRange' && (
            <div>
              <h3 className="font-bold">Time Range Control</h3>
              <div className="mt-2">
                <label htmlFor="timeRange" className="block mb-1">
                  Number of Recent Days to Display:
                </label>
                <input
                  type="number"
                  id="timeRange"
                  min="1"
                  value={config.timeRange}
                  onChange={(e) =>
                    handleTimeRangeChange(parseInt(e.target.value, 10))
                  }
                  className="border px-2 py-1 rounded-md w-full"
                />
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default ChartConfigPanel;
