const express = require('express');
const router = express.Router();
const {Simulations} = require('../models/serverSimulation.model');
const {userSimulations} = require('../models/user.model');


/**
 * Create User
 */
 router.post('/user' , async (req , res) => {
    try {
        const serverSimulation = new userSimulations(req.body);
        const result = await serverSimulation.save();
        const id = req.body.userName + Date.now().toString();
        result.userId = id;
        result.save();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send('An error occur');
    }
});


/**
 * Create Chatlogs
 */
router.post('/chatlogs/:user' , async (req , res) => {
    try {
        let userId = req.params.user;
        let result;
        if(userId)
        {
            const serverSimulation = new Simulations(req.body);
            result = await serverSimulation.save();
            result.user = userId;
            result.save();
        }
       res.send(result);
    } catch (error) {
        console.log(error);
        res.send('An error occur');
    }
});

/**
 * Get Message with Pagination
 */
router.get('/chatlogs/:user' , async (req , res) => {
    const { start = 1, limit = 10 } = req.query;

    try {
        const userId = req.params.user;
        const msgs = await Simulations.find({userId : userId})
        .limit(limit)
        .skip(start - 1)
        .exec();

        res.send(msgs);
    } catch (error) {
        console.log(error);
        res.send('An error occur');
    }
});

/**
 * Delete All Chatlogs of given User
 */
router.delete('/chatlogs/:user' , async (req , res) => {
    try {
        const userId = req.params.user.toString();
        let Msg;
        if(userId)
        {
            Msg = await Simulations.find({userId : userId});
            console.log(Msg);
            for(let i = 0; i < Msg.length; i++)
            {
                await Simulations.findByIdAndDelete(Msg[i]._id);
            }
        }
        res.send("Deleted Successfully");
    } catch (error) {
         console.log(error);
         res.send('An error occur');
     }
});


/**
 * Delete Particular chatlogs of given user
 */
router.delete('/chatlogs/:user/:messageId' , async (req , res) => {
    try {
        let userId = req.params.user;
        let msgId = req.params.messageId;
        let Msg;
        if(userId)
        {
            Msg = await Simulations.find({userId : userId});
            for(let i = 0; i < Msg.length; i++)
            {
                let Message = (Msg[i]._id).toHexString();
                if(msgId.toString() == Message.toString())
                {
                    await Simulations.findByIdAndDelete(Msg[i]._id);
                    return res.send("Deleted Successfully");
                }
            }
            res.send("No Msg Found");
        }
    } catch (error) {
        console.log(error);
        res.send('An error occur');
    }
});


module.exports = router;