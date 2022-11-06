import { message, notification } from 'antd';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { DashboardOutlined, AppstoreOutlined } from '@ant-design/icons';

class Utils {
  /**
   * Get first character from first & last sentences of a username
   * @param {String} name - Username
   * @return {String} 2 characters string
   */
  static getNameInitial(name) {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  /**
   * Get current path related object from Navigation Tree
   * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
   * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
   * @return {Object} object that contained the path string
   */
  static getRouteInfo(navTree, path) {
    if (navTree.path === path) {
      return navTree;
    }
    let route;
    for (let p in navTree) {
      if (navTree.hasOwnProperty(p) && typeof navTree[p] === 'object') {
        route = this.getRouteInfo(navTree[p], path);
        if (route) {
          return route;
        }
      }
    }
    return route;
  }

  /**
   * Get accessible color contrast
   * @param {String} hex - Hex color code e.g '#3e82f7'
   * @return {String} 'dark' or 'light'
   */
  static getColorContrast(hex) {
    if (!hex) {
      return 'dark';
    }
    const threshold = 130;
    const hRed = hexToR(hex);
    const hGreen = hexToG(hex);
    const hBlue = hexToB(hex);
    function hexToR(h) {
      return parseInt(cutHex(h).substring(0, 2), 16);
    }
    function hexToG(h) {
      return parseInt(cutHex(h).substring(2, 4), 16);
    }
    function hexToB(h) {
      return parseInt(cutHex(h).substring(4, 6), 16);
    }
    function cutHex(h) {
      return h.charAt(0) === '#' ? h.substring(1, 7) : h;
    }
    const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
    if (cBrightness > threshold) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  /**
   * Darken or lighten a hex color
   * @param {String} color - Hex color code e.g '#3e82f7'
   * @param {Number} percent - Percentage -100 to 100, positive for lighten, negative for darken
   * @return {String} Darken or lighten color
   */
  static shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    const RR =
      R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
    const GG =
      G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
    const BB =
      B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);
    return `#${RR}${GG}${BB}`;
  }

