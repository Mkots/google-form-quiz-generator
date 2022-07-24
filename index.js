import { addQuestion, convertToQuiz, createNewForm, optionsMapper } from "./src/clients/forms.js"
import { addClasswork, getCourseId, getTopicId } from "./src/clients/classroom.js";

import * as data from './example.json' assert {type: "json"};

async function runSample() {
  const title = 'Example';
  const formId = await createNewForm(title);
  await convertToQuiz(formId);
  const options = optionsMapper(data['default'], "choice", 3);
  await addQuestion(options, formId);

  const courseId = await getCourseId()
  const topicId = await getTopicId(courseId);
  await addClasswork(courseId, topicId, formId, title)
}

runSample();