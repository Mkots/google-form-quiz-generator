import {choiceQuestion} from "../utils/forms/choiseQuestion.js";
import {textQuestion} from "../utils/forms/textQuestion.js";
import {forms} from "./baseClient.js";

/**
 * @param name {string}
 * @returns {Promise<string>}
 */
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


/**
 * @param formId {string}
 * @returns {Promise<void>}
 */
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


/**
 * @param options {Object[]}
 * @param formId {string}
 * @returns {Promise<void>}
 */
export const addQuestion = async (options, formId) => {
    await forms.forms.batchUpdate({
        formId: formId,
        requestBody: {
            requests: options
        }
    })
}

/***
 *
 * @param options {Object[]}
 * @param type {"choice"|"text"}
 * @param taskPerPage {number}
 * @returns {Schema$Request[]}
 */
export const optionsMapper = (options, type, taskPerPage = 1) => {
    const questionGenerator = type === 'choice' ? choiceQuestion : textQuestion;
    const tasks = options.map((el, index) => {
        const {task, correct, variants, tag} = el;
        return questionGenerator(task, correct, index, variants, tag)
    });

    const grouped = tasks.map((el, index) => index !== 0 && index % taskPerPage === 0 ? [{
        createItem: {
            item: {
                pageBreakItem: {}
            },
            location: {
                index: index
            }
        }
    }, el]: [el]).flat();

    return grouped.map((task, i) => {
        return {
            ...task, createItem: {
                ...task.createItem, location: {
                    ...task.createItem.location, index: i
                }
            }
        }
    })
}