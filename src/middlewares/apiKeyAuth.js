const apiKeyAuth = (req, res, next) =>{
    const apiKey = req.headers['auth-api-key'];
    if (!apiKey) {
        return res.status(401).json({ message: 'API key is missing' });
    }
    if (!apiKey || apiKey !== process.env.AUTH_API_KEY) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
}

module.exports = apiKeyAuth;