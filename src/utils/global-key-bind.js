import * as Keycode  from './keycode';
import RichState     from './rich-state';
import Actions       from '../actions';
import TwitterClient from './twitter-client';

export default class GlobalKeyBind {
  static subscribe(store) {
    new GlobalKeyBind(store).subscribe();
  }

  constructor(store) {
    this.dispatch = store.dispatch;
    this.state = new RichState(store);
    store.subscribe(() => {
      this.state = new RichState(store);
    });
  }

  subscribe() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === Keycode.TAB) {
        this.handleTab(event);
        return;
      }

      if (!this.isEditing()) {
        switch (event.keyCode) {
          case Keycode.DOWN:
          case Keycode.J:
            this.handleJ(event);
            break;
          case Keycode.UP:
          case Keycode.K:
            this.handleK(event);
            break;
          case Keycode.F:
            this.handleF(event);
            break;
          case Keycode.SPACE:
          case Keycode.ZERO:
            this.handleZero(event);
            break;
        }
      }
    });
  }

  handleTab(event) {
    let editor = document.getElementById('tweet_editor');

    if (document.activeElement != editor) {
      event.preventDefault();
      editor.focus();
    }
  }

  handleJ(event) {
    if (event.altKey || event.metaKey) return;
    event.preventDefault();

    let tweet = this.state.findNextTweet();
    if (!tweet) return null;
    this.dispatch(Actions.tweets.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));

    let visibleLimit = document.body.clientHeight;
    let activeBottom = document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().bottom;
    if (visibleLimit < activeBottom) {
      let element = document.querySelector('.timeline.active .tweets.active');
      element.scrollTop += element.clientHeight / 2;
    }
  }

  handleK(event) {
    if (event.altKey || event.metaKey) return;
    event.preventDefault();

    let tweet = this.state.findPrevTweet();
    if (!tweet) return null;
    this.dispatch(Actions.tweets.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));

    let activeTop = document.querySelector('.timeline.active .tweets.active .tweet.active').getBoundingClientRect().top;
    let visibleLimit = document.querySelector('.timeline.active .tweets.active').getBoundingClientRect().top;
    if (activeTop < visibleLimit) {
      let element = document.querySelector('.timeline.active .tweets.active');
      element.scrollTop -= element.clientHeight / 2;
    }
  }

  handleF(event) {
    event.preventDefault();

    let client = new TwitterClient(this.state.activeAccount());
    let active  = this.state.activeTweet();
    if (!active) return null;

    client.favoriteStatus(active.id_str, (tweet) => {
      this.dispatch(Actions.tweets.addTweet(tweet, this.state.activeAccount(), this.state.activeTab()));
    });
  }

  handleZero(event) {
    event.preventDefault();

    let tweet = this.state.findFirstTweet();
    if (!tweet) return null;

    this.dispatch(Actions.tweets.selectTweet(tweet, this.state.activeTab(), this.state.activeAccount()));
    let element = document.querySelector('.timeline.active .tweets.active');
    element.scrollTop = 0;
  }

  isEditing() {
    return document.activeElement.id === 'tweet_editor' ||
      document.activeElement.className === 'search_field';
  }
}
