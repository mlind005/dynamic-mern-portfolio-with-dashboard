const express = require("express");
const router = express.Router();

// models 
const User = require("./models/users.js")
const Skills = require("./models/skills.js")
const About = require("./models/about.js")
const Projects = require("./models/projects.js")
const Education = require("./models/Education.js")
const Work = require("./models/work.js")
const Messages = require("./models/ViewerMsg")
// models end 

const jwt = require('jsonwebtoken');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
        // cb(null,`${file.originalname}`)
    }
})

var upload = multer({ storage: storage })

router.post("/Login", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const isAdmin = await User.findOne({ username, email, password })
        if (isAdmin) {
            const token = jwt.sign({ userId: isAdmin._id }, "jayMakaali", { expiresIn: "2D" },)

            if (token) {
                isAdmin.accesstoken = token
                await isAdmin.save();
                
                res.status(200).json({ message: "login success", username, token })
                
            }
            else {
                res.status(200).json({ message: "login failed" })
            }
        }
        else {
            res.status(200).json({ message: "login failed" })
        }
        // res.send({message:"yes i am here"})
    }
    catch (err) {
        console.log(err)
    }

});

router.get("/getToken", async (req, res) => {

    try {
        // res.send("get all")
        const allData = await User.find({}).select("accesstoken")
        const token = allData[0].accesstoken
        if (allData) {
            
            res.status(200).json({ message: "get success", token })
        } else {
            res.status(200).json({ message: "not success" })

            
        }
    }
    catch (err) {

    }


})

// send all Data for browser

router.get("/allAdmin", async (req, res) => {
    try {
        
        const allData = await User.find({})

        if (allData) {
            const Data = allData[0]
            res.status(200).json({ message: "get success", Data })
        } else {
            res.status(200).json({ message: "not success", })

            res.send("not success")
        }
    }
    catch (err) {

    }
})

// home Edit 
router.post("/home", upload.single('myFile'), async (req, res) => {
    try {


        const {
            name,
            title,
            subtitle,
            token,
            facebook,
            instagram,
            linkedin,
            github,
            twitter,

        } = req.body

        const homepic = req.file ? req.file.filename : null



        const AdminData = await User.findOne({ accesstoken: token }).select("home")

        if (AdminData) {


            AdminData.home.name = name;
            AdminData.home.title = title;
            AdminData.home.subtitle = subtitle;
            AdminData.home.facebook = facebook;
            AdminData.home.instagram = instagram;
            AdminData.home.linkedin = linkedin;
            AdminData.home.github = github;
            AdminData.home.twitter = twitter;

            AdminData.home.homepic = homepic ? homepic : AdminData.home.homepic;

            await AdminData.save();
            res.status(200).json({ message: "successfully updated" })
        }
        else {
            res.status(200).json({ message: "not success" })
        }
        //    await isAdmin.save()
    }
    catch (err) {
        res.send("err:", err)
    }
})

// skills starts here 

router.get("/allSkills", async (req, res) => {
    try {
        const allskill = await Skills.find({})

        if (allskill) {

           
            res.status(200).json({ message: "get skills", allskill })
        } else {
            res.status(200).json({ message: "not success", })

           
        }
    }
    catch (err) {

    }
})

router.post("/Editskills", async (req, res) => {
    try {

        // const AdminData = await User.findOne({ accesstoken: token }).select("home")

        const { skillname, level, token, id } = req.body;




        const AdminData = await User.findOne({ accesstoken: token }).select("-email,-password,-username")
        if (AdminData) {


            if (id) {
                const findData = await Skills.findOne({ _id: id });
                findData.level = level ? level : findData.level;
                findData.skillname = skillname ? skillname : findData.skillname;
                await findData.save();
                res.status(200).json({ message: "skill updated success" })
            }
            else {
                const skillData = new Skills({ skillname, level, token })
                await skillData.save();
                res.status(200).json({ message: "skill ADDED success" })
            }

        }
        else {
            res.status(200).json({ message: "you are not Admin success" })
        }

    }
    catch (err) {
        res.send("err:", err)
    }
})



