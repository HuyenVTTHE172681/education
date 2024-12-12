export class User {
    id: string = '';
    name: string = '';
    username: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
    identityNo: string = '';
    avatar: string = '';
    birthday: Date | null = null;
    className: string = '';
    connectionId: string | null = null;
    conversationId: string | null = null;
    courseId: string | null = null;
    createdDate: string = '';
    createdBy: string = '';
    modifiedDate: string | null = null;
    modifiedBy: string | null = null;
    roleId: string = '';
    roleName: string = '';
    roleTypeDataId: string = '';
    roleTypeDataName: string = '';
    roleDescription: string | null = null;
    roles: any | null = null;
    status: number = 0;
    userId: string | null = null;
    oldPassword: string | null = null;
    password: string | null = null;
    memberIds: any | null = null;
    totalFiltered: number = 0;
}