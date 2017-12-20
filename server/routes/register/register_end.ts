import * as http from 'http'; 
import { Router, Response } from 'express';
import * as Users  from '../../models/user';

const nodemailer = require('nodemailer');

import { G_USER, G_PASS } from '../../config';
import { CLIENT_ID } from '../../config';
import { CLIENT_SEC } from '../../config';
import { REFRESH_TOKEN } from '../../config';

import { REGI_SUB } from '../../config';
// import { REGI_HTML } from '../config';
const registerRouter_end: Router = Router();

registerRouter_end.post('/' , (req, res, next)  => {
    
});

export { registerRouter_end };