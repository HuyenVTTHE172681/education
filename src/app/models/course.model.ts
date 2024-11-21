 export class Course {
   id?: string;
   name?: string;
   subjectId?: string;
   subjectName?: string;
   code?: string;
   avatar?: string;
   banner?: string;
   courseInfo1?: string;
   courseInfo2?: string;
   rating?: number;
   totalRating?: number;
   totalStudent?: number;
   price?: number;
   priceDiscount?: number;
   promotionTime?: string;
   createdDate?: string;
   createdBy?: string;
   modifiedDate?: string | null;
   modifiedBy?: string;
   shortSummary?: string;
   isShowHome?: number;
   teachers?: string[];
 }