  /**
   * Convert RGBA to HEX
   * @param {String} rgba - RGBA color code e.g 'rgba(197, 200, 198, .2)')'
   * @return {String} HEX color
   */
  static rgbaToHex(rgba) {
    const trim = (str) => str.replace(/^\s+|\s+$/gm, '');
    const inParts = rgba.substring(rgba.indexOf('(')).split(','),
      r = parseInt(trim(inParts[0].substring(1)), 10),
      g = parseInt(trim(inParts[1]), 10),
      b = parseInt(trim(inParts[2]), 10),
      a = parseFloat(
        trim(inParts[3].substring(0, inParts[3].length - 1))
      ).toFixed(2);
    const outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255)
        .toString(16)
        .substring(0, 2)
    ];

    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    });
    return `#${outParts.join('')}`;
  }

  /**
   * Returns either a positive or negative
   * @param {Number} number - number value
   * @param {any} positive - value that return when positive
   * @param {any} negative - value that return when negative
   * @return {any} positive or negative value based on param
   */
  static getSignNum(number, positive, negative) {
    if (number > 0) {
      return positive;
    }
    if (number < 0) {
      return negative;
    }
    return null;
  }

  /**
   * Returns either ascending or descending value
   * @param {Object} a - antd Table sorter param a
   * @param {Object} b - antd Table sorter param b
   * @param {String} key - object key for compare
   * @return {any} a value minus b value
   */
  static antdTableSorter(a, b, key) {
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return a[key] - b[key];
    }

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      a = a[key].toLowerCase();
      b = b[key].toLowerCase();
      return a > b ? -1 : b > a ? 1 : 0;
    }
    return;
  }

  /**
   * Filter array of object
   * @param {Array} list - array of objects that need to filter
   * @param {String} key - object key target
   * @param {any} value  - value that excluded from filter
   * @return {Array} a value minus b value
   */
  static filterArray(list, key, value) {
    let data = list;
    if (list) {
      data = list.filter((item) => item[key] === value);
    }
    return data;
  }

  /**
   * Remove object from array by value
   * @param {Array} list - array of objects
   * @param {String} key - object key target
   * @param {any} value  - target value
   * @return {Array} Array that removed target object
   */
  static deleteArrayRow(list, key, value) {
    let data = list;
    if (list) {
      data = list.filter((item) => item[key] !== value);
    }
    return data;
  }

  /**
   * Wild card search on all property of the object
   * @param {Number | String} input - any value to search
   * @param {Array} list - array for search
   * @return {Array} array of object contained keyword
   */
  static wildCardSearch(list, input) {
    const searchText = (item) => {
      for (let key in item) {
        if (item[key] == null) {
          continue;
        }
        if (
          item[key]
            .toString()
            .toUpperCase()
            .indexOf(input.toString().toUpperCase()) !== -1
        ) {
          return true;
        }
      }
    };
    list = list.filter((value) => searchText(value));
    return list;
  }

  /**
   * Get Breakpoint
   * @param {Object} screens - Grid.useBreakpoint() from antd
   * @return {Array} array of breakpoint size
   */
  static getBreakPoint(screens) {
    let breakpoints = [];
    for (const key in screens) {
      if (screens.hasOwnProperty(key)) {
        const element = screens[key];
        if (element) {
          breakpoints.push(key);
        }
      }
    }
    return breakpoints;
  }

  /**
   * Get BaseName of the file
   */

  static getBaseName(path) {
    // console.log(path)
    if (path) {
      const parsed = path.split('/');
      return parsed[parsed.length - 1];
    }
    return '';
  }

  /**
   * Create Categories based on the list of items including children
   */
  static createCategoryList(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => !cat?.parentId);
    } else {
      category = categories.filter((cat) => cat?.parentId === parentId);
    }
    // eslint-disable-next-line prefer-const
    for (let cate of category) {
      categoryList.push({
        id: cate.id,
        title: cate.name,
        value: cate.id,
        key: cate.id,
        children: this.createCategoryList(categories, cate.id)
      });
    }

    return categoryList;
  }

  static errorValidator(res) {
    console.log('my-res', res);
    if (res) {
      if (Array.isArray(res?.message)) {
        // for (const [key, value] of Object.entries(res?.errors)) {
        //   value.forEach((cur) => {
        //     notification.error({
        //       description: key,
        //       message: cur,
        //     })
        //   })
        // }
        res.message?.forEach((message) => {
          notification.error({
            message
          });
        });
      } else if (!Array.isArray(res?.message)) {
        notification.error({
          message: res?.message
        });
      } else {
        // toast.error(res.title)
        notification.error({
          // description: res.title,
          message: res.error
        });
      }
    }
    //  else {
    //   notification.error({
    //     description: 'Something Went Wrong',
    //     message: 'Error',
    //   });
    // }
  }

  static getSubAdminNavs = (subAdminRoles) => {
    const navItems = [
      {
        key: 'dashboards',
        path: `${APP_PREFIX_PATH}/dashboards`,
        title: 'sidenav.dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      }
    ];
    subAdminRoles.forEach((role) => {
      if (role.module === 'BANNER') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-banner',
            path: `${APP_PREFIX_PATH}/dashboards/banner`,
            title: 'Banner',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'CAR') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-car',
            path: `${APP_PREFIX_PATH}/dashboards/car`,
            title: 'Car',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'SETINGS') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-settings',
            path: `${APP_PREFIX_PATH}/dashboards/settings`,
            title: 'Settings',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'VEHICLE TYPE') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-vehicle-type',
            path: `${APP_PREFIX_PATH}/dashboards/vehicle-type`,
            title: 'VehicleTypes',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'PARTICIPANT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-participant',
            path: `${APP_PREFIX_PATH}/dashboards/participant`,
            title: 'Participant',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'REGISTRATION') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-registrations',
            path: `${APP_PREFIX_PATH}/dashboards/registration`,
            title: 'Registrations',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'CLIENT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-client',
            path: `${APP_PREFIX_PATH}/dashboards/client`,
            title: 'Client',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'FUEL TYPE') {
        // Add Fuel Type Later
      } else if (role.module === 'BRAND') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-brand',
            path: `${APP_PREFIX_PATH}/dashboards/brand`,
            title: 'Brand',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'BRAND_VARIANT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-brand-brand-variant',
            path: `${APP_PREFIX_PATH}/dashboards/brand/brand-variant/brand-variant-list`,
            title: 'Brand Variant',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'INFORMATION') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-information',
            path: `${APP_PREFIX_PATH}/dashboards/information`,
            title: 'Information',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'AUCTION') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-auction-auction',
            path: `${APP_PREFIX_PATH}/dashboards/auction/auction/auction-list`,
            title: 'Auction',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'AUCTION_INVENTORY') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-auction-auction-inventory',
            path: `${APP_PREFIX_PATH}/dashboards/auction/auction-inventory/auction-inventory-list`,
            title: 'Auction Inventory',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'BIDDING') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-auction-bidding',
            path: `${APP_PREFIX_PATH}/dashboards/auction/bidding/bidding-list`,
            title: 'Bidding',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'WATCH_LIST') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-watchlist',
            path: `${APP_PREFIX_PATH}/dashboards/watchlist`,
            title: 'Watchlist',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'INVENTORY_COMMENT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-comment',
            path: `${APP_PREFIX_PATH}/dashboards/comment`,
            title: 'Comment',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'WINNING') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-winning',
            path: `${APP_PREFIX_PATH}/dashboards/winning`,
            title: 'Winning',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'APPROVE_BID') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-approve-bid',
            path: `${APP_PREFIX_PATH}/dashboards/approve-bid`,
            title: 'Approve Bid',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'DEPOSIT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-deposits',
            path: `${APP_PREFIX_PATH}/dashboards/deposit`,
            title: 'Deposits',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'WALLET_TRANSACTION') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-wallet-transactions',
            path: `${APP_PREFIX_PATH}/dashboards/wallet-transaction`,
            title: 'Wallet Transactions',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'BUYING_LIMIT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-wallet',
            path: `${APP_PREFIX_PATH}/dashboards/wallet`,
            title: 'Buying Limits',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'CLIENT') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-client',
            path: `${APP_PREFIX_PATH}/dashboards/client`,
            title: 'Client',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'GROUP') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-general-group',
            path: `${APP_PREFIX_PATH}/dashboards/general/group/group-list`,
            title: 'Groups',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'CITY') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-general-city',
            path: `${APP_PREFIX_PATH}/dashboards/general/city/city-list`,
            title: 'City',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'REGION') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-general-region',
            path: `${APP_PREFIX_PATH}/dashboards/general/region/region-list`,
            title: 'Region',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'STATE') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-general-state',
            path: `${APP_PREFIX_PATH}/dashboards/general/state/state-list`,
            title: 'State',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      } else if (role.module === 'EMPLOYEE_TYPE') {
        if (role.fetch) {
          navItems[0].submenu.push({
            key: 'dashboards-employee-type',
            path: `${APP_PREFIX_PATH}/dashboards/employee-type`,
            title: 'Employee Types',
            icon: AppstoreOutlined,
            breadcrumb: false,
            submenu: []
          });
        }
      }
    });
    return navItems;
  };
}

export default Utils;
