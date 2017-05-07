import {Injectable} from "@angular/core";
import {MediaObject, MediaPlugin} from "@ionic-native/media";
import {Flashlight} from "@ionic-native/flashlight";
import {Platform} from "ionic-angular";

@Injectable()
export class LightSaberService {

  private isPlayingMove: boolean = false;
  private isPlayingClash: boolean = false;

  private moveFile1: MediaObject;
  private moveFile2: MediaObject;
  private clashFile: MediaObject;

  constructor(private flashlight: Flashlight,
              private media: MediaPlugin,
              private platform: Platform) {

    this.moveFile1 = this.media.create(this.getFileName('assets/saber-move1.mp3'), null, null, null);
    this.moveFile2 = this.media.create(this.getFileName('assets/saber-move2.mp3'), null, null, null);
    this.clashFile = this.media.create(this.getFileName('assets/saber-clash.mp3'), null, null, null);
  }

  public move(): void {
    if (!this.isPlayingMove) {
      this.isPlayingMove = true;

      if (Math.floor((Math.random() * 2) + 1) == 1) {
        this.moveFile1.play();
      } else {
        this.moveFile2.play();
      }

      setTimeout(() => {
        this.isPlayingMove = false;
      }, 100);
    }
  }

  public clash(): void {
    if (!this.isPlayingClash) {
      this.isPlayingClash = true;

      this.clashFile.play();

      this.flashlight.toggle();
      setTimeout(() => {
        this.flashlight.toggle();
        this.isPlayingClash = false;
      }, 700);
    }
  }

  private getFileName(fileName: string): string {
    if (this.platform.is('android')) {
      return '/android_asset/www/' + fileName;
    }

    return fileName;
  }

}
