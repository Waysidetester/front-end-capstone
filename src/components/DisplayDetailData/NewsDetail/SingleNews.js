import React from 'react';
import './SingleNews.scss';

class SingleNews extends React.Component {
  render() {
    return (
      <div className='news-link'>
        <a
        className='btn btn-outline-dark'
        href={this.props.articleInfo.url}
        target={'_blank'}>
          {this.props.articleInfo.headline}
          <div className='text-info'> - {this.props.articleInfo.source}</div>
        </a>
      </div>
    );
  }
}

export default SingleNews;
