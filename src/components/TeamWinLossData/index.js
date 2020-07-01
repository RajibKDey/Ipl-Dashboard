import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash'

const useStyles = makeStyles({
  table: {
    '& th': {
        padding: '4px',
    },
    '& td': {
        lineHeight: .8,
        padding: '8px',
    },
  },
});


export default function TeamWinLossData(props) {
  const classes = useStyles();

  let matchId = Object.keys(props.data)

  let teamWinLoss = []
  matchId.forEach( match => {
    let opponent = _.get(props.data, match, '-').Opponent_Team_Id
    let team = _.get(props.data, match, '-').Team_Name_Id
    let winner = _.get(props.data, match, '-').Match_Winner_Id
    if(opponent === winner){
      let teamStats = _.get(teamWinLoss, opponent, '-')
      let teamStats1 = _.get(teamWinLoss, team, '-')
      if(teamStats !== '-'){
        teamWinLoss[opponent] = {...teamStats, wins: teamStats.wins + 1}
      } else {
        teamWinLoss[opponent] = {wins: 1, loses: 0}
      }
      if(teamStats1 !== '-'){
        teamWinLoss[team] = {...teamStats1, loses: teamStats1.loses + 1}
      } else {
        teamWinLoss[team] = {wins: 0, loses: 1}
      }
    } else {
      let teamStats = _.get(teamWinLoss, opponent, '-')
      let teamStats1 = _.get(teamWinLoss, team, '-')
      if(teamStats !== '-'){
        teamWinLoss[opponent] = {...teamStats, loses: teamStats.loses + 1}
      } else {
        teamWinLoss[opponent] = {loses: 1, wins: 0}
      }
      if(teamStats1 !== '-'){
        teamWinLoss[team] = {...teamStats1, wins: teamStats1.wins + 1}
      } else {
        teamWinLoss[team] = {loses: 0, wins: 1}
      }
    }
  })

  let teamList = Object.keys(teamWinLoss)
  let teamPerformance = []
  teamList.forEach(team => {
    teamPerformance.push([team, teamWinLoss[team]['wins'], teamWinLoss[team]['loses'], ((teamWinLoss[team]['wins']/(teamWinLoss[team]['wins']+teamWinLoss[team]['loses']))*100).toFixed(2)])
  })

  return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Team ID</TableCell>
                    <TableCell align="right">Wins</TableCell>
                    <TableCell align="right">Loses</TableCell>
                    <TableCell align="right">Win (%)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {teamPerformance.map((row) => (
                    <TableRow key={row[0]}>
                      <TableCell scope="row">{row[0]}</TableCell>
                      <TableCell align="right">{row[1]}</TableCell>
                      <TableCell align="right">{row[2]}</TableCell>
                      <TableCell align="right">{row[3]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}