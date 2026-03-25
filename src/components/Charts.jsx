import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Charts = ({ data = [] }) => {
  const hasData = data.some(item => item.value > 0);

  if (!hasData) {
    return (
      <div className="chart-card">
        <div className="chart-title">Application Pipeline</div>
        <div className="empty-state" style={{ padding: '40px 0' }}>
          No data yet. Start applying!
        </div>
      </div>
    );
  }

  const filteredData = data.filter(item => item.value > 0);

  return (
    <div className="chart-card">
      <div className="chart-title">Application Pipeline</div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            stroke="none"
          >
            {filteredData.map((entry, index) => (
              <Cell key={'cell-' + index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '10px', background: '#1a1f2e', border: 'none', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
