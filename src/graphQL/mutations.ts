/* eslint-disable prettier/prettier */

import { gql } from '@apollo/client';

const increaseTrackView = gql`
mutation IncrementTrackViews($incrementTrackViewsId: ID!) {
  incrementTrackViews(id: $incrementTrackViewsId) {
    track {
      modules {
        id
        title
        length
        content
        videoUrl
      }
      author {
        id
        name
        photo
      }
      id
      title
      length
      numberOfViews
      description
      modulesCount
      thumbnail
    }
    message
    success
    code
  }
}`;

export { increaseTrackView };
