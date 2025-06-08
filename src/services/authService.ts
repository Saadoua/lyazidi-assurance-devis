
export interface User {
  email: string;
  nom: string;
  hashedPassword: string;
}

export interface RegisterData {
  nom: string;
  email: string;
  password: string;
}

class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  // Simple hash function (in real app, use bcrypt or similar)
  private hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(data: RegisterData): boolean {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.find(user => user.email === data.email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      email: data.email,
      nom: data.nom,
      hashedPassword: this.hashPassword(data.password)
    };

    users.push(newUser);
    this.saveUsers(users);

    // Automatically log in the user
    this.setCurrentUser(newUser);
    
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const hashedPassword = this.hashPassword(password);
    
    const user = users.find(u => u.email === email && u.hashedPassword === hashedPassword);
    
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  private setCurrentUser(user: User): void {
    const userToStore = {
      email: user.email,
      nom: user.nom
    };
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userToStore));
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = new AuthService();
