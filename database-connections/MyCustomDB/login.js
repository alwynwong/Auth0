function login (email, password, callback) {

    /*
     * Add the following two settings to enable this script
     */
    var lde_config = {
        "url": configuration.lde_base_url + "/api/rest/v2/auth/validate",
        "key": configuration.lde_api_key
    };

    var creds = {
        "email": email,
        "password": password
    };

    request.post({
        url:  lde_config.url,
        headers: {
            "TrainingRocket-Authorization": lde_config.key,
            "Accept": 'application/json;',
            "Content-Type": 'application/json;'
        },
        body: JSON.stringify(creds)
        //for more options check:
        //https://github.com/mikeal/request#requestoptions-callback
    }, function (err, response, body) {

        if (err) return callback(err);
        if (response.statusCode === 401) return callback();
        var resp = JSON.parse(body);
        callback(null, {response: resp});

    });
}