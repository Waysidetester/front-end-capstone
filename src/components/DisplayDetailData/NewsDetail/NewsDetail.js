import React from 'react';
import SingleNews from './SingleNews';

class NewsDetail extends React.Component {
  populateNews = () => this.props.newsDetail.map(snippet => <SingleNews articleInfo={snippet} key={snippet.url}/>);

  render() {
    if (this.props.newsDetail) {
      return (
        <div>
          <h3>News</h3>
          {this.populateNews()}
        </div>
      );
    }

    return (
      <div>
        <h3>News</h3>
      </div>
    );
  }
}

export default NewsDetail;
