 const express = require('express');
 const router = express.Router();
 const { Registeruser } = require('./register')
 const { Logintoaccount } = require('./login')
 const { AdminApi, DoctorApi, PatientApi, SearchApi } = require('./apis')


 //database
 require('../db/conn')
 const User = require('../model/userschema')



 router.post('/register', Registeruser);
 router.post('/login', Logintoaccount);
 router.get('/adminapi', AdminApi);
 router.get('/doctorapi', DoctorApi);
 router.get('/patientapi', PatientApi);
 router.get('/searchapi', SearchApi);

 module.exports = router;