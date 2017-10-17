function getByEmail(email, callback) {

    // This is from BitBucket Cloud testing again

    // This script should retrieve a user profile from your existing database,
    // without authenticating the user.
    // It is used to check if a user exists before executing flows that do not
    // require authentication (signup and password reset).
    //
    // There are three ways this script can finish:
    // 1. A user was successfully found. The profile should be in the following
    // format: https://auth0.com/docs/user-profile/normalized.
    //     callback(null, profile);
    // 2. A user was not found
    //     callback(null);
    // 3. Something went wrong while trying to reach your database:
    //     callback(new Error("my error message"));

    var lde_config = {
        "url": configuration.lde_base_url + "/api/rest/v2/manage/contact/search",
        "key": configuration.lde_api_key
    };

    var creds = {
        "email": [email],
    };

    request.post({
        url: lde_config.url,
        headers: {
            "TrainingRocket-Authorization": lde_config.key,
            "Accept": 'application/json;',
            "Content-Type": 'application/json;'
        },
        body: JSON.stringify(creds)
        //for more options check:
        //https://github.com/mikeal/request#requestoptions-callback
    }, function (err, response, body) {

        if (err)
            callback(new Error(err));

        if (response.statusCode === 401)
            callback(new Error("401 error"));

        var profile = JSON.parse(body);

        if (profile.size == 1) {
            callback(null, profile.results[0]);
        } else if (profile.size > 1) {
            // technically this is not possible
            callback(new Error("Duplicated email address found"));
        } else {
            callback(null); // A user was not found
        }
    });
}
