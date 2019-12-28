import mongoose from 'mongoose';
import { DBProps } from '../dbProps';

const Schema = mongoose.Schema;
const  reportSchema = new Schema({
    userId: 'string',
    date: 'string',
    name: 'string',
    owner: 'string',
    type: 'string',
    project: 'string',
    createdOn:  'string',
    status: 'string'
}, (new DBProps().transform()));
// tslint:disable-next-line: no-default-export
export default mongoose.model('reports', reportSchema);
