const Workout = require("../models/Workout")

const index = async (req: any, res: any) => {
    try {
        const PAGE_SIZE = 20;
        const pageNumber = parseInt(req.body.pageNumber || "0");

        let skip = PAGE_SIZE * pageNumber;
        console.log(pageNumber)
        console.log(skip)
        const total = await Workout.find()
        console.log(total.length)
        const totalPages = Math.floor(total.length / PAGE_SIZE);

        Workout.find().skip(skip).limit(PAGE_SIZE).then((response: any) => {
            console.log(response)
            console.log("response")
            res.json({
                code: "11",
                data: { workouts: response, totalPages }

            })
        }).catch((error: any) => {
            console.log(error)
            res.json({
                message: "Unknown Error"
            })
        })
    } catch (err) {
        console.log(err)
    }
}
const filterWorkouts = async (req: any, res: any) => {
    try {
        const PAGE_SIZE = 20;
        const pageNumber = parseInt(req.body.pageNumber || "0");
        const category = req.body.category
        const startDate = req.body.startDate && new Date(req.body.startDate);

        const categoryValues = category.map((category: { value: any; }) => { return category.value })
        console.log("category", category)
        console.log("categoryValues", categoryValues)
        console.log("startDate", startDate)
        const $and: object[] = [];
        let search = {
            $and
        }
        console.log("test")
        if (startDate) {
            search["$and"].push({ startDate: startDate })
        }
        console.log("test 123")

        if (category.length > 0) {
            search["$and"].push({ category: { $in: categoryValues } })

        }
        console.log(search)

        let skip = PAGE_SIZE * pageNumber;
        console.log(pageNumber)
        console.log(skip)
        const total = await Workout.find(search)
        console.log(total.length)
        const totalPages = Math.ceil(total.length / PAGE_SIZE);
        console.log("test -11")


        Workout.find(search).skip(skip).limit(PAGE_SIZE).then((response: any) => {
            console.log(response)
            console.log("response")
            res.json({
                code: "11",
                data: { workouts: response, totalPages }

            })
        }).catch((error: any) => {
            console.log(error)
            res.json({
                message: "Unknown Error"
            })
        })
    } catch (err) {
        console.log(err)
    }
}
const add = (req: any, res: any) => {

    let workout = new Workout({
        name: req.body.name,
        description: req.body.description,
        startDate: new Date(),
        category: req.body.category,
    })

    workout.save().then((response: any) => {
        console.log(response)
        res.json({
            code: "11",
            msg: "Added Successfully"
        })
    }).catch((error: any) => {
        console.log(error)
        res.json({
            code: "00",
            message: "Unknown Error"
        })
    })
}
module.exports = { index, add, filterWorkouts }