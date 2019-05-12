import axios from 'axios';

export const getActions = (type, payload = {}) => {
	return {
		type,
		payload
	};
};

export const FETCH_TEAMS = 'FETCH_TEAMS';
export const SET_SUMMARY_DATA = 'SET_SUMMARY_DATA';

export const getEplData = () => dispatch => {
	axios
		.get('https://raw.githubusercontent.com/ajbitus/interview-tasks/master/epl-2011-12/teams.json')
		.then(res => {
			dispatch(getActions(FETCH_TEAMS, res.data.clubs));
			dispatch(getMatchData());
		})
		.catch(err => {
			console.log(err);
		});
};

const getMatchData = () => dispatch => {
	return axios
		.get('https://raw.githubusercontent.com/ajbitus/interview-tasks/master/epl-2011-12/matches.json')
		.then(res => {
			dispatch(getActions(SET_SUMMARY_DATA, getSummaryTable(res.data.rounds)));
		})
		.catch(err => {
			console.log(err);
		});
};

function getSummaryTable(rounds) {
	var summaryData = {};
	for (let i = 0; i < rounds.length; i++) {
		let roundMatchs = rounds[i].matches;
		for (let j = 0; j < roundMatchs.length; j++) {
			let { team1, team2, score1, score2 } = roundMatchs[j];

			let team1Summary = summaryData[team1.key] || getInitialSummary(team1);
			let team2Summary = summaryData[team2.key] || getInitialSummary(team2);

			team1Summary.totalMatches += 1;
			team1Summary.goalsScoredFor += score1;
			team1Summary.goalsScoredAgainst += score2;

			team2Summary.totalMatches += 1;
			team2Summary.goalsScoredFor += score2;
			team2Summary.goalsScoredAgainst += score1;

			if (score1 === score2) {
				team1Summary.ties += 1;
				team2Summary.ties += 1;
			} else if (score1 > score2) {
				team1Summary.won += 1;
				team2Summary.lost += 1;
			} else {
				team1Summary.lost += 1;
				team2Summary.won += 1;
			}
			summaryData[team1.key] = team1Summary;
			summaryData[team2.key] = team2Summary;
		}
	}
	return summaryData;
}

function getInitialSummary(team) {
	return {
		team: team,
		totalMatches: 0,
		won: 0,
		lost: 0,
		ties: 0,
		goalsScoredFor: 0,
		goalsScoredAgainst: 0
	};
}
