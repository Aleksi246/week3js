const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password123',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'securepass',
  },
  {
    user_id: 3611,
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@metropolia.fi',
    role: 'user',
    password: 'alicepass',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

const updateUser = (id, user) => {
  const index = userItems.findIndex((item) => item.user_id == id);
  if (index === -1) return null; // user not found

  const {name, username, email, role, password} = user;
  userItems[index] = {
    ...userItems[index],
    name,
    username,
    email,
    role,
    password,
  };
  return userItems[index];
};

const deleteUser = (id) => {
  const index = userItems.findIndex((item) => item.user_id == id);
  if (index === -1) return null;

  const deletedUser = userItems.splice(index, 1)[0];

  return deletedUser;
};

export {listAllUsers, findUserById, addUser, updateUser, deleteUser};
