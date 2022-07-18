import { addQuestion, convertToQuiz, createNewForm, optionsMapper } from "./src/client.js";

import * as data from './example.json' assert {type: "json"};

async function runSample() {
  const formId = await createNewForm('Title of Quiz');
  await convertToQuiz(formId);
  const options = optionsMapper(data['default']);
  await addQuestion(options, formId);
}

runSample();