const Widget = require('../models/widgets');
const { infologger, errorlogger } = require("../logs/logs");
exports.widgetController = {
    getwidget(req, res) {
        infologger.info(`Get widget number:${req.params.id}`);
        Widget.findOne({ widget_id: req.params.id })
            .then((widget) => {

                if (widget) {
                    infologger.info(`Success to Get information about widget number`);
                    res.json(widget)
                }
                else {
                    errorlogger.error("Wrong widget id please enter correct id");
                    res.status(400).json({ "message": "Wrong widget id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting widget from db:${err}`);
            });
    },

    getwidgets(req, res) {
        infologger.info("Get all widgets");
        Widget.find({})
            .then(widgets => {
                infologger.info("Success to Get all widgets");
                res.json(widgets)
            })
            .catch(err => {

                errorlogger.error(`Error getting the data from db:${err}`)
                res.json({ "message": `Error Gets widgets ` });

            });
    },
    addwidget(req, res) {
        infologger.info("Add a Widget");
            const newWidget = new Widget(req.body);
            newWidget.save()
            .then(result => {
                infologger.info(`Adding Widget:${req.body.widget_id} is successfully`);
                res.json(result);
            })
            .catch(err => {
                errorlogger.error(`Error Adding Widget `);
                res.status(400).json({ "message": `Error Adding Widget ` });
            });
        
     

    },

    editwidget(req, res) {
        infologger.info("Updating a Widget");
        Widget.updateOne({ widget_id: req.params.id }, req.body)
            .then((result) => {
                if (result.matchedCount > 0) {
                    infologger.info(`Updating Widget no:${req.params.id} is successfully`);
                    res.json({ "message": `Updating Widget no:${req.params.id} is successfully` });
                }
                else {
                    errorlogger.error("Wrong Widget id please enter correct id");
                    res.status(400).json({ "message": "Wrong Widget id please enter correct id" });
                }
            })
            .catch((err) => res.status(400).json({ "message": "Wrong Widget id please enter correct id" }));
        
    },

    deletewidget(req, res) {
        infologger.info("Delete a widget");
        Widget.deleteOne({ widget_id: req.params.id })
            .then((result) => {
                if (result.deletedCount > 0) {
                    infologger.info(`Deleting widget  is successfully`);
                    res.json({ "message": `Deleting widget  is successfully` });
                }
                else {
                    errorlogger.error(`widget no:${req.params.id} does not exists`);
                    res.status(400).json({ "message": `widget no:${req.params.id} does not exists` });
                }

            })
            .catch(() => {
                errorlogger.error(`Error Deleting widget no:${req.params.id} `);
                res.status(400).json({ "message": `Error Deleting widget no:${req.params.id} ` });
            });
    }


}

