import React from 'react';
import fbMethods from '../../../helpers/firebase/fbMethods';
import RemovedStock from './RemovedStock/RemovedStock';
import './RemovedPortfolio.scss';

class RemovedPortfolio extends React.Component {
  state = {
    removedStock: [],
  }

  componentDidMount() {
    fbMethods.readRemovedFromActive()
      .then((matchedStocks) => {
        this.setState({
          removedStock: matchedStocks,
        });
      });
  }

  render() {
    const popList = () => {
      if (this.state.removedStock.length > 0) {
        return this.state.removedStock.map(
          stock => <RemovedStock fbDetail={stock} key={stock.id}/>,
        );
      }
      return 'No Stocks Saved!';
    };

    console.log(this.state);
    return (
      <div className='col-12'>
        <h1 className='tracking-title'>Removed Portfolio</h1>
        <div className='saved-summary'>
          {popList()}
        </div>
      </div>
    );
  }
}

export default RemovedPortfolio;
