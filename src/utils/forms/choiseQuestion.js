/***
 * @param task {string}
 * @param correct {string}
 * @param index {number}
 * @param variants {string[]}
 * @param tag {string}
 * @returns {Schema$Request}
 * */

export const choiceQuestion = (task, correct, index, variants, tag) => {
    const feedback = tag ? {
        whenWrong:{
            text: tag
        },
        whenRight:{
            text: tag
        }
    } : undefined;
    return {
        createItem: {
            item: {
                title: task,
                description: null,
                questionItem: {
                    question: {
                        required: true,
                        grading: {
                            pointValue: 1,
                            correctAnswers: {
                                answers: [{
                                    value: correct
                                }]
                            },
                            ...feedback,
                        },
                        choiceQuestion: {
                            type: 'RADIO',
                            options: variants.map(variant => {
                                    if(!variant){ console.log(variants)}
                                    return {value: variant}
                                }
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
}