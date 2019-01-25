import React from 'react';
import SavedStock from './SavedStock/SavedStock';
import fbMethods from '../../../helpers/firebase/fbMethods';
import './Portfolio.scss';

class Portfolio extends React.Component {
  state = {
    trackedStocks: [],
  }

  componentDidMount() {
    fbMethods.readAtvCollection()
      .then((matchedStocks) => {
        this.setState({
          trackedStocks: matchedStocks,
        });
      });
  }

  render() {
    const popList = () => {
      if (this.state.trackedStocks.length > 0) {
        return this.state.trackedStocks.map(stock => <SavedStock fbDetail={stock} key={stock.id}/>);
      }
      return 'No Stocks Saved!';
    };

    return (
      <div>
        <h1>Portfolio</h1>
        {popList()}
      </div>
    );
  }
}

export default Portfolio;
