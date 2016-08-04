import { Injectable }     from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Platform} from 'ionic-angular';
import {Transfer} from 'ionic-native';

@Injectable()
export class WatsonService {

  constructor(
    private http: Http, private platform: Platform) {
  }
  private apiUrl = 'http://skincancer.mybluemix.net/api/custom_classify/skincancer_1263732271';

  postPicture(img): any {
    let ft = new Transfer();
    let filename = 'file.png';
    
    let options = {
      fileKey: "images_file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg"
    };

    return ft.upload(img, this.apiUrl, options, false);
  }
}