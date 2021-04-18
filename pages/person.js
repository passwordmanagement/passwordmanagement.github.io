import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Checkbox, Progress, Segment } from 'semantic-ui-react'


/* Password component: 
 * To manage the appearance of the passwords 
 * (if we wanted to do any animations for breaking passwords)
 */
class Password extends Component {
    state = { percent: 0 }

    constructor(props) {
        super(props);
    }

    /* plays the progress animation, finishes within {time} ms 
        time by strategy:
            1: 200 seconds 
            2. 50 second
            3: 1 second
        */
    playProgress(time) {
        var progressInterval = setInterval(()=>{
            this.setState({percent: this.state.percent+1})
            if (this.state.percent == 100)
                clearInterval(progressInterval)
        }, time/100)
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevProp.strategy != this.props.strategy){
            if (this.props.strategy == 1){
                this.playProgress(10000)
            }
        }
    }

    render() {
        return (
            <Segment>
                {this.props.plaintext}
                <Progress percent={this.state.percent} indicating>
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
                <Password plaintext={"*****"} account={"bank.com"} 
                    strategy={this.props.strategy}/>
                <Password plaintext={"*****"} account={"academic.edu"} 
                    strategy={this.props.strategy}/>
                <Password plaintext={"*****"} account={"socialmedia.com"} 
                    strategy={this.props.strategy}/>
            </div>
        )

    }
}