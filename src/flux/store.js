import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";
import AccesRules from "../data/accesRules";

const getNavItems = () => {
  try {
    return getSidebarNavItems();
  } catch (error) {
    return [];
  }
};

let _store = {
  menuVisible: true,
  navItems: getNavItems(),
  userData: {
    id: window.localStorage.getItem("id"),
    username: window.localStorage.getItem("username"),
    authority: window.localStorage.getItem("authority"),
    token: window.localStorage.getItem("token"),
    firstLogin: window.localStorage.getItem("firstLogin")
  },
  selectedUsers: [],
  rules: AccesRules()
};

class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.openSidebar = this.openSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.cleareUserData = this.cleareUserData.bind(this);
    this.addToSelectedUsers = this.addToSelectedUsers.bind(this);
    this.selectAllUser = this.selectAllUser.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.LOGIN:
        this.setUserData(payload);
        break;
      case Constants.OPEN_SIDEBAR:
        this.openSidebar();
        break;
      case Constants.CLOSE_SIDEBAR:
        this.closeSidebar();
        break;
      case Constants.SELECT_USER:
        // this.deletedUser(payload);
        this.addToSelectedUsers(payload);
        break;
      case Constants.SELECT_ALL_USERS:
        this.selectAllUser(payload);
        break;
      case Constants.CLEARUSERDATA:
        this.cleareUserData();
        break;
      default:
    }
  }

  addToSelectedUsers(payload) {
    let index = _store.selectedUsers.findIndex(x => x.id === payload.id);

    if (index > -1) {
      _store.selectedUsers.splice(index, 1);
    } else {
      _store.selectedUsers = [..._store.selectedUsers, payload];
    }

    this.emit(Constants.SELECTE_USER);
  }

  selectAllUser(payload) {
    _store.selectedUsers = [...payload];
    this.emit(Constants.SELECTE_USER);
  }
  setUserData(payload) {
    _store.userData = payload;
    this.emit(Constants.LOGIN);
  }

  cleareUserData() {
    window.localStorage.clear();
    _store.userData = {};
    this.emit(Constants.CLEARUSERDATA);
  }

  openSidebar() {
    _store.menuVisible = false;
    this.emit(Constants.CHANGE);
  }

  closeSidebar() {
    _store.menuVisible = true;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSelectedUsers() {
    return _store.selectedUsers;
  }
  getUserData() {
    return _store.userData;
  }
  getSidebarItems() {
    /* items[6].title  */
    try {
      let navItems = _store.navItems.filter(item => {
        let subItems = item.subItems.filter(subitem =>
          _store.rules[_store.userData.authority].includes(subitem["title"])
        );

        if (subItems.length > 0) return { title: item.title, subItems };
      });

      return navItems;
    } catch (error) {
      return [];
    }
  }

  addChangeListener(action, callback) {
    this.on(action, callback);
  }

  removeChangeListener(action, callback) {
    this.removeListener(action, callback);
  }
}

export default new Store();
