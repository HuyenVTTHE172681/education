export class Question {
    id = '';
    name = '';
    answer = '';
    attackFiles = null;
    content = '';
    createdBy = '';
    createdDate = '';
    description = '';
    isAdd = 0;
    isAutoSort = 0;
    isLayoutSplitVertical = 0;
    lessonLink = null;
    level = 0;
    modifiedBy = '';
    modifiedDate = '';
    order = 0;
    point = 0;
    publicStatus = 0;
    quizzConfigSets = '';
    teacherIds = null;
    testId = null;
    testQuestionAnswers = null;
    testQuestionGroupId = 0;
    testQuestionGroupName = null;
    testQuestionTypeCode = '';
    testQuestionTypeName = '';
    totalFiltered = 0;
}

export class TestQuestionGroup {
    id = 0;
    name = '';
    order = 0;
    status = 0;
    testQuestions = null;
    createdBy = '';
    createdDate = '';
    modifiedBy = '';
    modifiedDate = '';
    totalFiltered = 0;
}

export class TestQuestionType {
    name = '';
    code = '';
    status = 0;
    order = 0;
    createdBy = null;
    createdDate = null;
    description = '';
    modifiedBy = null;
    modifiedDate = null;
    totalFiltered = 0;
}


export class TestQuestionNewById {
    id = '';
    answer = '';
    attackFiles = '';
    content = '';
    createdBy = '';
    createdDate = '';
    description = '';
    isAdd = 0;
    isAutoSort = 0;
    isLayoutSplitVertical = 0;
    lessonLink = 0;
    level = 0;
    modifiedBy = 0;
    modifiedDate = 0;
    name = '';
    order = 0;
    point = 0;
    publicStatus = 0;
    quizzConfigSets = 0;
    teacherIds = '';
    testId = '';
    testQuestionAnswers: TestQuestionAnswer = new TestQuestionAnswer();
    testQuestionGroupId = 0;
    testQuestionGroupName = '';
    testQuestionTypeCode = '';
    testQuestionTypeName = '';
    totalFiltered = 0;
}

export class TestQuestionAnswer {
    id = '';
    questionId = '';
    answer = '';
    answerLeft = '';
    answerRight = '';
    childQuestionAnswers: ChildQuestionAnswer = new ChildQuestionAnswer();
    comment = '';
    isCorrect = 0;
    isParent = 0;
    isSpecial = 0;
    order = 0;
    parentId = '';
}

export class ChildQuestionAnswer {
    id = '';
    questionId = '';
    answer = '';
    answerLeft = '';
    answerRight = '';
    childQuestionAnswers = '';
    comment = '';
    isCorrect = 0;
    isParent = 0;
    isSpecial = 0;
    order = 0;
    parentId = '';
}

export class TestQuestionChangePublicStatus {
    code ='';
    id = '';
    messages = '';
    notiQue = false;
    valid =  false;
    work_st = 0;
}

export class QuestionGroups {
    id = '';
    name = '';
    order = 0;
    status = 0;
    testQuestions = '';
    createdBy = '';
    createdDate = '';
    modifiedBy = '';
    modifiedDate = '';
    totalFiltered = 0;
}


