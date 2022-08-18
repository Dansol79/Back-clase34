import bcrypt from 'bcrypt';

const validPassword = async (password, serPassword) => {
    return await bcrypt.compare(password, serPassword);
}

export default validPassword;