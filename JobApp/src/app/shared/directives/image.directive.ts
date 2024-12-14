import { Directive, ElementRef, Input } from '@angular/core';
import { UserService } from '../../components/auth/user.service';

@Directive({
  selector: '[imageId]',
  standalone: true
})
export class ImageDirective {
  @Input('imageId') profileId: string = null;
  @Input('imageSrc') imageSrc: string = null;
  @Input('defaultImage') defaultSrc: string = null;

  constructor(private elementRef: ElementRef, private userService: UserService) {
    this.elementRef.nativeElement.src = this.defaultSrc;
  }

  ngOnChanges() {
    this.getImgSource();
  }

  getImgSource() {
    if (this.profileId && !this.imageSrc) {
      this.userService.getFile(this.profileId).subscribe((res: any) => {
        this.setSrcToEle(res?.src);
      })
    } else {
      this.setSrcToEle(this.imageSrc);
    }
  }

  setSrcToEle(src) {
    this.elementRef.nativeElement.src = src || this.defaultSrc;
  }

}
