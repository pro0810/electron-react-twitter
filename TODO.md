# v1
## features
- [ ] Show RT properly
- [ ] Tweet chars counter
- [ ] Event notification
- [ ] Unread tweet counter
- [ ] Drop self reply and set remove tweet button
- [ ] Notification tab?
- [ ] Localize?
- [ ] Insert Enter by Alt+Enter
- [ ] Ctrl+Tab binding to change tabs?
- [ ] Dock badge

## internal
- [ ] Drop unnecessary return in Authentication and TwitterClient
- [x] Cleanup Keycode

# v2 or later
## features
- [ ] Create configuration window
  - [ ] Migrate add account action
  - [ ] Font size
  - [ ] Allow Ctrl+Enter publish
- [ ] DM
- [ ] Show mention tree
- [ ] Show tweet detail
- [ ] Dropdown menu
- [ ] Favorites tab
- [ ] Reorder tabs
- [ ] Automatic Streaming refresher

## internal
- [ ] Change the way to focus on editor
- [ ] Drop hack for account selector focus
- [ ] Refactor state tree
  - [ ] Add interface to return default state
- [ ] Add a global action wrapper
- [ ] Use react-route or something to invoke action from component in IpcAction
- [ ] Minimize react component updates
  - [ ] Optimize tweet select performance
- [ ] Drop all document reference
- [ ] Use [i+1] instead of slice(1)[0]
- [ ] Refactor IpcAction, RichState
- [ ] Stop using querySelector
- [ ] Drop tab key binder