const getUserDataString = require('./getUserDataString');
const db = require('./db');

jest.spyOn(db, 'getUserById');
jest.mock('./db', () => ({
    getUserById: (id) => ({ id, name: 'Shaun', email: 'shaun@gmail.com', age: 123 }),
}));

test('Returns a properly formatted string for a given user id', async () => {
    const result = await getUserDataString(1);
    expect(db.getUserById).toHaveBeenCalled();
    expect(result).toBe('Shaun - shaun@gmail.com - 123 years old');
});