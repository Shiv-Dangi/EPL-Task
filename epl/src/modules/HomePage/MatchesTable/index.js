import React, { PureComponent } from 'react';

class MatchesTable extends PureComponent {
	renderTableRows = () => {
		const { summary } = this.props;
		let tableRows = [];
		if (summary && Object.keys(summary).length) {
			for (let key in summary) {
				let teamObj = summary[key];
				tableRows.push(
					<tr key={key}>
						<td>{teamObj.team.code}</td>
						<td>{teamObj.totalMatches}</td>
						<td>{teamObj.won}</td>
						<td>{teamObj.lost}</td>
						<td>{teamObj.ties}</td>
						<td>{teamObj.goalsScoredFor}</td>
						<td>{teamObj.goalsScoredAgainst}</td>
					</tr>
				);
			}
		}
		return tableRows;
	};

	render() {
		return (
			<div className='summary-table'>
				<table className='table table-bordered'>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>Teams</th>
							<th scope='col'>Total Matches</th>
							<th scope='col'>Won</th>
							<th scope='col'>Lost</th>
							<th scope='col'>Ties</th>
							<th scope='col'>Total Goals Scored For</th>
							<th scope='col'>Total Goals Scored Against</th>
						</tr>
					</thead>
					<tbody>{this.renderTableRows()}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ eplData: { summary } }) => {
	return {
		summary
	};
};

export default MatchesTable;
