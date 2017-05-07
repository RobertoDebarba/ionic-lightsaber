import {Component} from "@angular/core";
import {DeviceMotion, DeviceMotionAccelerationData} from "@ionic-native/device-motion";
import {Flashlight} from "@ionic-native/flashlight";
import {LightSaberService} from "../../providers/light-saber/light-saber.service";
import {NavController} from "ionic-angular";
import {InfoPage} from "../info/info";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private previousAcceleration: DeviceMotionAccelerationData;

  constructor(private deviceMotion: DeviceMotion,
              private flashlight: Flashlight,
              private lightSaberService: LightSaberService,
              private nav: NavController) {
  }

  public ionViewDidLoad(): void {
    this.deviceMotion.watchAcceleration({
      frequency: 300
    }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      if (this.flashlight.isSwitchedOn()) {
        this.flashlight.switchOff();
      }

      let shakeSpeed: number = this.getShake(acceleration);

      if (shakeSpeed == 1) {
        this.lightSaberService.move();
      } else if (shakeSpeed == 2) {
        this.lightSaberService.clash();
      }
    });
  }

  public info(): void {
    this.nav.push(InfoPage);
  }

  private getShake(acceleration: DeviceMotionAccelerationData): number {
    let measurementsChange: DeviceMotionAccelerationData = {
      x: 0,
      y: 0,
      z: 0,
      timestamp: 0
    };

    if (this.previousAcceleration != null) {
      measurementsChange.y = this.previousAcceleration.y - acceleration.y;
      measurementsChange.z = this.previousAcceleration.z - acceleration.z;
      measurementsChange.x = this.previousAcceleration.x - acceleration.x;
    }
    this.previousAcceleration = acceleration;

    let moveDetection = 10;
    let shakeDetection = 35;

    if (this.isShake(measurementsChange, shakeDetection)) {
      return 2;
    }

    if (this.isShake(measurementsChange, moveDetection)) {
      return 1;
    }

    return 0;
  }

  private isShake(measurementsChange: DeviceMotionAccelerationData, move: number): boolean {
    return measurementsChange.x > move || measurementsChange.x < -move ||
      measurementsChange.y > move || measurementsChange.y < -move ||
      measurementsChange.z > move || measurementsChange.z < -move;
  }


}
