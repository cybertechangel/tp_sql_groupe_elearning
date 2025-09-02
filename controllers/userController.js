import { getAllUsers, getUserById, createUser, deleteUser} from '../models/User.js';
  

export async function listUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('listUsers', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function getUser(req, res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('getUser', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  

export async function addUser(req, res) {
    try {
        const { name, email } = req.body;
        if (!name || !email)
            return res.status(400).json({ error: 'name et email sont requis' });
  
        const user = await createUser({ name, email });
        res.status(201).json(user);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Cet email existe déjà' });
      }
        console.error('addUser', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  
export async function removeUser(req, res) {
    try {
        const ok = await deleteUser(req.params.id);
        if (!ok) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error('removeUser', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
  