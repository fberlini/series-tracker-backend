export class UserService {
    createUser(email: string, password: string) {
      // In a real app, you'd hash the password and store the user in a database
      return { id: Date.now(), email };
    }
}