import dbConnect from "../../utils/dbConnect";
import Entry from "../../models/Entry";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch(method) {
    case "GET":
        try{
            console.log('Sending request...')
            const entries = await Entry.find();
            res.status(200).json(entries);
            if (entries){
                console.log(`${entries.length} Entries found successfully.`)
            }
        }
        catch (error){
            res.status(400).json({
                error: error.message,
                success: false,
            })
        }
    break;
    case "POST":{
        const { weight, foods, macros, date } = req.body;
        const validDate = date? new Date(date) : new Date();
        const Weekday = validDate.getDay() === 0 ? 'Sunday' : validDate.getDay() === 1 ? 'Monday' : validDate.getDay() === 2 ? 'Tuesday' : validDate.getDay() === 3 ? 'Wednesday' : validDate.getDay() === 4 ? 'Thursday' : validDate.getDay() === 5 ? 'Friday' : 'Saturday';
        const entry = {
            weight,
            foods,
            macros,
            dateCreated: validDate,
            weekDay: Weekday
        };
        console.log(entry)
        try{
            const newEntry = await Entry.create(entry);
            console.log(newEntry)
            res.status(201).json({
                success: true,
                data: newEntry,
            });
        }
        catch (error){
            res.status(400).json({
                error: error.message,
                success: false,
            })
        }
    }
    }

};