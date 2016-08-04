import {Component} from '@angular/core';
import {NavController, NavParams, Loading} from 'ionic-angular';
import {WatsonService} from '../../services/watson.service';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  templateUrl: 'build/pages/result/result.html',
  providers: [WatsonService],
  directives: [ImageCropperComponent]
})
export class ResultPage {
  private result: number = 0;
  private cropperSettings: CropperSettings;

  public positive: boolean = false;
  public score: number = 0;
  public message: string;
  public base64Image: string;
  public status: string = 'NA';


  constructor(private navController: NavController,
    private navParams: NavParams,
    private watsonService: WatsonService) {

    this.base64Image = navParams.get('result');
    console.log(this.result);
  }
  back(){
    this.navController.pop();
  }
  send() {
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.navController.present(loading);
    this.watsonService.postPicture(this.base64Image).then((res: any) => {
      let response = JSON.parse(res.response);
      console.log(response);
      //this.message = result;
      dismiss();
      this.positive = response.images.length > 0 && response.images[0].classifiers.length > 0 &&
        response.images[0].classifiers[0].classes.length > 0;
      if (this.positive) {
        let score = response.images[0].classifiers[0].classes[0].score;
        this.score = Math.round(score * 100);
        this.result = 1;
      } else {
        this.result = 2;
      }

    }).catch((err: any) => {
      //this.message = 'Falló la evaluación';
      let code = err.code;
      console.log('Falló la evaluación  %o', err);
      this.message = 'Estamos teniendo problemas...';
      dismiss();
    });

    function dismiss() {
      loading.dismiss();
    }
  }
}
