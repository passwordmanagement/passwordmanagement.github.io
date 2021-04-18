import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Grid, Container, Segment } from 'semantic-ui-react'
import Person from './person'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      startTime: 0,
      endTime: 0,
      disabledButton: true,

      /* State for currently displayed instruction
        changed when hovering above hacker panel */
      instructionDisplayed: null,

      /* Hacking strategies:

        0 for original state
        1 for service brute force
        2 for password cracking
        3 for social engineering
      
        Changed when user click on start in the hacker panel */
      strategy: 0,
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.hackingStart1 = this.hackingStart1.bind(this);
    // this.handleChange = this.handleChange.bind(this);  // checkboxes
  }

  handleStart() {
    this.setState({
      start: true,
      startTime: Date.now()
    })
  }

  handleEnd() {
    // Create Qualtrics Query String
    // What does this do?
    var link = "https://uchicago.co1.qualtrics.com/jfe/form/SV_dgV556kBNVvZVmC?";

    link += "&TimeSpent=" + ((Date.now() - this.state.startTime) / 1000).toString();
    this.setState({
      endTime: Date.now(),
      disabledButton: false,
      donationText: "Thank you!",
      queryString: link
    })
  }

  hackingStart1() {
    this.setState({strategy: 1,});
  }


  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Usable Security Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Password Manager Project
          </h1>

          <p className={styles.description}>
            Description of  project here
          </p>

          {this.state.start ?

            <div>
              <div className={styles.grid, styles.start}>
                {/* All of project goes here */}
                <Grid columns={4} divided>

                  {/* People panels */}
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Segment vertical>Bank.com</Segment>
                      <Segment vertical>Academic.edu</Segment>
                      <Segment vertical>socialmedia.com</Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <Person 
                        title={"Person 1"} 
                        description={"Remembers all their passwords"} 
                        strategy={this.state.strategy}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Person 
                        title={"Person 2"} 
                        description={"Uses common passwords"} 
                        strategy={this.state.strategy}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Person 
                        title={"Person 3"} 
                        description={"Uses a password manager for passwords"}
                        strategy={this.state.strategy}/>
                    </Grid.Column>
                  </Grid.Row>

                  {/* Hacker panel */}
                  <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={5} className={styles.hacker}>
                      <Segment vertical>Brute force through service website 
                        <Button className={"ui button"} onClick={this.hackingStart1}>Start</Button> 
                      </Segment>
                      <Segment vertical>Crack password obtained from leaked encrypted database 
                        <Button className={"ui button"}>Start</Button>
                      </Segment>
                      <Segment vertical>Deploy phishing website and emails 
                        <Button className={"ui button"}>Start</Button>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column width={7}>
                      <p className={styles.description}>
                        Description of instructions
                      </p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>

                {/* All of project goes here */}
              </div>
              <br />

              {/* Submit button to go to custom Qualtrics survey link for the post-survey */}
              <a href={this.state.queryString} target="_blank">
                <Button disabled={this.state.disabledButton} color='orange' floated='right' onClick={this.handleEnd} >
                  Take Survey!
                </Button>
              </a>

            </div>

            :

            <Button inverted color='green' onClick={this.handleStart} size='big'>
              Let's Start
          </Button>}

        </main>

        <footer className={styles.footer}>
          <p>
            This website was created for a class. Thank you!
          </p>
        </footer>
      </div>
    )
  }

}


export default function Home() {
  return (
    <Main />
  )
}
