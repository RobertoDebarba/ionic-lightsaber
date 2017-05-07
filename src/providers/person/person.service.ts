import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

export interface PersonInfo {
  name: string,
  height: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string
}

@Injectable()
export class PersonService {

  constructor(private http: Http) {
  }

  public getLukeInfo(): Observable<PersonInfo> {
    return this.http.get('http://swapi.co/api/people/11/').map(response => {
      return response.json();
    })
  }


}
