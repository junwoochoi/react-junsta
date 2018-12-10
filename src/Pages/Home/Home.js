import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid, Box } from 'grommet';
import Header from '../../Components/Header';
import TagContainer from '../../Containers/TagContainer';
import AllContainer from '../../Containers/AllContainer';
import FeedContaier from '../../Containers/FeedContainer';
import UploadContainer from '../../Containers/UploadContainer';

class Home extends Component {
  render() {
    return (
      <>
        <Grid
          fill
          areas={[
            { name: 'header', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [0, 1], end: [0, 1] },
          ]}
          columns={['flex']}
          rows={['5rem', 'flex']}
          gap="small"
        >
          <Box gridArea="header">
            <Header />
          </Box>
          <Box gridArea="main">
            <Switch>
              <Route exact path="/" component={FeedContaier} />
              <Route exact path="/upload" component={UploadContainer} />
              <Route exact path="/all" component={AllContainer} />
              <Route exact path="/tags" component={TagContainer} />
            </Switch>
          </Box>
        </Grid>
      </>
    );
  }
}

export default Home;
