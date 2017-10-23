import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import * as wavesUI from 'waves-ui';
import CollisionSegmentBehavior from './CollisionSegmentBehavior';

import uuid from "uuid";

class WavesUITimeline extends Component {

  static defaultProps = {
    identifier: "WavesUITimelineIdentifier"
  };

  static propTypes = {
    // images: PropTypes.array.isRequired,
  };

  timeline = {};
  items = {};
  options = {};

  constructor(props){
    super(props);

    const { identifier, images = [] } = props;
    this.updateWavesUITimeline = this.updateWavesUITimeline.bind(this);
    this.state = {
      identifier: identifier !== undefined ? identifier : uuid.v4(),
      images: images
    };
  }

  componentDidMount() {
    this.updateWavesUITimeline();
  }

  updateWavesUITimeline() {
    let $track = document.getElementById(this.state.identifier);
    var width = $track.getBoundingClientRect().width;
    var height = 200;
    var duration = 20;

    var data = [
      { start: 0, duration: 3, color: 'steelblue' },
      { start: 5, duration: 3, color: 'orange' },
      { start: 14, duration: 3, color: 'green' },
    ];

    var pixelsPerSecond = width / duration;

    var timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);
    var track = new wavesUI.core.Track($track, height);

    var segmentLayer = new wavesUI.core.Layer('collection', data, {
      height: height
    });

    var timeContext = new wavesUI.core.LayerTimeContext(timeline.timeContext);

    segmentLayer.setTimeContext(timeContext);
    segmentLayer.configureShape(wavesUI.shapes.Segment, {
      x: function(d, v) {
        if (v !== undefined) { d.start = v; }
        return d.start;
      },
      width: function(d, v) {
        if (v !== undefined) { d.duration = v; }
        return d.duration;
      }
    });

    var cb = new CollisionSegmentBehavior(data);
    segmentLayer.setBehavior(cb);

    timeline.state = new wavesUI.states.SimpleEditionState(timeline);

    track.add(segmentLayer);
    timeline.add(track);

    timeline.tracks.render();
    timeline.tracks.update();

    //cb.segmentsData = segmentLayer.items;
  }

  render() {
    const { identifier } = this.state;
    const { style } = this.props;
    return React.createElement(
      "div",
      {
        id: identifier,
        style
      }
    );
  };
}

export default WavesUITimeline;

