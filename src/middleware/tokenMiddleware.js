import db from "../database/database.js"

export async function tokenValidation(req, res, next) {

    try{
        const {token} = req.headers;
        
        if(!token) return res.send(422).status("Token não encontrado.");

        const getToken = await db.collection("sessions").findOne({token: token});

        if(!getToken) return res.status(400).send("Sua sessão expirou, faça login novamente");

        res.locals.recentToken = token;

        next();
    }catch(err){
        res.status(500).send(err)
    }
}