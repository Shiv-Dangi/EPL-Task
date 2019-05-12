import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loadable from 'react-loadable';
import Loader from './modules/shared/Loader';

let HomePage = Loadable({
	loader: () => import(/* webpackChunkName: "article-list" */ './modules/HomePage'),
	loading: Loader
});

class AppRouter extends Component {
	render() {
		return (
			<>
				<div className='sticky-header'>
					<span
						onClick={() => {
							this.props.history.push('/');
						}}
						className='nav-menu-item'
					>
						EPL Season 2011-12
					</span>
				</div>
				<Switch onChange={this.onRouteChange}>
					<Route exact path='/' component={HomePage} />
					{/* <Route exact path='*' component={PageNotFound}/> */}
				</Switch>
			</>
		);
	}
}

export default AppRouter;
