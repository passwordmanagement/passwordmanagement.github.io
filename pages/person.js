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
        progressIntervalID: 0,
    }

    constructor(props) {
        super(props);

    }

    /* plays the progress animation, time varies by hardness
        total time needed to complete progress bar is 
                strategyHardness * pwdHardness * rand
        pwdHardness is pre-defined in index.js
        rand is used to simulate the random process of cracking
    */
    playProgress(strategyHardness, pwdHardness) {
        var rand = 0.7 + Math.random()*0.6;
        var time = strategyHardness * pwdHardness * rand;
        console.log(time);
        // if time is too large, we might simply not progress
        if (time > 500000) {
            return;
        } else {
            var progressInterval = setInterval(()=>{
                this.setState({percent: this.state.percent+1})
                if (this.state.percent == 100){
                    clearInterval(progressInterval)
                    this.setState({
                        running: false,
                        progressIntervalID: 0,
                    });
                }
            }, time/100)
            this.setState({
                running: true,
                progressIntervalID: progressInterval,
            });
        }
    }

    resetProgress() {
        if (this.state.progressIntervalID != 0)
            clearInterval(this.state.progressIntervalID);
        this.setState({
            percent: 0,
            running: false,
            progressIntervalID: 0,
        })
    }

    /* when the hack panel is clicked, get the chosen strategy and 
        play animation. */
    componentDidUpdate(prevProp) {
        if (prevProp.strategy != this.props.strategy){
            switch (this.props.strategy) {
                case 0:
                    this.resetProgress();
                    break;
                case 1:
                    this.playProgress(50000, this.props.pwd.hardness);
                    break;
                case 2:
                    this.playProgress(4000, this.props.pwd.hardness);
                    break;
                case 3:
                    this.playProgress(1000, this.props.pwd.hardness);
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <Segment>
                {this.props.pwd.plaintext}
                <Progress 
                    percent={this.state.percent} 
                    indicating={this.state.running}
                    autoSuccess>
                {this.props.account}
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
                    strategy={this.props.strategy}/>
                <Password pwd={this.props.pwds[1]} account={"academic.edu"} 
                    strategy={this.props.strategy}/>
                <Password pwd={this.props.pwds[2]} account={"socialmedia.com"} 
                    strategy={this.props.strategy}/>
            </div>
        )

    }
}