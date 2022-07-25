import {videos} from "./baseClient.js";
import * as fs from "fs";

export async function uploadVideo(title, videoFilePath) {

    await videos.videos.insert({
        part: 'snippet,status',
        requestBody: {
            snippet: {
                title,
                description: '',
                tags: '',
                categoryId: '23',
                defaultLanguage: 'en',
                defaultAudioLanguage: 'en'
            },
            status: {
                privacyStatus: "private"
            },
        },
        media: {
            body: fs.createReadStream(videoFilePath),
        },
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(response.data)
    });
}