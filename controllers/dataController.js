const { /*data*/ } = require('../data/data');


exports./*data*/Controller = {
    get/*data*/(req, res) {
        console.log("Get all /*data*/");
        res.json(/*data*/);
    },

    get/*data*/ById(req, res) {
        console.log("Get a /*data*/ by ID");
        const details = /*data*/.find(x => x./*data*/Id==req.params.id);
        res.json(details);
        },

    add/*data*/(req, res) {
        console.log("Add a /*data*/");
        const { body } = req;
        /*data*/.push(body);
        res.json(/*data*/);
    },

    edit/*data*/(req, res) {
        console.log("edit a /*data*/");
        // const { body } = req;
        // /*data*/.push(body);
        res.json(/*data*/);
    },

    delete/*data*/(req, res) {
        console.log("Delete a /*data*/ by ID");
        let index = /*data*/.findIndex(x=> x./*data*/Id == req.params.id);
        /*data*/.splice(index,1);
        res.json(/*data*/);
    }
}

