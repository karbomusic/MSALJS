async function run() {
    console.log("Running MSAL code...");

    const msal1Confit = {
        auth: {
            clientId: 'd98c4313-fd05-437b-98ee-edf7fbe40366',
            authority: 'https://login.microsoftonline.com/organizations',
            redirectUri: 'http://localhost:8080'
        }
    }

    const msal2Config = {
        auth: {
            clientId: "d98c4313-fd05-437b-98ee-edf7fbe40366",
            authority: "https://login.microsoftonline.com/organizations",
            knownAuthorities: [],
            redirectUri: "http://localhost:8080",
            postLogoutRedirectUri: "http://localhost:8080",
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: "sessionStorage",
            storeAuthStateInCookie: false,
        },
        system: {
            windowHashTimeout: 60000,
            iframeHashTimeout: 6000,
            loadFrameTimeout: 0,
        },
    };

    // MSAL 1.x
    // var client = new msal.UserAgentApplication(msal2Config);
    // var options = {
    //     scopes: ['user.read']
    // }

    // let loginResponse = await client.loginPopup(options);
    // console.dir(loginResponse);


    // MSAL 2.0
    const client = new msal.PublicClientApplication(msal2Config);
    var options = {
        scopes: ['user.read']
    }


    client.loginResponse = await client.loginPopup(options);
    console.dir(client.loginResponse);

    // Handle the redirect flows - without this the popup will redirect to itself for msal 2.0

    msalInsance.handleRedirectPromise();
    msalInstance
        .handleRedirectPromise()
        .then((tokenResponse) => {
            // Handle redirect response
            console.dir(tokenResponse);
            return;
            
        })
        .catch((error) => {
            console.error(error);
        });
}