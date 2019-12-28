import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const  userSchema = new Schema({ userId: 'string', authKey: 'string', lastAccessTime: 'string', isActive: 'number' });

// tslint:disable-next-line: no-default-export
export default mongoose.model('sessions', userSchema);
