import path from "path";
import {google} from "googleapis";
import {authenticate} from '@google-cloud/local-auth';

const authClient = await authenticate({
    keyfilePath: path.join(path.resolve('credentials.json')),
    scopes: 'https://www.googleapis.com/auth/drive',
});
const forms = google.forms({
    version: 'v1',
    auth: authClient,
});


export const createNewForm = async (name) => {

    const newForm = {
        'info': {
            'title': name,
        }
    };
    const res = await forms.forms.create({
        requestBody: newForm,
    });

    return res.data.formId;
}

export const convertToQuiz = async (formId) => {
    await forms.forms.batchUpdate({
        formId: formId,
        requestBody: {
            requests: [{
                updateSettings: {
                    settings: {
                        quizSettings: {
                            isQuiz: true
                        }
                    },
                    updateMask: 'quizSettings.isQuiz'
                }
            }
            ]
        },
    });
}

export const addQuestion = async (options, formId) => {
    await forms.forms.batchUpdate({
        formId: formId,
        requestBody: {
            requests: options
        }
    })
}

export const optionsMapper = (options) => {
    const tasks = options.map((el, index) => {
        const {task, correct, variants} = el;
        return {
            createItem: {
                item: {
                    title: task,
                    description: null,
                    questionItem: {
                        question: {
                            grading: {
                                pointValue: 1,
                                correctAnswers: {
                                    answers: [{
                                        value: correct
                                    }]
                                }
                            },
                            choiceQuestion: {
                                type: 'RADIO',
                                options: variants.map(variant => ({value: variant})
                                )
                            }
                        }
                    }
                },
                location: {
                    index: index
                }
            }
        }
    });

    for (let i = 0; i < tasks.length; i++) {
        if (i % 2 !== 0) {
            tasks.splice(i, 0, {
                createItem: {
                    item: {
                        pageBreakItem: {}
                    },
                    location: {
                        index: i
                    }
                }
            })
        }
    }

    return tasks.map((task, i) => {
        return {
            ...task, createItem: {
                ...task.createItem, location: {
                    ...task.createItem.location, index: i
                }
            }
        }
    })
}