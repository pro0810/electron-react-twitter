import React, { PropTypes } from 'react';
import Actions              from '../actions';
import { connect }          from 'react-redux';
import TwitterClient        from '../utils/TwitterClient'

class ListSelector extends React.Component {
  static propTypes = {
    account:             PropTypes.object.isRequired,
    listsByUserId:       PropTypes.object.isRequired,
    selectedTabByUserId: PropTypes.object.isRequired,
    clearAndSetTweets:   PropTypes.func.isRequired,
    setActiveListId:     PropTypes.func.isRequired,
  }

  lists() {
    return this.props.listsByUserId[this.props.account.id] || [];
  }

  isActive() {
    return this.props.selectedTabByUserId[this.props.account.id] === 'lists';
  }

  onListChanged(event) {
    let listId = event.target.value;
    if (listId > 0) {
      this.props.setActiveListId(listId, this.props.account);

      let client = new TwitterClient(this.props.account);
      client.listsStatuses(listId, (tweets) => {
        this.props.clearAndSetTweets(tweets, this.props.account, 'lists');
      });
    }
  }

  render() {
    return(
      <div className={`tweets_header list_selector ${this.isActive() ? 'active' : ''}`}>
        <select className='list_field' onChange={this.onListChanged.bind(this)}>
          <option value='0'>Select List...</option>
          {this.lists().map((list) =>
            <option key={list.id} value={list.id}>{list.full_name}</option>
          )}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listsByUserId: state.listsByUserId,
    selectedTabByUserId: state.selectedTabByUserId,
  };
}

export default connect(mapStateToProps, {
  ...Actions.lists,
  ...Actions.tweets,
})(ListSelector);
