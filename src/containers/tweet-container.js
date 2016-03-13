import React, { PropTypes } from 'react';
import Actions              from '../actions';
import Tweet                from '../components/tweet';

export default class TweetContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  onClick(event) {
    this.store.dispatch(Actions.tweets.selectTweet(this.props.tweet, this.props.tab, this.props.account));
  }

  render() {
    return(
      <Tweet
        account={this.props.account}
        active={this.props.activeTweetId === this.props.tweet.id_str}
        tab={this.props.tab}
        tweet={this.props.tweet}
        onClick={this.onClick.bind(this)}
      />
    );
  }
}
