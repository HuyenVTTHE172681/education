export class NewsCategory {
    createdBy = '';
    createdDate = '';
    id = '';
    modifiedBy = '';
    modifiedDate = '';
    name = '';
    order = 0;
    status = 0;
    totalFiltered = 0;
}

export class News {
    author = '';
    avatar = '';
    categoryId = '';
    categoryName = '';
    content = '';
    createdBy = '';
    createdDate = '';
    id = '';
    modifiedBy = '';
    modifiedDate = '';
    newsRelations = '';
    order = 1;
    rate = 1;
    shortContent = '';
    status = 0;
    tags = '';
    title = '';
    totalFiltered = 1;
    view = 1;
}

export class CommentNews {
    avatar = '';
    comments = '';
    content = '';
    createdBy = '';
    createdDate = '';
    id = '';
    modifiedBy = '';
    modifiedDate = '';
    parentId = '';
    screen = '';
    status = 0;
    totalFiltered = 0;
    userId = '';
    userName = '';
}