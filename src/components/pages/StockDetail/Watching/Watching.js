import React from 'react';
import PropTypes from 'prop-types';
import fbMethods from '../../../../helpers/firebase/fbMethods';
import './Watching.scss';

class Watching extends React.Component {
  static propTypes = {
    stockSymbol: PropTypes.string,
  }

  state = {
    watching: false,
    watchingList: [],
    watchingId: '',
  };

  checkIfWatched = () => {
    const validator = {
      watching: false,
      id: '',
    };
    this.state.watchingList.forEach((stock) => {
      if (stock.ticker === this.props.stockSymbol) {
        validator.watching = true;
        validator.id = stock.id;
      }
    });
    this.setState({
      watching: validator.watching,
      watchingId: validator.id,
    });
  }

  watchingListMaker = () => {
    fbMethods.readWatchingList()
      .then((data) => {
        this.setState({
          watchingList: data,
        });
        this.checkIfWatched();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.watchingListMaker();
  }

  render() {
    // builds stock object for watching call
    const watchingStockObj = {
      ticker: this.props.stockSymbol,
      uid: fbMethods.currentUID(),
    };


    // saving stock to active collection
    const saveWatch = () => {
      this.props.stockSymbol
        ? fbMethods.watchingCreate(watchingStockObj).then(() => {
          this.watchingListMaker();
          this.forceUpdate();
        })
        : console.error('error reading stock symbol');
    };

    const removeWatch = () => {
      fbMethods.watchingDelete(this.state.watchingId)
        .then(() => {
          this.watchingListMaker();
          this.forceUpdate();
        });
    };

    return (
      <h1>
      Stock Detail
        <img
        src='https://upload.wikimedia.org/wikipedia/commons/c/ce/Plus_font_awesome.svg'
        alt='Add/Remove from Watchlist'
        className={this.state.watching ? 'watchlist-deselect' : 'watchlist-select'}
        onClick={() => {
          this.state.watching
          // remove from watchlist if watching, or add if not
            ? removeWatch()
            : saveWatch();
        }}
        />
      </h1>
    );
  }
}

export default Watching;
