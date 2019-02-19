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
      chartTimeFrameChanger: PropTypes.func,
    })),
  }

  render() {
    return (
      <div>
        {/* ReCharts package http://recharts.org */}
        <LineChart
        height={300}
        width={document.getElementsByClassName('row')[0].offsetWidth}
        data={this.props.chartData}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}>
          <CartesianGrid />
          <XAxis dataKey='label' minTickGap={20}/>
          <YAxis type="number" domain={['auto', 'auto']}/> {/* sets range of y axis */}
          <Tooltip />
          <Line type="monotone" dataKey="low" dot={false}/>
        </LineChart>

        {/* buttons to select timeframe for stock chart */}
        <div className='chart-buttons'>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1d</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1m</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>3m</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>6m</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>ytd</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>1y</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>2y</Button>
          <Button outline color='success' className='time-selector' onClick={this.props.chartTimeFrameChanger}>5y</Button>
        </div>
      </div>
    );
  }
}

export default Charts;
