import {classroom} from "./baseClient.js";

export const getCourseId = async () => {
    const res = await classroom.courses.list({
        pageSize: 10,
    });
    return res.data.courses[0].id
}

export const getTopicId = async (courseId, topicName = "[system]") => {
    const res = await classroom.courses.topics.list({
        pageSize: 10,
        courseId: courseId
    });
    return res.data.topic.find(topic => topic.name === topicName).topicId;
}

export const addClasswork = async (courseId, topicId, formId, title) => {
    await classroom.courses.courseWork.create({
        courseId: courseId,
        requestBody: {
            maxPoints: 2,
            materials:[{
                link: {
                    url: `https://docs.google.com/forms/d/${formId}/viewform`
                }
            }],
            state: 'PUBLISHED',
            topicId: topicId,
            title: title,
            workType: 'ASSIGNMENT'
        }
    })
}