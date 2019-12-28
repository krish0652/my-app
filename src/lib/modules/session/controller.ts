import { SessionDB } from './db';
import { SessionModel } from './model';

export class SessionController {
    public async validateSession(authKey: string): Promise<SessionModel> {
        return (new SessionDB()).validateSession(authKey);
    }
}