router.delete("/skill/:id", async (req, res) => {
    try {

        
        await Skills.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "skill Deleted success" })

    }
    catch (err) {
        res.send("err:", err)
    }
})
// skills ends here 


// About starts here


router.post("/About", upload.single('myFile'), async (req, res) => {
    try {

        const {
            Adesc,
            Address,
            Email,
            Phone,
            token
        } = req.body

        const Aboutpic = req.file ? req.file.filename : null
        

        // const about = new About({Adesc, Address,Email,Phone,Aboutpic })
        // await about.save()

        const AdminData = await User.findOne({ accesstoken: token }).select("username")

        if (AdminData) {
            const abouData = await About.findOne({})

            if (abouData) {
                abouData.Adesc = Adesc;
                abouData.Address = Address;
                abouData.Email = Email;
                abouData.Phone = Phone;
                abouData.Aboutpic = Aboutpic ? Aboutpic : abouData.Aboutpic;

                await abouData.save();
                res.status(200).json({ message: "About successfully updated" })
            }
            else {
                res.status(200).json({ message: "About not updated" })
            }
        }
        else {
            res.status(200).json({ message: "not success" })
        }

    }
    catch (err) {
        res.send("err:", err)
    }
})

router.get("/allAbout", async (req, res) => {
    try {
        const aboutData = await About.findOne({})

        if (aboutData) {

           
            res.status(200).json({ message: "get About", aboutData })
        } else {
            res.status(200).json({ message: "not success", })

        }
    }
    catch (err) {

    }
})
// About Endss here 

// projects starts here


router.post("/Projects", upload.single('myFile'), async (req, res) => {
    try {

        const {
            title,
            desc,
            type,
            link,
            token,
        } = req.body

        const Projimage = req.file ? req.file.filename : null


        const AdminData = await User.findOne({ accesstoken: token }).select("username")
        if (AdminData) {
            const findProj = await Projects.findOne({ title })
            if (findProj) {

                findProj.title = title ? title : findProj.title;
                findProj.desc = desc ? desc : findProj.desc;
                findProj.type = type ? type : findProj.type;
                findProj.link = link ? link : findProj.link;
                findProj.Projimage = Projimage ? Projimage : findProj.Projimage;

                await findProj.save()
                res.status(200).json({ message: "Project  updated" })
            }
            else {

                const proj = new Projects({
                    title,
                    desc,
                    type,
                    link,
                    token,
                    Projimage
                })
                await proj.save();
                res.status(200).json({ message: "Project successfully Addes" })
            }
        }
    }
    catch (err) {
        res.send("err:", err)
    }
})
router.get("/allProjects", async (req, res) => {
    try {
        const projectData = await Projects.find()

        if (projectData) {

            res.status(200).json({ message: "get About", projectData })
        } else {
            res.status(200).json({ message: "not success", })

           
        }
    }
    catch (err) {

    }
})


router.delete("/project/:id", async (req, res) => {
    try {

        
        await Projects.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Project Deleted success" })

    }
    catch (err) {
        res.send("err:", err)
    }
})
// projects Endss here

// Education Starts here

router.post("/AddEducation", async (req, res) => {
    try {

        // const AdminData = await User.findOne({ accesstoken: token }).select("home")

        const {
            role,
            time,
            org,
            desc,
            token,
            id
        } = req.body;


        const AdminData = await User.findOne({ accesstoken: token }).select("-email,-password,-username")
        if (AdminData) {

            if (id) {
                const FindData = await Education.findOne({ _id: id })

                FindData.role = role ? role : FindData.role
                FindData.time = time ? time : FindData.time
                FindData.org = org ? org : FindData.org
                FindData.desc = desc ? desc : FindData.desc

                FindData.save();
                res.status(200).json({ message: "Field upfated success" })
            } else {


                const eduField = new Education({
                    role,
                    time,
                    org,
                    desc,
                })
                await eduField.save()
                res.status(200).json({ message: "New field Added" })
            }
        }
        else {
            res.status(200).json({ message: "you are not Admin success" })
        }

    }
    catch (err) {
        res.send("err:", err)
    }
})

