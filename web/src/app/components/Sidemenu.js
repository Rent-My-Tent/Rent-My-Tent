// Frameworks
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { navigate } from '@reach/router';
import window from 'global';
import * as _ from 'lodash';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

// App Components
import { AppTitleLink } from './AppTitleLink';

// Common
import { GLOBALS } from '../../utils/globals';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';

// Tabs List for App
import appTabsList from './AppTabsList';


const Sidemenu = ({ closeDrawer }) => {
    const classes = useRootStyles();

    const _currentTabIndex = () => {
        const path = window.location.pathname.replace(`${GLOBALS.APP_ROOT}/`, '');
        const routeId = _.first(path.split('/'));
        return _.get(_.find(appTabsList, {id: routeId}), 'index', 0);
    };
    const appTab = _currentTabIndex();

    const _getIndexByTabKey = (tabKey) => {
        return _.indexOf(_.keys(appTabsList) || [], tabKey)
    };

    const _selectTab = (tabKey) => () => {
        const defaultRoute = appTabsList.market.route;
        const route = _.get(_.find(appTabsList, {id: tabKey}), 'route', defaultRoute);
        if (!_.isEmpty(route)) {
            closeDrawer();
            navigate(`${GLOBALS.APP_ROOT}${route}`);
        }
    };

    const _isSelected = (tabKey) => {
        return appTab === _getIndexByTabKey(tabKey)
    };

    return (
        <div>
            <AppBar position="static" className={clsx(classes.sidemenu, classes.appBar)}>
                <Toolbar>
                    <AppTitleLink title="" />
                </Toolbar>
            </AppBar>
            <Divider/>

            <List>
                {_.map(appTabsList, (tabData, tabKey) => (
                    <ListItem
                        button
                        key={tabKey}
                        selected={_isSelected(tabKey)}
                        onClick={_selectTab(tabKey)}
                    >
                        <ListItemText
                            primary={tabData.label}
                        />
                    </ListItem>
                ))}
            </List>

        </div>
    );
};

Sidemenu.propTypes = {
    title: PropTypes.string.isRequired,
    closeDrawer: PropTypes.func.isRequired,
};

export { Sidemenu };
