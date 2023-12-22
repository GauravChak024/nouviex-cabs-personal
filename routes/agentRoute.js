const express = require('express')
const user = express();
const bodyParser = require('body-parser');

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended:true }));

const multer = require('multer');
const path = require('path');

user.use(express.static('public'));


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,path.join(__dirname,'../uploadedFiles'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});

const upload = multer({
    storage:storage,
}).fields([
    { name: 'aadharCard', maxCount: 1 }, 
    { name: 'rcBook', maxCount: 1 },
    { name: 'carImageFront', maxCount: 1 },
    { name: 'carImageBack', maxCount: 1 },
    { name: 'carImageLeft', maxCount: 1 },
    { name: 'carImageRight', maxCount: 1 },
    { name: 'characterCertificate', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 },
]);

const router = express.Router()
const { register, login, getAgentById, getAllAgents} = require('../controllers/agentAuth')
router.post('/register',upload, register)
router.post('/login',upload, login)
router.get('/user/:id', getAgentById)
router.get('/allUsers', getAllAgents)

module.exports = router