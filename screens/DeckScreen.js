import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
  renderCard(job) {
    return (
      <Card title={job.jobTitle}>

      </Card>
    );
  }

  render() {
    return (
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs.results }
}

export default connect(mapStateToProps)(DeckScreen);
