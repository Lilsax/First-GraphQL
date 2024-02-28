import Reactotron from 'reactotron-react-native';
let reactotron;
if (__DEV__) { // Check if it's development mode
    // Geting device hostname
    Reactotron.configure({
        name: 'bank',
        host: 'localhost',
        port: 9090,
    }) // Initial configuration 
        .useReactNative({
            asyncStorage: false, // there are more options to the async storage.
            networking: {
                // optionally, you can turn it off with false.
                ignoreUrls: /symbolicate/,
            },
            editor: true, // there are more options to editor
            errors: { veto: stackFrame => false }, // or turn it off with false
            overlay: false, // just turning off overlay
        }) // Appling React-Native plugin
        .connect(); // Connect to local client
    console.tron = Reactotron.log;
    // Extend console with tron for being able to debug to Reactotron
}
