// Frameworks
import React from 'react';
import { navigate } from 'gatsby';
import * as _ from 'lodash';

// Material UI
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// App Components
import { GLOBALS } from '../../utils/globals';
import appTabsList from './AppTabsList';

function a11yProps(id) {
    return {
        id: `app-tab-${id}`,
        'aria-controls': `app-tab-${id}`,
    };
}

// App Tab Navigation
const AppTabs = ({ location }) => {

    const _currentTabIndex = () => {
        const path = location.pathname.replace(`${GLOBALS.APP_ROOT}/`, '');
        const routeId = _.first(path.split('/'));
        return _.get(_.find(appTabsList, {id: routeId}), 'index', 0);
    };
    const appTab = _currentTabIndex();

    const handleTabChange = (event, routeIndex) => {
        const defaultRoute = appTabsList.market.route;
        const route = _.get(_.find(appTabsList, {index: routeIndex}), 'route', defaultRoute);
        if (!_.isEmpty(route)) {
            navigate(`${GLOBALS.APP_ROOT}${route}`);
        }
    };

    return (
        <Hidden smDown implementation="css">
            <AppBar position="static" color="default">
                <Tabs
                    value={appTab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="App Tabs"
                >
                    {_.map(appTabsList, (tabData, tabKey) => {
                        return (<Tab
                            key={tabKey}
                            label={tabData.label}
                            {...a11yProps(tabData.id)}
                        />);
                    })}
                </Tabs>
            </AppBar>
        </Hidden>
    );
};

export { AppTabs };
