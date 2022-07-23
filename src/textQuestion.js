/***
 * @param task {string}
 * @param correct {string}
 * @param index {number}
 * @returns {Schema$Request}
 * */
export const textQuestion = (task, correct, index) => {
    return {
        createItem:{
            item:{
                title: task,
                description: 'Do not use contractions in answer field.',
                questionItem:{
                    question:{
                        textQuestion:{
                            paragraph: false
                        },
                        grading:{
                            pointValue: 1,
                            correctAnswers:{
                                answers: [{
                                    value: correct
                                }]
                            }
                        }
                    }
                }
            },
            location:{
                index: index
            }
        }
    }
}