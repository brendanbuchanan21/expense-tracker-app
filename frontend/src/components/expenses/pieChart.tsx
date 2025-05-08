import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  interface Transaction {
    amount: string; // assuming amount is a string like "1000.00"
    category: string;
  }
  
  interface PieChartComponentProps {
    data: Transaction[];
  }
  
  // Generate a color palette for categories
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#A28BD4', '#FF6666', '#8884D8', '#82ca9d'
  ];
  
  const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    // Aggregate total amount per category
    const aggregatedData = Object.values(
      data.reduce<Record<string, { category: string; value: number }>>((acc, curr) => {
        const amount = parseFloat(curr.amount);
        if (!acc[curr.category]) {
          acc[curr.category] = { category: curr.category, value: 0 };
        }
        acc[curr.category].value += amount;
        return acc;
      }, {})
    );
  
    return (
      <div id='pie-chart-inside'>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={aggregatedData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label
            >
              {aggregatedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PieChartComponent;
  

