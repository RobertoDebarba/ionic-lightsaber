import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PersonInfo, PersonService} from "../../providers/person/person.service";

@Component({
  selector: 'info-home',
  templateUrl: 'info.html'
})
export class InfoPage {

  public person: PersonInfo;

  constructor(public nav: NavController,
              private personService: PersonService) {
  }

  public ionViewDidLoad(): void {
    this.personService.getLukeInfo().subscribe((info: PersonInfo) => {
      this.person = info;
    })
  }

  dismiss() {
    this.nav.pop();
  }

}
