import jwt from 'jsonwebtoken';
import Engineer from '../models/engineer';
import Employer from '../models/employer';
import ErrorHandler from '../utils/errorHandler';
import asyncError from './asyncError';

// checks if Engineer or employer is authenticated
