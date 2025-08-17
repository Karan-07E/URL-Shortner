import Url from "../models/db.js";
import { nanoid } from "nanoid";
import { isUrl } from 'check-valid-url';

export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    if(!originalUrl || !isUrl(originalUrl)) {
        return res.status(400).json({ message : "Please provide a valid URL" });
    }

    // to check duplicates and save space in db.
    const Urlexists = await Url.findOne({ originalUrl });
    if(Urlexists) {
        return res.status(200).json({
            message : "Url exists in database",
            PresentUrl : Urlexists,
            shortId : Urlexists.shortId
        });
    }

    try {
        const shortId = nanoid(7);
        const newUrl = new Url({
            originalUrl,
            shortId
        });
        await newUrl.save();
        res.status(200).json({message : "shortcoded successfuly", newUrl, shortId});
    } catch (error){
        return res.status(500).json({ message : "Internal Server Error"});
    }
}


export const RedirectShortUrl = async (req, res) => {
    const { shortId } = req.params;
    try {
        const check = await Url.findOne({shortId});
        if(!check){
            return res.status(404).json({ message : "Url not found"});
        }
        res.redirect(check.originalUrl);
    } catch (error) {
        return res.status(500).json({ message : "Internal Server Error"});
    }
}