export interface AxisConfig {
      id: string;
      type: 'left' | 'right';
      name?: string;
      color: string;
      dynamicScaling: boolean;
    }
    
    export interface SeriesConfig {
      id: string;
      axisId: string;
      name: string;
      type: 'linear' | 'bar' | 'area';
      valueField: string;
      color: string;
    }
    
    export interface ChartConfig {
      axes: AxisConfig[];
      series: SeriesConfig[];
      timeRange: number;
    }
    
    export interface DataPoint {
      time: Date;
      [key: string]: any;
    }
