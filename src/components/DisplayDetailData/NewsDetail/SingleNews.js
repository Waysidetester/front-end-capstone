import React from 'react';

class SingleNews extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.articleInfo.url}>
          {this.props.articleInfo.headline}
        </a>
        {this.props.articleInfo.summary !== 'No summary available.' ? `<div>${this.props.articleInfo.summary}</div>` : ''}
      </div>
    );
  }
}

export default SingleNews;
