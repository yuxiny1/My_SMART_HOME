module.exports = function (app) {
    // the route of R1A. the begin of the router , starting at home page
    app.get('/', function (req, res) {
        // the route of R1B, will show links oto toher pages contains links
        res.render('home.html');
    });

    // R2A: display about page to introduce myself a little bit
    app.get('/about', function (req, res) {
        res.render('about.html');
    });


    // extra who wants to access those devices
    app.get('/register', function (req, res) {
        res.render('register.html');
    });
    app.post('/registered', function (req, res) {
        res.render(
            'middle.ejs',
            (message = {
                title: `${req.body.first} is now registered`,
                body: `Now ${req.body.last} you could access to all devices,`,
            })
        );
    });

    // the route of R3A. add devices to the home, you could choose from a list
    app.get('/addPage', function (req, res) {
        dbRun('SELECT name, fields FROM devices;').then((value) =>
            res.render('add.ejs', (devices = value))
        );
    });

    // the route of R3B and R3C ,select one device , and iterate the database and choose one. you could choose the one you feel like to turn on and insert them into the database post method to change the databse, insert one new device into a new table. return proper message accoring to your choise.
    app.post('/add', function (req, res) {
        const { deviceName, ...fields } = req.body;
        dbRun('INSERT INTO devicesAdded SET ?;', {
            name: deviceName,
            fields: JSON.stringify(fields),
        }).then((value) =>
            res.render(
                'middle.ejs',
                (message = {
                    title: `${deviceName} is turn on, enjoy your time `,
                    body: `A new ${deviceName} is turned on for you!`,
                })
            )
        );
    });

    // this route works for R4A: show status of all devices
    app.get('/devices', function (req, res) {
        dbRun('SELECT name, fields FROM devices;').then((value) =>
            res.render('show.ejs', {
                devices: value,
                selectedDevice: undefined,
            })
        );
    });

    // this is the route for R4B. the device name will be shown once chosen othewise tell the user that tge device is not added
    app.get('/showDashboard', function (req, res) {
        const deviceName = req.query.deviceName;
        // Select all devices given a certain device name
        dbRun('SELECT id, name, fields FROM devicesAdded WHERE ?', {
            name: deviceName,
        })
            .then((value) => {
                // If nothing is found returns a message
                if (value.length == 0) {
                    return Promise.reject(0);
                } else {
                    // Otherwise, returns the results
                    res.render('show.ejs', {
                        devices: [value[0]],
                        selectedDevice: value,
                    });
                }
            })
            .catch((error) =>
                res.render(
                    'middle.ejs',
                    (message = {
                        title: `${deviceName} the device is not turned on`,
                        body: ` ${deviceName} is not turned on`,
                    })
                )
            );
    });

    // this is the route for  R6A , delete the device page and return to the middle layer for other actions
    // If a device is successfully deleted, this route returns a page with successful message.
    app.get('/deletePage', function (req, res) {
        res.render('delete.html');
    });

    // this route is for R6B. it is a post method and it will ask questions for deleting the device, and handles the deletion. it will ask a confironmation from users.

    app.post('/delete', function (req, res) {
        const deviceId = req.body.deviceId;
        // Delete the observation for given device id
        dbRun('DELETE FROM devicesAdded WHERE ?;', { id: deviceId })
            .then((value) => {
                // If nothing is deleted send a message to tell the user the specified device id is not found
                if (value.affectedRows === 0) {
                    return Promise.reject(0);
                }
                // Otherwise, tell the user the specified device id has been deleted
                res.send(
                    res.render(
                        'middle.ejs',
                        (message = {
                            title: `${deviceId} is deleted`,
                            body: `The device with device id ${deviceId} has been deleted`,
                        })
                    )
                );
            })
            // this route will return message if failed to find the device according to the device id
            //If nothing is deleted, this route returns a page with nothing deleted message.
            .catch((value) =>
                res.render(
                    'middle.ejs',
                    (message = {
                        title: `${deviceId} is not found`,
                        body: `No device with device id ${deviceId} is turned on `,
                    })
                )
            );
    });

    //the route for R5A. firstly, display a list of added devices and you could click on it.
    app.get('/updatePage', async function (req, res) {
        const devices = await dbRun('SELECT name, fields FROM devices;');
        const addedDevices = await dbRun('SELECT id, name FROM devicesAdded;');

        res.render('update.ejs', { devices, addedDevices });
    });

    // the route of R5B. updating the selected device by turn it off or turn on
    // returning the successful message if this device is turned on or the fail message
    app.post('/update', function (req, res) {
        const { deviceId, ...fields } = req.body;

        // Update the fields for given device id and fields
        dbRun('UPDATE devicesAdded SET fields = ? WHERE id = ?;', [
            JSON.stringify(fields),
            Number(deviceId),
        ])
            .then((value) => {
                // If nothing is updated send a message to tell the user the specified device id is not found
                if (value.affectedRows === 0) {
                    return Promise.reject(0);
                }
                // Otherwise, tell the user the specified device id has been updated
                res.send(
                    res.render(
                        'middle.ejs',
                        (message = {
                            title: `${deviceId} is updated`,
                            body: ` you successfully update the device with device id ${deviceId} `,
                        })
                    )
                );
            })
            .catch((value) =>
                res.render(
                    'middle.ejs',
                    (message = {
                        title: `${deviceId} is not found`,
                        body: `No device with device id ${deviceId} has been inserted before`,
                    })
                )
            );
    });
};
