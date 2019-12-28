import mongoose, { Document } from 'mongoose';

import UserSchema from '../db/schema/users';
import SessionSchema from '../db/schema/session';
import ReportSchema from '../db/schema/report';
import EmailSchema from '../db/schema/email';

class DBConn {
    public async getConnection() {
        return mongoose.connect('mongodb://localhost/MyAppNewDB', { useNewUrlParser: true });
    }

    public transformJSON() {
        return {
            toJSON: {
                transform: (_doc, ret: Document) => {
                    ret.id = ret._id;
                    delete ret.userId;
                    delete ret._id;
                    delete ret.__v;
                }
            }
        };
    }
}

export { DBConn, mongoose, UserSchema, SessionSchema, ReportSchema, EmailSchema };
