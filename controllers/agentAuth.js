const agentUser = require('../models/agentUser')

const getAgentById = async (req, res) => {
  try {
    const user = await agentUser.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getAllAgents = async (req, res) => {
  try {
    const users = await agentUser.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const register = async (req, res) => {
  try {
    const aadharCard = req.files['aadharCard'][0].filename;
    const rcBook = req.files['rcBook'][0].filename;
    const carImageFront = req.files['carImageFront'][0].filename;
    const carImageBack = req.files['carImageBack'][0].filename;
    const carImageLeft = req.files['carImageLeft'][0].filename;
    const carImageRight = req.files['carImageRight'][0].filename;
    const characterCertificate = req.files['characterCertificate'][0].filename;
    const bankPassbook = req.files['bankPassbook'][0].filename;

    const user = await agentUser.create({
      ...req.body,
      aadharCard,
      rcBook,
      carImageFront,
      carImageBack,
      carImageLeft,
      carImageRight,
      characterCertificate,
      bankPassbook,
    });

    const token = user.createJWT();
    res.json({ user: { name: user.username }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw console.error('Please provide email and password')
  }
  const user = await agentUser.findOne({ email })
  if (!user) {
    console.log("not found");
    throw console.error('Invalid Credentials'); 
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw console.error('Invalid Credentials'); 
  }
  const token = user.createJWT()
  // res.json({ user: { name: user.username }, token })
  res.json({ user , token })
}

module.exports = {
  getAgentById,
  getAllAgents,
  register,
  login,
}
