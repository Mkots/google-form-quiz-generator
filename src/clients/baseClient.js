import path from "path";
import {google} from "googleapis";
import {authenticate} from '@google-cloud/local-auth';

const authClient = await authenticate({
    keyfilePath: path.join(path.resolve('credentials.json')),
    scopes: [
        'https://www.googleapis.com/auth/drive',
        // 'https://www.googleapis.com/auth/youtube.upload', // scope for uploading videos
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.students',
        'https://www.googleapis.com/auth/classroom.topics.readonly'
    ],
});

export const forms = google.forms({
    version: 'v1',
    auth: authClient,
});

export const classroom = google.classroom({
    version: 'v1',
    auth: authClient
});

export const videos = google.youtube({
    version: 'v3',
    auth: authClient
});