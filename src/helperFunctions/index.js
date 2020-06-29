import matchData from '../static/Match.json'
import ballData from '../static/Ball_by_Ball.json'

import _ from 'lodash'

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
}, {});

export const DataCalculater = (season) => {
    let matchCount = []
    if(season === 10){
        matchCount = matchData
    } else {
        for (let i = 0; i < matchData.length; i++) {
            if(matchData[i].Season_Id === season){
                matchCount.push(matchData[i])
            }
            if(matchCount.length > 0 && matchData[i].Season_Id !== season){
                break
            }
        }

    }

    let matchId = matchCount.map(row => row.Match_Id)
    
    const groupByMatch = groupBy('Match_Id')
    let allMatches = groupByMatch(ballData)

    if(season < 10){
        let seasonMatches = {}
        matchId.forEach(match => {
            let matchData = _.get(allMatches, match, '')
            if(matchData){
                seasonMatches[match] = matchData
            }
        })
        allMatches = seasonMatches
    }

    let teamwiseBatting = {}
    let batsmanScoreByMatch = {}
    let bowlerWicketsAndDeliveriesByMatch = {}
    let FielderPerformanceByMatch = {}

    matchId.forEach( match => {
      allMatches[match].forEach(row => {
        let runScored = parseInt(_.get(row, 'Batsman_Scored', 0))
        if(isNaN(runScored)){
          runScored = 0
        }
        let extraRun = _.get(row, 'Extra_Runs', 0)
        let teamRun = _.get(teamwiseBatting, row.Team_Batting_Id, '-')
        let strikerPerformance = _.get(batsmanScoreByMatch, row.Striker_Id, '-')
        if(teamRun !== '-'){
          let matchRun = _.get(teamRun, match, '-')
          if(matchRun !== '-'){
            teamwiseBatting[row.Team_Batting_Id][match] = {runs: matchRun.runs + runScored + extraRun, extras: matchRun.extras + extraRun}
          } else {
            teamwiseBatting[row.Team_Batting_Id][match] = {runs: runScored, extras: extraRun}
          }
        } else {
          teamwiseBatting[row.Team_Batting_Id] = {[match]: {runs: runScored, extras: extraRun}}
        }

        if(strikerPerformance !== '-'){
          let strikerPerformanceByMatch = _.get(strikerPerformance, match, '-')
          if(strikerPerformanceByMatch !== '-'){
            if(runScored === 4){
              batsmanScoreByMatch[row.Striker_Id][match] = {...strikerPerformanceByMatch, runs: strikerPerformanceByMatch.runs + runScored, balls: strikerPerformanceByMatch.balls + 1, fours: strikerPerformanceByMatch.fours + 1}
            } else if(runScored === 6){
              batsmanScoreByMatch[row.Striker_Id][match] = {...strikerPerformanceByMatch, runs: strikerPerformanceByMatch.runs + runScored, balls: strikerPerformanceByMatch.balls + 1, sixes: strikerPerformanceByMatch.sixes + 1}
            } else {
              batsmanScoreByMatch[row.Striker_Id][match] = {...strikerPerformanceByMatch, runs: strikerPerformanceByMatch.runs + runScored, balls: strikerPerformanceByMatch.balls + 1}
            }
          } else {
            if(runScored === 4){
              batsmanScoreByMatch[row.Striker_Id][match] = {runs: runScored, balls: 1, fours: 1, sixes: 0}
            } else if(runScored === 6){
              batsmanScoreByMatch[row.Striker_Id][match] = {runs: runScored, balls: 1, fours: 0, sixes: 1}
            } else {
              batsmanScoreByMatch[row.Striker_Id][match] = {runs: runScored, balls: 1, fours: 0, sixes: 0}
            }
          }
        } else {
          if(runScored === 4){
            batsmanScoreByMatch[row.Striker_Id] = {[match]: {runs: runScored, balls: 1, fours: 1, sixes: 0}}
          } else if(runScored === 6){
            batsmanScoreByMatch[row.Striker_Id] = {[match]: {runs: runScored, balls: 1, fours: 0, sixes: 1}}
          } else {
            batsmanScoreByMatch[row.Striker_Id] = {[match]: {runs: runScored, balls: 1, fours: 0, sixes: 0}}
          }
        }
      })
    })
    return ([matchCount, teamwiseBatting, matchId, batsmanScoreByMatch])
}