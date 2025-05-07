import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
    date: string;
    amount: number;
  }
  
  const SpendingLineChart = ({ data }: { data: ChartDataPoint[] }) => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
           
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  

export default SpendingLineChart;