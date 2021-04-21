const express = require("express"),
    app = express(),
    passport = require("passport"),
    port = process.env.PORT || 80,
    cors = require("cors"),
    cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;

require("./passport.js");

const router = require("express").Router(),
    jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        console.log("Login: ", req.body, user, err, info);
        if (err) return next(err);
        if (user) {
            if (req.body.remember == true) {
                time_exp = "7d";
            } else time_exp = "1d";
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: time_exp,
            });
            var decoded = jwt.decode(token);
            //let time = "" + new Date(decoded.exp * 1000);
            let time = new Date(decoded.exp * 1000);
            //let str = time.substring(0, 10);
            console.log(new Date(decoded.exp * 1000));
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200;
            return res.json({ user, token });
        } else return res.status(422).json(info);
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200;
    return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.send(req.user);
    }
);

router.post("/register", async(req, res) => {
    try {
        const SALT_ROUND = 10;
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.json({ message: "Cannot register with empty string" });
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" });

        let id = users.users.length ?
            users.users[users.users.length - 1].id + 1 :
            1;
        hash = await bcrypt.hash(password, SALT_ROUND);
        users.users.push({ id, username, password: hash, email });
        res.status(200).json({ message: "Register success" });
    } catch {
        res.status(422).json({ message: "Cannot register" });
    }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
    res.send("Respond without authentication");
});

router.get(
    "/foo",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.status(200).json({ message: "Foo" });
    }
);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let plants = {
    list: [{
        id: "001",
        name: "กล้วยไม้",
        sciename: "Orchidaceae",
        family: "พืชใบเลี้ยงเดี่ยว",
        kingdom: Plantae,
        plantstyle: "สีหลากหลาย สวย ",
    }, ],
};


router
    .route("/plants")
    .get((req, res) => {
        res.send(plants);
    })
    .post((req, res) => {
        console.log(req.body);
        let newPlant = {};
        //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
        newPlant.id = plants.list.length ? plants.list[plants.list.length - 1].id + 1 : 1;
        newPlant.name = req.body.name;
        newPlant.sciename = req.body.sciename;
        newPlant.family = req.body.family;
        newPlant.kingdom = req.body.kingdom;
        newPlant.plantstyle = req.body.plantstyle;
        plants = { list: [...plants.list, newPlant] };
        res.json(plants);
    });

router
    .route("/plants/:plantid")
    .get((req, res) => {
        let id = plants.list.findIndex((item) => +item.id == +req.params.plantid)
            //console.log("id",id)
        res.json(plants.list[id]);
    })
    .put((req, res) => {
        let id = plants.list.findIndex((item) => item.id == +req.params.plantid);
        plants.list[id].name = req.body.name;
        plants.list[id].sciename = req.body.sciename;
        plants.list[id].family = req.body.family;
        plants.list[id].kingdom = req.body.kingdom;
        plants.list[id].plantstyle = req.body.plantstyle;
        res.json(plants.list);
    })
    .delete((req, res) => {
        plants.list = plants.list.filter((item) => +item.id !== +req.params.plantid);
        res.json(plants.list);
    });



router.route("/purchase/:plantId")
    .post((req, res) => {
        let id = plants.list.findIndex((item) => +item.id == +req.params.plantId)
        if (id == -1) {
            res.json({ message: "Plant not found" })
        } else {
            plants.list = plants.list.filter((item) => +item.id !== +req.params.plantId);
            res.json(plants.list);
        }
    })

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        },
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));