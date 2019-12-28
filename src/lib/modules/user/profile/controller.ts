import { ProfileDB } from './db';
import { UserModel } from '../userModel';

export class ProfileController {
    private profileDb = new ProfileDB();

    public async getUserDetails(userId: string): Promise<UserModel> {
        return this.profileDb.getUserDetails(userId);
    }

    public async updateUser(userData: UserModel): Promise<UserModel> {
        return this.profileDb.updateUser(userData);
    }

    public async updatePwd(userData: UserModel): Promise<UserModel> {
        return this.profileDb.updatePwd(userData);
    }

}
