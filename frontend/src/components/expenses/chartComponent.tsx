import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface Transaction {
  date: string; // Format: YYYY-MM-DD
  amount: number;
}

interface SpendingLineChartProps {
  transactions: Transaction[];
}

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const generate30DayRange = () => {
  const today = new Date();
  const result: Transaction[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    result.push({
      date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
      amount: 0,
    });
  }

  return result;
};

const SpendingLineChart = ({ transactions }: SpendingLineChartProps) => {
  // Pre-fill 30 days with zero
  const baseData = generate30DayRange();

  // Merge actual transactions into the baseData
  const mergedData = baseData.map(day => {
    const match = transactions.find(tx => tx.date === day.date);
    return {
      ...day,
      amount: match ? match.amount : 0,
    };
  });

  return (
    <div id='chart-inside'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis tickFormatter={(value: number) => `$${value}`}/>
          <Tooltip
            labelFormatter={(label) => formatDateLabel(label)}
            formatter={(value) => [`$${value}`, 'Amount']}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingLineChart;
