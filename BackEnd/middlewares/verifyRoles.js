const verifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const foundUser = req.user;

            if (!foundUser || !foundUser.roles) {
                return res.sendStatus(401);
            }

            const rolesArray = [...allowedRoles];
            const result = foundUser.roles.some(role => rolesArray.includes(role));

            if (!result) {
                return res.sendStatus(401);
            }

            next();
        } catch (error) {
            console.error("Error in verifyRoles middleware:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

module.exports = verifyRoles;