
export class Dashboard {
    classRoomName = '';
    subjectName = '';
    totalStudentStudy = 0;
    totalStudentPass = 0;
    totalFiltered = '';
    createdBy = '';
    createdDate = '';
    modifiedBy = '';
    modifiedDate = '';
}

export class AdviceRequest {
    academicAbility = '';
    birthday = '';
    comment = '';
    createdBy = '';
    createdDate = '';
    id = '';
    isAdvice = '';
    modifiedBy = '';
    modifiedDate = '';
    name = '';
    phone = '';
    totalFiltered = '';
}

export class DashboardOverview {
    numClassRooms = 0;
    numCourses = 0;
    numNewTeachers = 0;
    numNewUsers = 0;
    numQuestions = 0;
    numRecruits = 0;
    numSubjects = 0;
    numTests = 0;
}

export class TestQuestions {
    data: number[] = [];
    labels: string[] = [];
}