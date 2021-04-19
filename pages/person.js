import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Checkbox, Progress, Segment } from 'semantic-ui-react'


/* Password component: 
 * To manage the appearance of the passwords 
 * (if we wanted to do any animations for breaking passwords)
 */
class Password extends Component {
    state = { 
        percent: 0 ,
        running: false,
        pwdtext: "********",
        progressIntervalID: 0,
        randPwdIntervalID: 0,
        timeNeeded: "Unknown",
    }

    constructor(props) {
        super(props);
    }

    /* Set the "Time Needed" text under progress bar */
    setTimeNeeded(time){
        if (time < 10000)
            this.setState({timeNeeded: "under a minute"})
        else if (time < 100000)
            this.setState({timeNeeded: "a few minutes"})
        else if (time < 500000)
            this.setState({timeNeeded: "some hours"})
        else 
            this.setState({timeNeeded: "impossible to crack"})
    }



    /* Play the progress bar animation, which takes {time} ms to complete */
    animateProgress(time){
        var progressInterval = setInterval(()=>{
            this.setState({
                percent: this.state.percent+1,
            })
            // when hacking is done, stop the interval callback
            if (this.state.percent == 100){
                clearInterval(progressInterval)
                this.setState({
                    running: false,
                    progressIntervalID: 0,
                });
            }
        }, time/100);
        return progressInterval;
    }



    /* Generates a random string every 0.2s and put it above the progress bar */
    animatePwdText(){
        var randPwdInterval = setInterval(()=>{
            this.setState({
                pwdtext: Math.random().toString(36).substring(2),
            })
            // when hacking is done, stop the interval callback
            if (this.state.percent == 100){
                clearInterval(randPwdInterval)
                this.setState({
                    randPwdIntervalID: 0,
                    pwdtext: this.props.pwd.plaintext
                });
            }
        }, 100);
        return randPwdInterval;
    }



    /* plays the progress animation, time varies by hardness.
        Total time needed (in ms) to complete progress bar is 
                strategyHardness * pwdHardness * rand
        pwdHardness is pre-defined in index.js
        rand is used to simulate the random process of hacking
    */
    animateHacking(strategyHardness, pwdHardness) {
        var rand = 0.7 + Math.random()*0.6;
        var time = strategyHardness * pwdHardness * rand;

        this.setTimeNeeded(time);

        // if time is too large, we can just refuse to hack (?)
        if (time > 500000) {
            return;
        } else {
            this.setState({
                running: true,
                progressIntervalID: this.animateProgress(time),
                randPwdIntervalID: this.animatePwdText(),
            });
        }
    }



    /* Cancel all interval callback, reset pwdtext and progress bar */
    resetProgress() {
        if (this.state.progressIntervalID != 0)
            clearInterval(this.state.progressIntervalID);
            clearInterval(this.state.randPwdIntervalID);
        this.setState({
            percent: 0,
            running: false,
            pwdtext: "********",
            progressIntervalID: 0,
            randPwdIntervalID: 0,
        })
    }

    /* when the hack panel is clicked, get the chosen strategy and 
        play animation. */
    componentDidUpdate(prevProp) {
        if (prevProp.strategyHardness != this.props.strategyHardness){
            if (this.props.strategyHardness != 0){
                this.animateHacking(
                    this.props.strategyHardness, 
                    this.props.pwd.hardness);
            } else {
                this.resetProgress();
            }
        }
    }

    render() {
        return (
            <Segment>
                {this.state.pwdtext}
                <Progress 
                    percent={this.state.percent} 
                    indicating={this.state.running}
                    autoSuccess>
                Time Needed: {this.state.timeNeeded}
                </Progress>
            </Segment>
                
        )
    }
}

export default class Person extends Component {
    constructor(props) {
        super(props);

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        this.props.onChange(this.props.qId, !this.props.checked);
    }

    render() {
        return (
            <div className={styles.card}>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <br />
                <Password pwd={this.props.pwds[0]} account={"bank.com"} 
                    strategyHardness={this.props.strategyHardness}/>
                <Password pwd={this.props.pwds[1]} account={"academic.edu"} 
                    strategyHardness={this.props.strategyHardness}/>
                <Password pwd={this.props.pwds[2]} account={"socialmedia.com"} 
                    strategyHardness={this.props.strategyHardness}/>
            </div>
        )

    }
}