import { Document } from 'mongoose';
export class DBProps {
    transform() {
        return { toJSON: {
            transform: (_doc, ret: Document) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.userId;
            }
          }
        };
    }
}
