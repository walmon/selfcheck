import {Component} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {ResultPage} from '../result/result';

@Component({
  templateUrl: 'build/pages/home/home.html',
})

export class HomePage {
  //public base64Image: string ="http://www.mayoclinic.org/~/media/kcms/gbs/patient%20consumer/images/2013/11/15/17/38/ds00190_%20ds00439_im01723_r7_skincthu_jpg.jpg";
  //public actualPicture: string = "http://www.mayoclinic.org/~/media/kcms/gbs/patient%20consumer/images/2013/11/15/17/38/ds00190_%20ds00439_im01723_r7_skincthu_jpg.jpg";
  public base64Image: string;
  public actualPicture: string;
  private message;

  constructor(private navController: NavController) {
  }

  

  takePicture() {
    console.log('taking picture');

   /* this.navController.push(ResultPage, {
         result:'http://ichef-1.bbci.co.uk/news/660/media/images/77303000/jpg/_77303278_skin_cancer-spl-1.jpg'
        });
        */

    
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 600,
      targetHeight: 300
    }).then((imageData) => {

      this.navController.push(ResultPage, {
         result:imageData
        });
      // imageData is a base64 encoded string
      this.base64Image = imageData;
      this.actualPicture = imageData;
    }, (err) => {
      console.log(err);
    });
  }
}



