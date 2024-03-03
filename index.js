/* eslint-disable prettier/prettier */
/**
 * @format
 */

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const client = new ApolloClient({
    uri: 'https://odyssey-lift-off-server.herokuapp.com/',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            nextFetchPolicy(
                currentFetchPolicy,
                {
                    // Either "after-fetch" or "variables-changed", indicating why the
                    // nextFetchPolicy function was invoked.
                    reason,
                    // The rest of the options (currentFetchPolicy === options.fetchPolicy).
                    options,
                    // The original value of options.fetchPolicy, before nextFetchPolicy was
                    // applied for the first time.
                    initialPolicy,
                    // The ObservableQuery associated with this client.watchQuery call.
                    observable,
                }
            ) {
                // When variables change, the default behavior is to reset
                // options.fetchPolicy to context.initialPolicy. If you omit this logic,
                // your nextFetchPolicy function can override this default behavior to
                // prevent options.fetchPolicy from changing in this case.
                if (reason === 'variables-changed') {
                    return initialPolicy;
                }

                if (
                    currentFetchPolicy === 'network-only' ||
                    currentFetchPolicy === 'cache-and-network'
                ) {
                    // Demote the network policies (except "no-cache") to "cache-first"
                    // after the first request.
                    return 'cache-first';
                }

                // Leave all other fetch policies unchanged.
                return currentFetchPolicy;
            },
        },
    },
});

if (true) {
    import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const Sleman = () => {
    return <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
}

AppRegistry.registerComponent(appName, () => Sleman);
