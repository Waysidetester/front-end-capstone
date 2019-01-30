import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './Charts.scss';

class Charts extends React.Component {
  static propTypes ={
    chartData: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      low: PropTypes.number,
    })),
  }

  render() {
    return (
      <LineChart
      width={730}
      height={250}
      data={this.props.chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
        <CartesianGrid />
        <XAxis dataKey='label'/>
        <YAxis type="number" domain={['auto', 'auto']}/> {/* sets range of y axis */}
        <Tooltip />
        <Line type="monotone" dataKey="low" dot={false}/>
      </LineChart>
    );
  }
}

export default Charts;
