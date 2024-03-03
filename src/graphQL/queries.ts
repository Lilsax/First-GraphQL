/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

const getHomeData = gql`
    query getTracksHome {
        tracksForHome {
            id
            thumbnail
            numberOfViews
            title
            modules {
            id
            title
            length
            content
            videoUrl
            }
            length
            description
            author {
            id
            name
            photo
            }
            modulesCount
        }
    }
`;

const getCatInfo = gql`
    query getCatInfo($trackId: ID!) {
        track(id: $trackId) {
            title
            id
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
            numberOfViews
            description
            modulesCount
            length
            thumbnail
        }
}`

export { getHomeData, getCatInfo };
