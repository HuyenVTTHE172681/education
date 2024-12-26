
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

export class DashboardAdminCourse {
    classRoomId = '';
    classRoomName = '';
    subjectName = '';
    averageRating = 0;
    createdBy = null;
    createdDate = null;
    modifiedBy = null;
    modifiedDate = null;
    totalCourse = 0;
    totalCourseCreateInMonth = 0;
    totalCourseNotPublic = 0;
    totalCoursePublic = 0;
    totalFiltered = null;
}

export class DashboardAdminScore {
    classRoomName = '';
    subjectName = '';
    testName = '';
    testId = '';
    from5To6 = 0;
    from7To8 = 0;
    from9To10 = 0;
    lessThan5 = 0;
    scoreAvg = 0;
    scoreMax = 0;
    scoreMin = 0;
    createdBy = null;
    createdDate = null;
    modifiedBy = null;
    modifiedDate = null;
    totalFiltered = null;
}

export class TestQuestions {
    data: number[] = [];
    labels: string[] = [];
}