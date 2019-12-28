import mongoose from 'mongoose';
import { DBProps } from '../dbProps';

const Schema = mongoose.Schema;
const  userSchema = new Schema({
    mobile: { type: String, required: true, unique: true, index: true },
    password: 'string',
    emailId: { type: String, required: true, unique: true, index: true },
    firstName: 'string',
    lastName: 'string',
    userId: { type: String, required: true, unique: true }
}, (new DBProps().transform()));

// tslint:disable-next-line: no-default-export
export default mongoose.model('users', userSchema);
