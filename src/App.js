import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { connect } from "react-redux"

import Home from "./pages/index.js"
import About from "./pages/about.js"
import Login from "./pages/login/container"

class App extends React.Component {
  componentDidMount() {
    // this.props.setUsername("Alex Preiss")
  }

  render() {
    return (
      <Router>
        <div>Welcome {this.props.state.username}</div>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  state: state.auth,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  {}
)(App)
