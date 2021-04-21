import Head from 'next/head'
import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { Button, Grid, Container, Segment, Header, SegmentGroup } from 'semantic-ui-react'
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

      /* Hacking strategies hardness (the larger the harder)      
        Changed when user click on start in the hacker panel */
      strategyHardness: 0,

      /* Load description for hacking strategy
        Changed when user hover above any of the hacker options */
      descriptionID: 0,
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);

    this.hackingOption = this.hackingOption.bind(this); 
    this.changeDescription = this.changeDescription.bind(this);
  }

  /* A list of user, their password and the passwords hardness (used later 
    in password cracking progress bar */
  userPasswords = [
    [
      {plaintext: "password_123", hardness: 5}, 
      {plaintext: "1234567890", hardness: 1},
      {plaintext: "qwerty", hardness: 1},
    ],
    [
      {plaintext: "Bouncy_Jim@1998", hardness: 10}, 
      {plaintext: "Bouncy_Jim98", hardness: 10},
      {plaintext: "bouncyjim420", hardness: 10},
    ],
    [
      {plaintext: "ghah@YIRK_zout8gnic", hardness: 1000}, 
      {plaintext: "saud0tong@NOOG!cluf", hardness: 1000},
      {plaintext: "jern6wouf-fow2TWEP", hardness: 1000},
    ],
  ]

  /* List of descriptions of hacking options */
  descriptions = [
    [
      "Description",
      `Hover above a hacking option for description`
    ],[
      "common_passwords.exe",
      `This tool allows you to test common passwords and compare the encrypted 
      versions of these passwords to the ones on the list. Any matches show that 
      the user has used this password. This program takes about an hour to run 
      to completion on your database.`
    ],[
      "previous_passwords.exe",
      `This tool allows you to test passwords that a particular user has used 
      before, if they were also a user on <website2>, a site with a known data 
      breach. This program takes about ten minutes to run to completion on your 
      database, since half the users on <website> also had an account on 
      <website2>.`
    ],[
      "modified_passwords.exe",
      `This tool allows you to test passwords with added numbers and characters, 
      such as “Password1!”, as well as building on combinations of the previous 
      tools. This program takes a couple days to run to completion on your 
      database, since there are many different ways this can change the test 
      passwords.`
    ]
  ]

  changeDescription(id) {
    this.setState({descriptionID: id});
  }

  hackingOption(strategy) {
    const hardness = [0, 50000, 10000, 4000];
    this.setState({strategyHardness: hardness[strategy]});
  }

  handleStart() {
    this.setState({
      start: true,
      startTime: Date.now()
    })
  }

  handleEnd() {
    // Create Qualtrics Query String
    var link = "https://uchicago.co1.qualtrics.com/jfe/form/SV_dgV556kBNVvZVmC?";

    link += "&TimeSpent=" + ((Date.now() - this.state.startTime) / 1000).toString();
    this.setState({
      endTime: Date.now(),
      disabledButton: false,
      donationText: "Thank you!",
      queryString: link
    })
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
          In this activity, you will be following four users with different password setups as they create new accounts on a website. One of the users has a password manager, which is a tool that generates random passwords and stores them encrypted behind a master password. The other users each have their own password and a different method for managing them across accounts. You will be able to observe the differences between their setup process, as well as simulate a password-cracking attempt against each of the users.
          </p>

          {this.state.start ?

            <div>
              <div className={styles.grid, styles.start}>
                {/* All of project goes here */}
                <Grid columns={4} divided>

                  {/* People panels */}
                  <Grid.Row>
                    <Grid.Column width={2}>
                      {/* <Segment vertical>Bank.com</Segment>
                      <Segment vertical>Academic.edu</Segment>
                      <Segment vertical>socialmedia.com</Segment> */}
                    </Grid.Column>

                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Tim"} 
                        pwds={this.userPasswords[0]}
                        description={"Uses common passwords"} 
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Nim"} 
                        pwds={this.userPasswords[1]}
                        description={"Reuses their password"} 
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Jim"} 
                        pwds={this.userPasswords[2]}
                        description={"Remembers all their passwords"}
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Kim"} 
                        pwds={this.userPasswords[2]}
                        description={"Uses a password manager"}
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                  </Grid.Row>

                  {/* Hacker panel */}
                  <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={5} className={styles.hacker}>
                      <Segment vertical 
                        className={styles.hackerOption}
                        onMouseOver={()=>this.changeDescription(1)}
                        onClick={()=>this.hackingOption(1)}>
                        Run<strong><tt> common_passwords.exe</tt></strong>
                      </Segment>
                      <Segment vertical 
                        className={styles.hackerOption}
                        onMouseOver={()=>this.changeDescription(2)}
                        onClick={()=>this.hackingOption(2)}>
                        Run<strong><tt> previous_passwords.exe</tt></strong>
                      </Segment>
                      <Segment vertical 
                        className={styles.hackerOption}
                        onMouseOver={()=>this.changeDescription(3)}
                        onClick={()=>this.hackingOption(3)}>
                        Run<strong><tt> modified_passwords.exe</tt></strong>
                      </Segment>
                      <Segment vertical 
                        className={styles.hackerOption}
                        onMouseOver={()=>this.changeDescription(0)}
                        onClick={()=>this.hackingOption(0)}>
                        Stop or reset hacking progress
                      </Segment>
                    
                    </Grid.Column>

                    <Grid.Column width={7}>
                    <Container text>
                      <Header as='h2'>
                        {this.descriptions[this.state.descriptionID][0]}
                      </Header>
                      <p>{this.descriptions[this.state.descriptionID][1]}</p>
                    </Container>
                    </Grid.Column>
                    <Grid.Column width={2} className={styles.noShadow}>
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
