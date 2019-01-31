import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
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
      <div>
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
          <XAxis dataKey='label' minTickGap={20}/>
          <YAxis type="number" domain={['auto', 'auto']}/> {/* sets range of y axis */}
          <Tooltip />
          <Line type="monotone" dataKey="low" dot={false}/>
        </LineChart>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1d</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1m</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>3m</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>6m</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>ytd</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1y</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>2y</Button>
        <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>5y</Button>
      </div>
    );
  }
}

export default Charts;
