import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
import db from "../database/database.js";
import dayjs from "dayjs";

export async function signInFunction(req, res){
    const {email, pwd} = req.body;

    try{
        const findUser = await db.colletion().findOne({email: email});

        if(!findUser) return res.status(400).send("Usuário ou senha incorretos.")

        const comparePwd = bcrypt.compareSync(pwd, findUser.pwd);

        if(!comparePwd) return res.status(400).send("Usuário ou senha incorretos.")

        const token = uuidV4();

        await db.collection("sessions").insertOne({userId: findUser._id , token:token, createdAt: dayjs().format("DD/MM/YYYY HH-mm")});

        res.locals.userOn = findUser.name;

        res.status(200).send({token: token});

    }catch(err){
        res.status(500).send(err)
    }
}

export async function signUpFunction(req,res){
    const {email, name, phone, pwd} = req.body;

    const hashedPwd = bcrypt.hashSync(pwd, 10);

    const emailAvailable = await db.collection().findOne({email: email});

    if(emailAvailable) return res.status(400).send("Tente outro nome de usuário ou email");

    try{
        await db.collection().insertOne({email: email, name:name, phone: phone, pwd: hashedPwd});
        
        res.sendStatus(200);

    }catch(err){

        res.status(500).send(err.message);

    }
}
