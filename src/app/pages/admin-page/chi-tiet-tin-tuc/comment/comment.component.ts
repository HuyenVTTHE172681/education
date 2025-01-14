import { Component, OnInit } from '@angular/core';
import { CommentNews } from '../../../../core/models/news.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../../core/services/api-core/news.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CONSTANTS } from '../../../../common/constants';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments: CommentNews[] = [];
  id = '';
  query = {
    filter: '',
    page: 1,
    size: 1000,
    parentId: '',
  }


  constructor(
    private router: Router,
    private newsSrv: NewsService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id && this.id !== 'null' && this.id !== 'undefined') {
        this.getCommentNews(this.id);
      }
    });
  }

  getCommentNews(screen: string) {
    this.newsSrv.getComment(this.query.filter, this.query.page, this.query.size, this.query.parentId, screen).subscribe((data) => {
      this.comments = data?.data?.data || [];
    })
  }

  selectedComment: any;
  delete(comment: CommentNews) {
    if (!comment || !comment.id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Thông báo',
        detail: 'Không thể xóa bình luận không hợp lệ!',
        key: 'br',
        life: 3000,
      });
      return;
    }

    this.confirmationService.confirm({
      message: CONSTANTS.CONFIRM.DELETE_BAI_HOC,
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Đồng ý',
      rejectLabel: 'Hủy bỏ',
      accept: () => {
        this.newsSrv.deleteComment(comment?.id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: CONSTANTS.SUMMARY.SUMMARY_DELETE_SUCCESSFUL,
              detail: CONSTANTS.MESSAGE_ALERT.DELETE_SUCCESSFUL,
              key: 'br',
              life: 3000,
            });
            this.getCommentNews(this?.id)
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Xóa bình luận không thành công!',
              key: 'br',
              life: 3000,
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: CONSTANTS.SUMMARY.SUMMARY_CANCEL_DELETE,
          detail: CONSTANTS.MESSAGE_ALERT.DELETE_CANCEL,
          key: 'br',
          life: 3000,
        });
      },
    });
  }
}
