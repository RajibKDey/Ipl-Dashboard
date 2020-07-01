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
    '& thead th': {
      borderBottom: '1px solid rgba(0,0,0,0.12)',
      color: 'rgba(0,0,0,0.9)',
      fontWeight: 600,
      fontSize: '1rem',
      '&:not(:last-of-type)': {
        borderRight: '1px solid rgba(0,0,0,0.12)',
      }
    },
    '& th': {
        padding: '8px',
    },
    '& td': {
        lineHeight: .8,
        padding: '12px',
    },
    '& tbody tr:last-of-type': {
      borderBottom: 0,
    },
    '& tr td:last-of-type' : {
      borderRight: 0,
    },
  },
  container: {
    border: '0.1px solid rgba(0,0,0,0.12)',
    boxShadow: '0 1px 1px 0 rgba(66, 66, 66, 0.08), 0 1px 3px 0px rgba(66, 66, 66, 0.16)',
    borderBottom: 0
  },
  cells: {
    border: '1px solid rgba(0,0,0,0.12)',
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
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align='center'>Team ID</TableCell>
                    <TableCell align="center">Wins</TableCell>
                    <TableCell align="center">Loses</TableCell>
                    <TableCell align="center">Win (%)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {teamPerformance.map((row) => (
                    <TableRow hover key={row[0]}>
                      <TableCell className={classes.cells} align='center'>{row[0]}</TableCell>
                      <TableCell className={classes.cells} align="center">{row[1]}</TableCell>
                      <TableCell className={classes.cells} align="center">{row[2]}</TableCell>
                      <TableCell className={classes.cells} align="center">{row[3]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}