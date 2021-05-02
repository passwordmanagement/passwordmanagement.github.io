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
      showSummary: false,

      /* State for currently displayed instruction
        changed when hovering above hacker panel */
      instructionDisplayed: null,

      /* Hacking strategies hardness (the larger the harder)      
        Changed when user click on start in the hacker panel */
      strategyHardness: 0,

      /* Load description for hacking strategy
        Changed when user hover above any of the hacker options */
      descriptionID: 0,

      /* State for allowing all passwords to be revealed
        after all hacker options are tested */
      allowRevealAllPasswords: 1,
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
      {plaintext: "password_123", hardness: 0.5, similarity: 1}, 
      {plaintext: "1234567890", hardness: 0.2, similarity: 0},
      {plaintext: "qwerty", hardness: 0.2, similarity: 0},
    ],
    [
      {plaintext: "MAQdC3vjWdzkHV+1", hardness: 1000, similarity: 1},
      {plaintext: "MAQdC3vjWdzkHV+1", hardness: 1000, similarity: 1},
      {plaintext: "MAQdC3vjWdzkHV+1", hardness: 1000, similarity: 1},
    ],
    [
      {plaintext: "Bouncy_Jim@1998", hardness: 10, similarity: 1}, 
      {plaintext: "Bouncy_Jim98", hardness: 10, similarity: 0.9},
      {plaintext: "bouncyjim420", hardness: 10, similarity: 0.9},
    ],
    [
      {plaintext: "ghah@YIRK_zout8gnic", hardness: 1000, similarity: 1}, 
      {plaintext: "saud0tong@NOOG!cluf", hardness: 1000, similarity: 0},
      {plaintext: "jern6wouf-fow2TWEP", hardness: 1000, similarity: 0},
    ],
  ]

  /* List of descriptions of hacking options */
  descriptions = [
    [
      "Description",
      `Hover above a hacking option for description. Once you have tested all the options,
      you can click "Done!" to take the completion survery.`
    ],[
      "common_passwords.exe",
      `This tool allows you to test common passwords and compare the encrypted 
      versions of these passwords to the ones on the list. Any matches show that 
      the user has used this password. This program takes about an hour to run 
      to completion on your database.`
    ],[
      "previous_passwords.exe",
      `This tool allows you to test passwords that a particular user has used 
      before, if they were also a user on Bank.com, a site with a known data 
      breach. This program takes about ten minutes to run to completion on your 
      database, since half the users on the other two websites also had an 
      account on Bank.com.`
    ],[
      "modified_passwords.exe",
      `This tool allows you to test passwords with added numbers and characters, 
      such as “Password1!”, as well as building on combinations of the previous 
      tools. This program takes a couple days to run to completion on your 
      database, since there are many different ways this can change the test 
      passwords.`
    ],[
      "Reveal all passwords",
      `Not a hacking tool, but use this to reveal all the passwords at the end of
      the activity to see how each person's password making habits differ.`
    ]
  ]

  changeDescription(id) {
    this.setState({descriptionID: id});
  }

  hackingOption(strategy) {
    const hardness = [0, 60000, 20000, 1000];

    if (this.state.allowRevealAllPasswords*strategy%6==0){
      this.setState({strategyHardness: hardness[strategy], 
        allowRevealAllPasswords: this.state.allowRevealAllPasswords*strategy,
        disabledButton: false
      });
    } else {
      this.setState({strategyHardness: hardness[strategy], allowRevealAllPasswords: this.state.allowRevealAllPasswords*strategy});
    }
  }

  handleStart() {
    this.setState({
      start: true,
      startTime: Date.now()
    })
  }

  handleEnd() {
    // Create Qualtrics Query String
    var link = "https://uchicago.co1.qualtrics.com/jfe/form/SV_1QT8ZXQnm6r3HPE?";

    link += "&TimeSpent=" + ((Date.now() - this.state.startTime) / 1000).toString();
    this.setState({
      endTime: Date.now(),
      disabledButton: false,
      queryString: link,
      showSummary: true
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
          As part of a security test, you’ve attained the encrypted password list for all users (for example, “password123” might correspond to a seemingly random mix of letters and numbers). You want to see how many passwords you can crack for a research project. To decrypt the password list, you have a series of tools at your disposal. While each tool has a projected runtime overall, you can see passwords that are cracked along the way as it runs.
          </p>

          {this.state.start ?

            <div>
              <div className={styles.grid, styles.start}>
                {/* All of project goes here */}
                <Grid columns={4} divided>

                  {/* People panels */}
                  <Grid.Row>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={1} className={styles.noShadow}>
                      <Segment vertical padded className={styles.noBorder}></Segment>
                      <Segment vertical padded className={styles.noBorder}></Segment>
                      <Segment vertical padded="very" className={styles.noBorder}>
                        <Header as="h3">Bank.com</Header>
                        </Segment>
                      <Segment vertical padded="very" className={styles.noBorder}>
                      <Header as="h3">School.edu</Header>
                      </Segment>
                      <Segment vertical padded="very" className={styles.noBorder}>
                      <Header as="h3">FB.com</Header>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Tim"} 
                        pwds={this.userPasswords[0]}
                        pic={"/tim.png"}
                        description={"Uses common passwords"} 
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Nim"} 
                        pwds={this.userPasswords[1]}
                        pic={"/nim.png"}
                        description={"Reuses their password"} 
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Jim"} 
                        pwds={this.userPasswords[2]}
                        pic={"/jim.png"}
                        description={"Remembers all their passwords"}
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                      <Person 
                        title={"Kim"} 
                        pwds={this.userPasswords[3]}
                        pic={"/kim.png"}
                        description={"Uses a password manager"}
                        strategyHardness={this.state.strategyHardness}/>
                    </Grid.Column>
                    <Grid.Column width={2} className={styles.noShadow}></Grid.Column>
                  </Grid.Row>

                  {/* Hacker panel */}
                  <Grid.Row>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={3} className={styles.noShadow}>
                    
                    <Header as="h3">Hacking Options</Header>
                      <p>Click on one of the hacking tools on the right to start hacking. 
                      <br/>
                        Each hacking tool is a method real world hackers would use to target a common password behavior.
                        <br/><br/>
                        You must try all three hacking tools before taking the completion survey.</p>
                    </Grid.Column>
                    <Grid.Column width={3} className={styles.hacker}>
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
                      
                      <Segment.Group horizontal>
                        <Segment vertical 
                          className={styles.hackerOption}
                          onMouseOver={()=>this.changeDescription(0)}
                          onClick={()=>this.hackingOption(0)}>
                          Stop or reset hacking progress
                        </Segment>
                        <Segment vertical
                          className={styles.hackerOption}
                          onMouseOver={()=>this.changeDescription(4)}
                          onClick={()=>this.hackingOption(-1)}>
                          Reveal all passwords
                        </Segment>
                      </Segment.Group>
                    
                    </Grid.Column>
                    
                    <Grid.Column width={6}>
                    <div>
                      <Header as='h3'>
                        {this.descriptions[this.state.descriptionID][0]}
                      </Header>
                      <p>{this.descriptions[this.state.descriptionID][1]}</p>
                      <br/><br/><br/><br/>
                    { this.state.showSummary ? 
                      <Container text className={styles.summary}>
                      <Header as='h2'>Summary of activity</Header>
                      <p>
                      In this activity, you saw the differences in password management techniques on a website with a security breach. These techniques had varying degrees of success in memorability, security, and efficiency during the login process.
                        </p>
                        <p>
                        Key Points:
                        <ul>
                          <li>Common passwords are easy to remember and quick to use, but they are easily cracked in the event of a data breach.</li>
                          <li>If a single password is used for multiple accounts, these accounts are at risk if one is compromised.</li>
                          <li>A password manager can provide good security at the cost of efficiency.</li>
                        </ul>
                      </p>
                      <p>
                      <Header as='h3'>Password Tips</Header>
                        <ul>
                          <li>A password manager can help you create and use hard-to-crack passwords.</li>
                          <li>Try not to use any real words--abbreviating a phrase is better.</li>
                          <li>Use special characters, randomly-cased letters, and numbers; these are most commonly placed at the beginning or end, so try putting them in the middle of the password.</li>
                          <li>Use different passwords for different accounts, and try not to make these formulaic (for example, don’t use the site name plus the same number or special character in the same order every time).</li>
                          <li>Avoid using personal information in your passwords.</li>
                        </ul>
                      </p>
                      <br/>
                      {/* Submit button to go to custom Qualtrics survey link for the post-survey */}
                          <a href={this.state.queryString} target="_blank">
                                <Button disabled={this.state.disabledButton} color='orange' floated='right' onClick={this.handleEnd} >
                                  Take Survey!
                                </Button>
                              </a>
                    </Container>
                    :
                    <Button disabled={this.state.disabledButton} color='orange' floated='right' onClick={this.handleEnd} >
                      Done!
                    </Button>
                    }
                    </div>
                   
                    </Grid.Column>
                    <Grid.Column width={1} className={styles.noShadow}>
                    </Grid.Column>

                  </Grid.Row>

                </Grid>
                
                

                {/* All of project goes here */}
              </div>
              <br />

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
