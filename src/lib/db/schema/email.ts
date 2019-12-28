import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const  emailSchema = new Schema({
    subject: 'string',
    body: 'string',
    to: 'string',
    userId: 'string',
    status: 'string',
    messageId: 'string'
});

// tslint:disable-next-line: no-default-export
export default mongoose.model('email', emailSchema);