router.get("/AllEducation", async (req, res) => {
    try {
        const EduData = await Education.find()

        if (EduData) {
            res.status(200).json({ message: "get About", EduData })
        } else {
            res.status(200).json({ message: "not success", })

            res.send("not success")
        }
    }
    catch (err) {
        console.log("err", err)
    }
})

router.delete("/delEdu/:id", async (req, res) => {
    try {

       
        await Education.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Edu field Deleted success" })

    }
    catch (err) {
        res.send("err:", err)
    }
})
// Education Endss here

// Work Starts here

router.post("/AddWork", async (req, res) => {
    try {

        // const AdminData = await User.findOne({ accesstoken: token }).select("home")

        const {
            role,
            time,
            org,
            desc,
            token,
            id
        } = req.body;


        const AdminData = await User.findOne({ accesstoken: token }).select("-email,-password,-username")
        if (AdminData) {

            if (id) {
                const FindData = await Work.findOne({ _id: id })

                FindData.role = role ? role : FindData.role
                FindData.time = time ? time : FindData.time
                FindData.org = org ? org : FindData.org
                FindData.desc = desc ? desc : FindData.desc

                FindData.save();
                res.status(200).json({ message: "Field upfated success" })
            } else {


                const workField = new Work({
                    role,
                    time,
                    org,
                    desc,
                })
                await workField.save()
                res.status(200).json({ message: "New field Added" })
            }
        }
        else {
            res.status(200).json({ message: "you are not Admin success" })
        }

    }
    catch (err) {
        res.send("err:", err)
    }
})

router.get("/AllWork", async (req, res) => {
    try {
        const EduData = await Work.find()

        if (EduData) {
            res.status(200).json({ message: "get About", EduData })
        } else {
            res.status(200).json({ message: "not success", })

            res.send("not success")
        }
    }
    catch (err) {
        console.log("err", err)
    }
})

router.delete("/delwork/:id", async (req, res) => {
    try {

        
        await Work.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Edu field Deleted success" })

    }
    catch (err) {
        res.send("err:", err)
    }
})
// Work Endss here


// for frontend get home call is here 


router.get("/homedata", async (req, res) => {
    try {
        
        const allData = await User.find({}).select("-username,-password,-email")

        if (allData) {
            const Data = allData[0].home
            res.status(200).json({ message: "get success", Data })
        } else {
            res.status(200).json({ message: "not success", })

            res.send("not success")
        }
    }
    catch (err) {

    }
})





router.post("/Viewermessage", async (req, res) => {
    try {
        const {name,
            email,
            phone,
            message,
            date} = req.body

        const msg = new Messages({
            name,
            email,
            phone,
            message,
            date
        })
        await msg.save()
        res.status(200).json({ message: "message sent ", })
    }
    catch (err) {
        console.log(err)
    }
})




router.get("/Allmessages", async (req, res) => {
    try {
        const msgData = await Messages.find()

        if (msgData) {
            res.status(200).json({ message: "get About", msgData })
        } else {
            res.status(200).json({ message: "not success", })

            res.send("not success")
        }
    }
    catch (err) {
        console.log("err", err)
    }
})


router.delete("/message/:id", async (req, res) => {
    try {
        await Messages.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "message Deleted success" })
    }
    catch (err) {
        res.send("err:", err)
    }
})
router.post("/homemain", async (req, res) => {
    try {
        const { username,email,password, token} = req.body

        const findAdmin = User.findOne({accesstoken:token})
        if(findAdmin){
            const AdminData = await User.findOne({ accesstoken: token }).select("username,email,password")

            AdminData.username = username?username:AdminData.username
            AdminData.email = email?email:AdminData.email
            AdminData.password = password?password:AdminData.password
            await AdminData.save()
            res.status(200).json({ message: "data changed  ", })
        }
        else{
            res.status(200).json({ message: "data not changed  ", })
        }
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;