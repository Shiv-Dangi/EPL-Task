// vender
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import { getEplData } from '../../redux/HomePage/actions';

//components
import MatchesTable from './MatchesTable';
import BubbleChart from './BubbleChart';

//css
import './index.scss';

class HomePage extends Component {
	componentDidMount() {
		this.props.getEplData();
	}

	render() {
		return (
			<div className='container'>
				<div className='section'>
					<div>section-1</div>
					<BubbleChart summary={this.props.summary} />
				</div>
				<div className='section'>
					<div>section-2</div>
					<MatchesTable summary={this.props.summary} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ eplData: { summary } }) => {
	return {
		summary
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getEplData }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage);
